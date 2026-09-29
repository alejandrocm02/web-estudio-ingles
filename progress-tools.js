// Portable progress copies contain learning data only, never passwords or sessions.
(function () {
  'use strict';
  const LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const key = () => window.StudyAuth?.getProgressKey() || 'studyProgressV1';
  function cleanProgress(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('El archivo no contiene un progreso válido.');
    const out = {};
    for (const name of ['grammar', 'reading', 'listening', 'listeningVerified']) {
      out[name] = {};
      for (const level of LEVELS) {
        const list = input[name]?.[level];
        if (Array.isArray(list)) out[name][level] = list.slice(0, 1000).map(value => value === true);
      }
    }
    out.tests = {};
    for (const level of LEVELS) {
      const item = input.tests?.[level];
      if (item && Number.isInteger(item.total) && item.total > 0 && item.total <= 1000 && Number.isInteger(item.best)) {
        out.tests[level] = { total: item.total, best: Math.max(0, Math.min(item.total, item.best)) };
      }
    }
    out.vocabKnown = {};
    for (const [word, value] of Object.entries(input.vocabKnown || {}).slice(0, 10000)) {
      if (/^(A[012]|B[12]|C[12])::.{1,150}$/.test(word) && value === true) out.vocabKnown[word] = true;
    }
    out.readingAnswers = {};
    for (const level of LEVELS) {
      out.readingAnswers[level] = {};
      for (const [textIndex, answers] of Object.entries(input.readingAnswers?.[level] || {})) {
        if (!/^\d{1,3}$/.test(textIndex)) continue;
        out.readingAnswers[level][textIndex] = {};
        for (const [questionIndex, answer] of Object.entries(answers || {})) {
          if (!/^\d{1,2}$/.test(questionIndex) || !answer || typeof answer !== 'object') continue;
          const safe = { answered: answer.answered === true };
          if (typeof answer.text === 'string') safe.text = answer.text.slice(0, 20000);
          if (Number.isInteger(answer.selected) && answer.selected >= 0 && answer.selected < 20) safe.selected = answer.selected;
          out.readingAnswers[level][textIndex][questionIndex] = safe;
        }
      }
    }
    const streak = input.streak || {};
    out.streak = { count: Number.isInteger(streak.count) ? Math.max(0, Math.min(100000, streak.count)) : 0, lastDate: /^\d{4}-\d{2}-\d{2}$/.test(streak.lastDate || '') ? streak.lastDate : '' };
    out.learning = window.StudyLearning?.clean(input.learning) || {};
    return out;
  }
  function mergeProgress(current, incoming) {
    const a = cleanProgress(current), b = cleanProgress(incoming);
    for (const name of ['grammar', 'reading', 'listening', 'listeningVerified']) {
      for (const level of LEVELS) {
        const left = a[name][level] || [], right = b[name][level] || [];
        a[name][level] = Array.from({ length: Math.max(left.length, right.length) }, (_, i) => !!(left[i] || right[i]));
      }
    }
    for (const level of LEVELS) {
      if ((b.tests[level]?.best || 0) > (a.tests[level]?.best || 0)) a.tests[level] = b.tests[level];
      for (const [textIndex, answers] of Object.entries(b.readingAnswers[level])) {
        a.readingAnswers[level][textIndex] = { ...answers, ...a.readingAnswers[level][textIndex] };
      }
    }
    Object.assign(a.vocabKnown, b.vocabKnown);
    a.learning = window.StudyLearning?.merge(a.learning, b.learning) || {};
    if (b.streak.lastDate > a.streak.lastDate) a.streak = b.streak;
    return a;
  }
  function status(message) {
    const el = document.getElementById('backup-status');
    if (el) el.textContent = message;
  }
  window.showStorageWarning = () => status('No se pudo guardar el progreso: comprueba el espacio y los permisos de almacenamiento de tu navegador.');
  function mount() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const section = document.createElement('section');
    section.setAttribute('aria-label', 'Copia del progreso local');
    section.innerHTML = '<div class="backup-controls"><button type="button" id="export-progress">Descargar progreso</button><button type="button" id="import-progress">Restaurar progreso</button><input type="file" id="progress-file" accept="application/json,.json" hidden></div><p class="backup-status" id="backup-status" role="status">Copia del perfil activo o de invitado. Incluye tus respuestas; guárdala en un lugar privado.</p>';
    footer.append(section);
    document.getElementById('export-progress').addEventListener('click', () => {
      try {
        const progress = cleanProgress(JSON.parse(localStorage.getItem(key()) || '{}'));
        const file = new Blob([JSON.stringify({ app: 'StudyEnglish', version: 1, exportedAt: new Date().toISOString(), progress }, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(file), link = document.createElement('a');
        link.href = url; link.download = 'studyenglish-progreso.json'; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        status('Copia descargada. No incluye tu contraseña ni tu sesión.');
      } catch (_) { status('No se pudo crear la copia. Revisa el almacenamiento de este navegador.'); }
    });
    const input = document.getElementById('progress-file');
    document.getElementById('import-progress').addEventListener('click', () => input.click());
    input.addEventListener('change', async () => {
      const file = input.files[0];
      if (!file) return;
      const targetKey = key();
      try {
        if (file.size > 2 * 1024 * 1024) throw new Error('La copia supera el máximo de 2 MB.');
        const parsed = JSON.parse(await file.text());
        if (parsed.app !== 'StudyEnglish' || parsed.version !== 1) throw new Error('Selecciona una copia de progreso de StudyEnglish.');
        if (targetKey !== key()) throw new Error('El perfil ha cambiado. Vuelve a seleccionar el archivo.');
        const merged = mergeProgress(JSON.parse(localStorage.getItem(targetKey) || '{}'), parsed.progress);
        localStorage.setItem(targetKey, JSON.stringify(merged));
        status('Progreso restaurado. Recargando…');
        setTimeout(() => location.reload(), 700);
      } catch (error) { status(error.message || 'No se pudo restaurar la copia.'); }
      input.value = '';
    });
  }
  window.StudyProgressBackup = { cleanProgress, mergeProgress };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
