const { test } = require('node:test');
const assert = require('node:assert/strict');
const L = require('../learning.js');

test('spaced repetition increases intervals and recovers after a lapse', () => {
  const now = Date.UTC(2026,8,29);
  let r;
  for (const days of [1,3,7,14,30,60,60]) {
    r = L.schedule(r, true, now);
    assert.equal(r.due, now + days * 86400000);
  }
  r = L.schedule(r, false, now);
  assert.equal(r.step,0); assert.equal(r.due,now+600000);
  assert.equal(L.schedule(r,true,now).due,now+86400000);
});

test('merging backups preserves independent attempts and latest schedules without double counting', () => {
  const attempt = { at: 1, level:'A1', skill:'grammar', topic:'Present simple', item:'1', correct:false };
  const a = { reviews:{'A1::apple':L.schedule(null,true,1000)},attempts:{one:attempt} };
  const b = { reviews:{'A1::apple':L.schedule(null,false,2000)},attempts:{two:{...attempt,correct:true}} };
  const merged = L.merge(a,b);
  assert.equal(merged.reviews['A1::apple'].due,602000);
  assert.equal(Object.keys(merged.attempts).length,2);
  assert.deepEqual(L.merge(merged,b),merged);
  assert.equal(Object.values(merged.attempts).filter(a=>!a.correct).length,1);
});

test('learning import validates untrusted data and excludes passwords', () => {
  const safe = L.clean({password:'secret',reviews:{bad:{step:1,due:5,updatedAt:1},'A1::apple':{step:-3,due:5,updatedAt:1}},attempts:{x:{at:2,level:'A1',skill:'tests',topic:'x',item:'x',correct:'false'}},placement:{level:'ADMIN',at:2}});
  assert.deepEqual(safe,{reviews:{},attempts:{},placement:null,preferredLevel:null});
});

test('orientation requires evidence at consecutive levels and never changes tests', () => {
  const results = L.levels.slice(1).flatMap(level => [true,true,false].map(correct=>({level,correct})));
  assert.equal(L.placementLevel(results),'C2');
  results.filter(r=>r.level==='B1').forEach(r=>r.correct=false);
  assert.equal(L.placementLevel(results),'B1');
  results.filter(r=>r.level==='A1').forEach(r=>r.correct=false);
  assert.equal(L.placementLevel(results),'A0');
  assert.equal(L.placementLevel([]),'A0');
});
