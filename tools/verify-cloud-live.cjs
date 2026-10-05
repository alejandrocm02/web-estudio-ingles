// Explicitly authorized disposable test accounts only. The orchestration must
// create fixtures, invoke this process and delete fixtures in a finally block.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const {createClient}=require('@supabase/supabase-js');
const {chromium}=require('@playwright/test');
const users=JSON.parse(fs.readFileSync(process.env.STUDY_TEST_USERS,'utf8'));
const url='https://vjghrnmunzbjvkhrauao.supabase.co',key='sb_publishable_psC5fvCQOv4UU7rin_pGqQ_HuXTB416';
const clients=users.map(()=>createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}}));
(async()=>{
  let browser;
  try{
    for(let i=0;i<2;i++){
      const r=await clients[i].auth.signInWithPassword({email:users[i].email,password:users[i].password});
      assert.ifError(r.error);
    }
    const first=await clients[0].rpc('save_study_progress',{expected_revision:0,new_payload:{vocabKnown:{'A1::apple':true}}});assert.ifError(first.error);assert.equal(first.data.length,1);
    const stranger=await clients[1].from('study_progress').select('*');assert.ifError(stranger.error);assert.equal(stranger.data.length,0);
    const attack=await clients[1].from('study_progress').insert({user_id:users[0].id,payload:{}});assert.ok(attack.error);
    const stale=await clients[0].rpc('save_study_progress',{expected_revision:0,new_payload:{}});assert.equal(stale.data.length,0);
    browser=await chromium.launch();
    const contexts=await Promise.all([browser.newContext(),browser.newContext()]);
    const pages=await Promise.all(contexts.map(c=>c.newPage()));
    for(const page of pages){
      await page.goto('http://127.0.0.1:8765/account.html');
      await page.getByLabel('Correo electrónico',{exact:true}).fill(users[0].email);
      await page.getByLabel('Contraseña',{exact:true}).fill(users[0].password);
      await page.getByRole('button',{name:'Entrar',exact:true}).click();
      await page.getByRole('heading',{name:'Mi cuenta',exact:true}).waitFor();
      assert.equal(await page.evaluate(()=>loadProgress().vocabKnown['A1::apple']),true);
    }
    await pages[0].evaluate(async()=>{const p=loadProgress();p.grammar.A1=[true];saveProgress(p);await StudyCloud.sync();});
    await pages[1].getByRole('button',{name:'Sincronizar ahora'}).click();
    await pages[1].waitForFunction(()=>loadProgress().grammar.A1?.[0]===true);
    await contexts[0].setOffline(true);
    await pages[0].evaluate(()=>{const p=loadProgress();p.vocabKnown['A1::book']=true;saveProgress(p);});
    await contexts[0].setOffline(false);
    await pages[0].evaluate(()=>StudyCloud.sync());
    await pages[1].evaluate(()=>StudyCloud.sync());
    assert.equal(await pages[1].evaluate(()=>loadProgress().vocabKnown['A1::book']),true);
    await pages[0].getByRole('button',{name:'Cerrar sesión',exact:true}).click();
    await pages[0].getByLabel('Correo electrónico',{exact:true}).waitFor();
    assert.equal(await pages[0].evaluate(()=>loadProgress().vocabKnown['A1::apple']),undefined);
    console.log('PASS: real sign-in, RLS, stale-write rejection, two browsers, offline retry and logout isolation.');
  }finally{
    await browser?.close();
    await Promise.allSettled(clients.map(c=>c.auth.signOut()));
  }
})().catch(e=>{console.error('Live verification failed:',e.message);process.exitCode=1;});
