// Learning records contain no account credentials. Shared by the UI and backups.
(function (root) {
  'use strict';
  const levels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const day = 86400000;
  const validTime = n => Number.isFinite(n) && n >= 0 && n < 8640000000000000;
  const wordKey = k => /^(A[012]|B[12]|C[12])::.{1,150}$/.test(k);
  function clean(input = {}) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) input = {};
    const out = { reviews: {}, attempts: {}, placement: null, preferredLevel: null };
    for (const [key, r] of Object.entries(input.reviews || {}).slice(0, 10000)) {
      if (!wordKey(key) || !r || !validTime(r.due) || !validTime(r.updatedAt)) continue;
      if (!Number.isInteger(r.step) || r.step < 0 || r.step > 6) continue;
      out.reviews[key] = { step: r.step, due: r.due, updatedAt: r.updatedAt };
    }
    for (const [id, a] of Object.entries(input.attempts || {}).slice(-2000)) {
      if (!/^[a-zA-Z0-9-]{1,80}$/.test(id) || !a || !validTime(a.at) || !levels.includes(a.level)) continue;
      if (!['grammar', 'tests', 'reading', 'listening', 'vocabulary'].includes(a.skill)) continue;
      if (typeof a.topic !== 'string' || typeof a.item !== 'string' || typeof a.correct !== 'boolean') continue;
      out.attempts[id] = { at: a.at, level: a.level, skill: a.skill, topic: a.topic.slice(0, 160), item: a.item.slice(0, 500), correct: a.correct };
    }
    if (input.placement && levels.includes(input.placement.level) && validTime(input.placement.at)) {
      out.placement = { level: input.placement.level, at: input.placement.at };
    }
    if (levels.includes(input.preferredLevel)) out.preferredLevel = input.preferredLevel;
    return out;
  }
  function merge(left, right) {
    const a = clean(left), b = clean(right);
    for (const [key, r] of Object.entries(b.reviews)) {
      if (!a.reviews[key] || r.updatedAt > a.reviews[key].updatedAt) a.reviews[key] = r;
    }
    a.attempts = Object.fromEntries(Object.entries({ ...b.attempts, ...a.attempts }).sort((x, y) => x[1].at - y[1].at || x[0].localeCompare(y[0])).slice(-2000));
    if (b.placement && (!a.placement || b.placement.at > a.placement.at)) a.placement = b.placement;
    a.preferredLevel ||= b.preferredLevel;
    return a;
  }
  function schedule(previous, remembered, now = Date.now()) {
    const step = remembered ? Math.min(6, (previous?.step || 0) + 1) : 0;
    const intervals = [10 / 1440, 1, 3, 7, 14, 30, 60];
    return { step, due: now + Math.round(intervals[step] * day), updatedAt: now };
  }
  function placementLevel(results) {
    let level = 'A0';
    for (const current of levels.slice(1)) {
      const answers = results.filter(r => r.level === current);
      if (answers.length !== 3 || answers.filter(r => r.correct).length < 2) break;
      level = levels[Math.min(6, levels.indexOf(current) + 1)];
    }
    return level;
  }
  root.StudyLearning = { clean, merge, schedule, placementLevel, levels };
  if (typeof module !== 'undefined') module.exports = root.StudyLearning;
})(typeof window === 'undefined' ? globalThis : window);
