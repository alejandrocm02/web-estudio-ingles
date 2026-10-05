const {test,expect}=require('@playwright/test');

test('recordings play, pause, change speed and finish without device voices',async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true}));
  await page.goto('/listening.html');
  const audio=page.locator('#recording-0');
  await page.locator('#play-0').focus();
  await page.keyboard.press('Enter');
  await expect.poll(()=>audio.evaluate(a=>a.currentTime)).toBeGreaterThan(0);
  await page.locator('#play-0').click();
  await expect.poll(()=>audio.evaluate(a=>a.paused)).toBe(true);
  await page.getByLabel('Velocidad de reproducción').selectOption('0.75');
  expect(await audio.evaluate(a=>a.playbackRate)).toBe(.75);
  await page.getByRole('button',{name:'Ver transcripción',exact:true}).first().click();
  await expect(page.locator('#transcript-0')).toBeVisible();
  await expect(page.getByRole('button',{name:'Ocultar transcripción',exact:true})).toHaveAttribute('aria-expanded','true');
  await expect.poll(()=>audio.evaluate(a=>Number.isFinite(a.duration))).toBe(true);
  await audio.evaluate(a=>{a.currentTime=a.duration-.2;});
  await page.locator('#play-0').click();
  await expect(page.locator('#done-0')).toContainText('Escuchada');
  const progress=await page.evaluate(()=>loadProgress());
  expect(progress.listening.A1[0]).toBe(true);
  expect(progress.listeningVerified?.A1?.[0]).toBeFalsy();
  await page.locator('#play-1').click();
  await expect.poll(()=>page.locator('#recording-1').evaluate(a=>a.paused)).toBe(false);
  await page.getByRole('button',{name:'A2',exact:true}).click();
  await expect(page.locator('#recording-0')).toHaveAttribute('data-level','A2');
  expect(await page.locator('audio').evaluateAll(a=>a.every(x=>x.paused))).toBe(true);
});

test('a failed recording offers a transcript and never grants listening credit',async({page,browserName})=>{
  test.skip(process.platform==='win32'&&browserName==='webkit','Windows WebKit uses a simulated media backend; verified on Linux CI.');
  await page.route('**/audio/*.mp3',route=>route.abort());
  await page.goto('/listening.html');
  await page.locator('#play-0').click();
  await expect(page.locator('#audio-status-0')).toContainText(/No se pudo/);
  await page.getByRole('button',{name:'Ver transcripción',exact:true}).first().click();
  await expect(page.locator('#transcript-0')).toBeVisible();
  expect(await page.evaluate(()=>loadProgress().listening.A1?.[0])).toBeFalsy();
  await page.unroute('**/audio/*.mp3');
  await page.locator('#play-0').click();
  await expect.poll(()=>page.locator('#recording-0').evaluate(a=>a.currentTime)).toBeGreaterThan(0);
});

test('all 30 MP3 assets decode with audible samples and matching duration',async({page,browserName})=>{
  test.skip(process.platform==='win32'&&browserName==='webkit','Windows WebKit does not expose Web Audio; verified on Linux CI.');
  await page.goto('/listening.html');
  const results=await page.evaluate(async()=>{
    const ctx=new (window.AudioContext||window.webkitAudioContext)(); const results=[];
    for(const [key,asset] of Object.entries(window.StudyAudioAssets)) {
      const response=await fetch(asset.src);
      const buffer=await ctx.decodeAudioData(await response.arrayBuffer());
      const samples=buffer.getChannelData(0);
      let square=0; for(const sample of samples) square+=sample*sample;
      results.push({key,ok:response.ok,expected:asset.duration,duration:buffer.duration,rms:Math.sqrt(square/samples.length)});
    }
    await ctx.close(); return results;
  });
  expect(results).toHaveLength(30);
  for(const result of results) {
    expect(result.ok,result.key).toBe(true);
    expect(Math.abs(result.duration-result.expected),result.key).toBeLessThan(.2);
    expect(result.rms,result.key).toBeGreaterThan(.01);
  }
});
