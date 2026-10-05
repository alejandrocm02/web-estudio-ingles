const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { webcrypto } = require('node:crypto');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function page(section = 'reading', initial = {}) {
  const html = read(section + '.html').replace(/<script[\s\S]*?<\/script>/g, '');
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push(e));
  const dom = new JSDOM(html, { url: 'https://study.example/', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  w.TextEncoder = TextEncoder;
  w.matchMedia = () => ({ matches: false });
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.HTMLMediaElement.prototype.pause = () => {};
  w.fetch = async () => ({ ok: true, json: async () => JSON.parse(read('vocabulary.json')) });
  Object.defineProperty(w, 'crypto', { value: webcrypto });
  w.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  w.speechSynthesis = { speaking: false, pending: false, paused: false, getVoices: () => [{ name: 'English', lang: 'en-GB', voiceURI: 'test-en' }], addEventListener: () => {}, cancel() { this.speaking = false; }, pause() { this.paused = true; }, resume() { this.paused = false; }, speak(u) { this.speaking = true; w.lastUtterance = u; } };
  for (const [key, value] of Object.entries(initial)) w.localStorage.setItem(key, JSON.stringify(value));
  for (const file of ['data.js', 'curriculum-update.js', 'auth.js', 'learning.js', 'progress-tools.js', 'audio-assets.js', 'audio-player.js', 'script.js', 'study-plan.js']) vm.runInContext(read(file),dom.getInternalVMContext(),{filename:file});
  await sleep(30);
  return { dom, w, errors };
}

test('all levels retain their curriculum and new questions have unique, valid options', () => {
  const ctx = vm.createContext({}); vm.runInContext(read('data.js') + '\n' + read('curriculum-update.js') + ';globalThis.d=data', ctx);
  const d = ctx.d;
  assert.equal(d.grammar.levels.length, 7);
  assert.equal(d.grammar.levels.reduce((n,l) => n+l.exercises.length,0),151);
  for (const level of d.tests.levels) {
    assert.equal(level.questions.length,20);
    for (const q of level.questions) { assert.ok(q.options[q.correct]); assert.ok(q.explanation); assert.equal(new Set(q.options).size, q.options.length); }
  }
  assert.equal(d.reading.levels.reduce((n,l) => n+l.texts.length,0),22);
  for (const level of d.reading.levels) for (const t of level.texts) for (const q of t.questions) {
    if (q.type === 'choice') { assert.ok(q.options[q.correct]); assert.ok(q.explanation); } else assert.ok(q.guidance);
  }
});

test('all section levels render without exceptions', async () => {
  for (const section of ['grammar','reading','vocabulary','tests','listening','theory']) {
    const { dom,w,errors } = await page(section);
    for (let i=0;i<(section==='grammar'?7:section==='theory'?1:6);i++) {
      w.switchLevel(section,i);
      assert.ok(w.document.getElementById('page-content').textContent.length > 100);
    }
    assert.equal(errors.length,0,errors.map(e=>e.message).join(';')); dom.window.close();
  }
});

test('vocabulary progress reaches 100% with all level keys', async () => {
  const {dom,w}=await page('vocabulary');
  w.eval(`const p=loadProgress(); for(const [level,words] of Object.entries(vocabularyIndexed)) for(const word of words) p.vocabKnown[getVocabProgressKey(level,word.word)]=true; saveProgress(p);`);
  assert.equal(w.getDone(w.loadProgress()).vocabulary,w.getTotals().vocabulary); dom.window.close();
});

test('listening playback alone does not certify comprehension; a correct answer does', async () => {
  const {dom,w}=await page('listening');
  w.document.getElementById('recording-0').dispatchEvent(new w.Event('ended'));
  assert.equal(w.lastUtterance,undefined);
  assert.equal(w.loadProgress().listening.A1[0],true);
  assert.equal(w.getDone(w.loadProgress()).listening,0);
  const correct=w.eval('data.listening.levels[0].tracks[0].correct');
  w.checkListeningAnswer(0,0,correct,w.document.querySelectorAll('#listen-options-0 button')[correct]);
  assert.equal(w.getDone(w.loadProgress()).listening,1);
  assert.match(w.document.getElementById('done-0').textContent,/Comprensión superada/);
  dom.window.close();
});

test('vocabulary pronunciation keeps its independent device voice control', async () => {
  const {dom,w}=await page('vocabulary');
  w.speakVocabulary('apple',{stopPropagation(){}});
  assert.equal(w.lastUtterance.text,'apple');
  dom.window.close();
});

test('every listening recording matches its transcript and published manifest', () => {
  const ctx=vm.createContext({window:{}});
  vm.runInContext(read('data.js')+'\n'+read('curriculum-update.js')+'\n'+read('audio-assets.js')+';globalThis.d=data',ctx);
  const hash=value=>require('node:crypto').createHash('sha256').update(value).digest('hex');
  const manifest=JSON.parse(read('audio/manifest.json'));
  assert.equal(Object.keys(manifest).length,30);
  for(const level of ctx.d.listening.levels) for(const [i,track] of level.tracks.entries()) {
    const asset=manifest[level.level+'-'+i];
    assert.equal(asset.scriptSha256,hash(track.script));
    assert.equal(asset.sha256,hash(fs.readFileSync(path.join(root,asset.src))));
    assert.ok(asset.duration>5 && asset.duration<120);
    assert.equal(JSON.stringify(asset),JSON.stringify(ctx.window.StudyAudioAssets[level.level+'-'+i]));
  }
});

test('test review contains only mistakes and never overwrites the full result', async () => {
  const {dom,w}=await page('tests');
  for(let i=0;i<20;i++) {
    const correct=w.eval('testQuestions[currentQ].correct');
    w.checkAnswer(i===0 ? (correct+1)%4 : correct,0); w.nextQuestion(0);
  }
  assert.equal(w.loadProgress().tests.A1.best,19);
  w.reviewTestErrors(0); assert.equal(w.eval('testQuestions.length'),1);
  w.checkAnswer(w.eval('testQuestions[0].correct'),0);w.nextQuestion(0);
  assert.equal(w.loadProgress().tests.A1.best,19);
  assert.doesNotMatch(w.document.getElementById('page-content').textContent,/19 \/ 1/);
  w.restartTest(0); assert.equal(w.eval('testQuestions.length'),20);
  dom.window.close();
});

test('backup validates data, excludes credentials and merges rather than erases progress', async () => {
  const {dom,w}=await page();
  const clean=w.StudyProgressBackup.cleanProgress({ grammar:{A1:[true,false]}, passwordHash:'SECRET', session:'SECRET', readingAnswers:{A1:{0:{0:{text:'A valid draft',answered:false}}}} });
  assert.ok(!JSON.stringify(clean).includes('SECRET'));
  const merged=w.StudyProgressBackup.mergeProgress(clean,{grammar:{A1:[false,true]},tests:{A1:{best:15,total:20}}});
  assert.deepEqual(Array.from(merged.grammar.A1),[true,true]);
  assert.equal(merged.readingAnswers.A1[0][0].text,'A valid draft');
  assert.equal(merged.tests.A1.best,15);
  assert.throws(()=>w.StudyProgressBackup.cleanProgress(null));
  const first = w.StudyProgressBackup.cleanProgress({learning:{reviews:{'A1::apple':{step:1,due:1000,updatedAt:100}}}});
  const combined = w.StudyProgressBackup.mergeProgress(first,{learning:{reviews:{'A1::apple':{step:0,due:2000,updatedAt:200}}}});
  assert.equal(combined.learning.reviews['A1::apple'].due,2000);
  assert.doesNotThrow(()=>w.StudyProgressBackup.cleanProgress({learning:null}));
  dom.window.close();
});

test('local accounts stay separate and passwords are not stored as clear text', async () => {
  const {dom,w}=await page();
  await w.StudyAuth.register('TestOne','Testing123!');
  const one=w.StudyAuth.getProgressKey();w.localStorage.setItem(one,JSON.stringify({grammar:{A1:[true]}}));
  w.recordLearningAttempt('grammar','A1','Present simple','0',false);
  w.StudyAuth.logout();await w.StudyAuth.register('TestTwo','Different456!');
  assert.notEqual(w.StudyAuth.getProgressKey(),one);
  assert.equal(w.loadProgress().grammar.A1,undefined);
  assert.equal(w.loadProgress().learning,undefined);
  assert.ok(!w.localStorage.getItem('studyEnglishAccountsV1').includes('Testing123!'));
  w.StudyAuth.logout();await assert.rejects(w.StudyAuth.login('TestOne','WrongPassword9'));
  await w.StudyAuth.login('TestOne','Testing123!');assert.equal(w.loadProgress().grammar.A1[0],true);
  assert.equal(Object.keys(w.loadProgress().learning.attempts).length,1);
  dom.window.close();
});

test('reading draft restores safely and can be retried', async () => {
  const {dom,w}=await page('reading');
  w.saveReadingDraft(0,2,0,'My <script> interpretation');
  w.document.getElementById('page-content').innerHTML=w.renderReading(0);
  assert.equal(w.document.getElementById('reading-answer-0-2').value,'My <script> interpretation');
  assert.equal(w.document.querySelectorAll('#page-content script').length,0);
  w.confirm=()=>true;w.resetReading(0,0);
  assert.equal(w.document.getElementById('reading-answer-0-2').value,'');dom.window.close();
});

test('profile modal traps keyboard focus and returns it when closed', async () => {
  const {dom,w}=await page('index');
  const toggle=w.document.getElementById('account-toggle');toggle.click();
  const overlay=w.document.getElementById('account-overlay');
  const controls=[...overlay.querySelectorAll('button,input')];
  for(const el of controls) el.getClientRects=()=>[{width:1,height:1}];
  controls.at(-1).focus();
  controls.at(-1).dispatchEvent(new w.KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}));
  assert.equal(w.document.activeElement,controls[0]);
  controls[0].dispatchEvent(new w.KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true,cancelable:true}));
  assert.equal(w.document.activeElement,controls.at(-1));
  w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  assert.equal(overlay.hidden,true);assert.equal(w.document.activeElement,toggle);
  dom.window.close();
});

test('flashcards use the expanded deduplicated vocabulary and finish ten rounds', async () => {
  const {dom,w,errors}=await page('game');
  vm.runInContext(read('game.js'),dom.getInternalVMContext(),{filename:'game.js'});
  w.eval("gameState.level='C2'; startGame();");
  assert.equal(w.eval('getSourceCards().length'),w.eval('vocabularyIndexed.C2.length'));
  for(let i=0;i<10;i++) {
    w.eval(`const card=gameState.deck[gameState.round]; const correct=card.direction==='en-es'?card.translation:card.word; const button=[...document.querySelectorAll('.answer-option')].find(el=>decodeURIComponent(el.dataset.answer)===correct);button.click();`);
    w.document.getElementById('next-card').click();
  }
  assert.match(w.document.getElementById('game-content').textContent,/10 de 10/);
  assert.equal(errors.length,0);dom.window.close();
});

test('all HTML pages reference existing local assets and load progress tools once', () => {
  for(const name of fs.readdirSync(root).filter(name=>name.endsWith('.html'))) {
    const doc=new JSDOM(read(name)).window.document;
    const scripts=[...doc.querySelectorAll('script[src]')].map(el=>el.getAttribute('src').split('?')[0]);
    assert.equal(scripts.filter(src=>src==='progress-tools.js').length,1,name);
    if(scripts.includes('data.js')) assert.ok(scripts.indexOf('curriculum-update.js')>scripts.indexOf('data.js'));
    for(const src of scripts) assert.ok(fs.existsSync(path.join(root,src)),`${name}: ${src}`);
  }
});
