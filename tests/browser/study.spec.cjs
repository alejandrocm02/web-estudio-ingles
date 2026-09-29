const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('route, orientation, navigation and retained progress', async ({ page }) => {
  await page.goto('/learn.html');
  await page.getByRole('button',{name:'Hacer prueba orientativa'}).click();
  for(let i=0;i<18;i++) await page.getByRole('button',{name:'No lo sé',exact:true}).click();
  await expect(page.getByLabel('Nivel de mi ruta')).toHaveValue('A0');
  await page.reload();
  await expect(page.getByLabel('Nivel de mi ruta')).toHaveValue('A0');
  await page.getByLabel('Nivel de mi ruta').selectOption('B2');
  await page.getByRole('link',{name:'Gramática · Continuar',exact:true}).click();
  await expect(page).toHaveURL(/grammar.html\?level=B2/);
  await expect(page.getByRole('button', { name: 'B2', exact: true, pressed: true })).toContainText('B2');
});

test('review schedules only after recall and persists after reloading', async ({ page }) => {
  await page.goto('/learn.html');
  await page.evaluate(()=>localStorage.setItem('studyProgressV1:guest',JSON.stringify({vocabKnown:{'A1::apple':true}})));
  await page.reload();
  await page.getByRole('button',{name:'Repasar hasta 10 palabras'}).click();
  await expect(page.getByRole('button',{name:'La recuerdo',exact:true})).toHaveCount(0);
  await page.getByRole('button',{name:'Mostrar traducción'}).click();
  await page.getByRole('button',{name:'Me cuesta · 10 min'}).click();
  await expect(page.getByRole('status').first()).toContainText('Sesión de repaso terminada');
  await page.reload();
  await expect(page.getByRole('button',{name:'Repasar hasta 10 palabras'})).toBeDisabled();
  const stored = await page.evaluate(()=>JSON.parse(localStorage.getItem('studyProgressV1:guest')));
  expect(stored.learning.reviews['A1::apple'].due).toBeGreaterThan(Date.now());
  expect(Object.values(stored.learning.attempts)).toHaveLength(1);
  await expect(page.getByText('1 errores · 0 aciertos',{exact:false})).toBeVisible();
});

test('keyboard opens, contains and returns modal focus', async ({ page }) => {
  await page.goto('/index.html');
  await page.locator('#account-toggle').focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  for(let i=0;i<14;i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(()=>!!document.activeElement.closest('[role="dialog"]'))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.locator('#account-toggle')).toBeFocused();
});

for (const theme of ['light','dark']) test(`core pages fit the viewport and expose accessible structure (${theme})`, async ({ page }) => {
  test.setTimeout(60000);
  await page.addInitScript(theme => localStorage.setItem('theme',theme),theme);
  for (const path of ['index.html','learn.html','vocabulary.html','tests.html','reading.html','listening.html','grammar.html','theory.html','game.html']) {
    const errors=[]; const onError=e=>errors.push(e.message); page.on('pageerror',onError);
    await page.goto('/'+path);
    await expect(page.getByRole('heading',{level:1})).toBeVisible();
    await page.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect.getTiming().iterations !== Infinity).map(a => a.finished.catch(()=>{}))));
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const scan = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect.soft(scan.violations.map(v=>({id:v.id, nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),path).toEqual([]);
    expect(errors).toEqual([]); page.off('pageerror',onError);
  }
});
