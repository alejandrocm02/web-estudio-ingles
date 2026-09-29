(function () {
  'use strict';
  const L = window.StudyLearning;
  const labels = { grammar: 'Gramática', tests: 'Tests', reading: 'Reading', listening: 'Listening', vocabulary: 'Vocabulario' };
  const esc = value => escapeHTML(String(value));
  const read = () => L.clean(loadProgress().learning);
  function write(learning) {
    const p = loadProgress(); p.learning = L.clean(learning); saveProgress(p);
  }
  window.recordLearningAttempt = (skill, level, topic, item, correct) => {
    const p = read();
    p.attempts[crypto.randomUUID()] = { at: Date.now(), skill, level, topic: topic || 'General', item: String(item), correct };
    write(p);
  };
  const root = document.getElementById('study-plan');
  if (!root) return;
  let queue = [], active = null, revealed = false, diagnostic = null;
  function focusTitle() { root.querySelector('h2')?.focus(); }
  function dueWords(level) {
    const p = loadProgress(), learning = read();
    const words = vocabularyIndexed?.[level] || [];
    return words.filter(w => {
      const key = getVocabProgressKey(level, w.word), r = learning.reviews[key];
      return (p.vocabKnown[key] || r) && (!r || r.due <= Date.now());
    }).sort((a, b) => (learning.reviews[getVocabProgressKey(level, a.word)]?.due || 0) - (learning.reviews[getVocabProgressKey(level, b.word)]?.due || 0));
  }
  function history(learning, level) {
    const groups = new Map();
    for (const a of Object.values(learning.attempts).filter(a => a.level === level).sort((a,b) => a.at - b.at)) {
      const key = a.skill + '::' + a.topic;
      if (!groups.has(key)) groups.set(key, { skill: a.skill, topic: a.topic, wrong: 0, correct: 0, last: a.at });
      const g = groups.get(key); g[a.correct ? 'correct' : 'wrong']++; g.last = a.at;
    }
    const errors = [...groups.values()].filter(g => g.wrong).sort((a,b) => b.last-a.last);
    return errors.length ? '<ul class="study-history">' + errors.map(g => `<li><strong>${esc(g.topic)}</strong><span>${labels[g.skill]} · ${g.wrong} errores · ${g.correct} aciertos · ${new Date(g.last).toLocaleDateString('es')}</span><a href="${g.skill === 'vocabulary' ? 'vocabulary' : g.skill}.html?level=${level}">Practicar ${esc(g.topic)}</a></li>`).join('') + '</ul>' : '<p>Aún no hay errores registrados en este nivel. Se guardan a partir de ahora al responder actividades.</p>';
  }
  function render(message = '') {
    root.removeAttribute('aria-busy');
    active = null; diagnostic = null;
    const p = read(), level = p.preferredLevel || p.placement?.level || 'A1';
    const due = dueWords(level);
    const route = level === 'A0' ? ['grammar', 'theory'] : ['grammar', 'vocabulary', 'reading', 'listening', 'tests'];
    root.innerHTML = `<section class="exercise-block"><span class="eyebrow">Tu punto de partida</span><h2 tabindex="-1">Una ruta a tu ritmo</h2><p>Prueba orientativa de 18 preguntas de gramática y vocabulario. No certifica un nivel MCER ni evalúa expresión oral, escritura o comprensión auditiva.</p><p>${p.placement ? `Punto de partida sugerido: <strong>${p.placement.level}</strong> · ${new Date(p.placement.at).toLocaleDateString('es')}. Puedes ajustarlo.` : 'Puedes hacer la prueba o elegir un nivel directamente.'}</p><button id="start-placement" class="card-btn">${p.placement ? 'Repetir' : 'Hacer'} prueba orientativa</button><label for="study-level">Nivel de mi ruta</label><select id="study-level">${L.levels.map(l => `<option ${l === level ? 'selected' : ''}>${l}</option>`).join('')}</select><p role="status">${esc(message)}</p></section>
      <section class="exercise-block"><h2>Tu próxima sesión · ${level}</h2><p>Dedica unos 15 minutos: una explicación, práctica y un repaso. Avanza cuando te resulte cómodo.</p><ol class="study-route">${route.map(skill => `<li><a href="${skill}.html?level=${level}">${labels[skill] || 'Teoría'} · ${level === 'A0' && skill === 'theory' ? 'Consulta las bases' : 'Continuar'}</a></li>`).join('')}</ol></section>
      <section class="exercise-block"><h2>Repaso espaciado</h2><p>${due.length} palabras pendientes en ${level}. Marca palabras como aprendidas en Vocabulario para incorporarlas. Primero intenta recordarlas y después muestra la traducción.</p><button id="start-review" class="card-btn" ${due.length ? '' : 'disabled'}>Repasar hasta 10 palabras</button><p>Si la recuerdas: 1, 3, 7, 14, 30 y 60 días. Si cuesta: vuelve en 10 minutos. El repaso no borra tus palabras aprendidas.</p></section>
      <section class="exercise-block"><h2>Historial por tema · ${level}</h2><p>Últimos 2.000 intentos del perfil activo, incluidos los aciertos posteriores. Un error anterior sigue visible para mostrar tu recorrido.</p>${history(p, level)}</section>`;
    root.querySelector('#study-level').onchange = e => { const p = read(); p.preferredLevel = e.target.value; write(p); render(); focusTitle(); };
    root.querySelector('#start-review').onclick = () => { queue = due.slice(0, 10).map(w => ({ ...w, level })); review(); };
    root.querySelector('#start-placement').onclick = startPlacement;
  }
  function review() {
    active = queue.shift(); revealed = false;
    if (!active) { render('Sesión de repaso terminada. Tus próximas fechas ya están guardadas.'); focusTitle(); return; }
    root.innerHTML = `<section class="exercise-block"><h2 tabindex="-1">Recuerda esta palabra</h2><p>${queue.length + 1} restantes · ${active.level}</p><p class="study-word" lang="en">${esc(active.word)}</p><button class="card-btn" id="reveal-review">Mostrar traducción</button><div id="review-answer"></div><button id="exit-review" class="account-secondary">Volver a mi ruta</button></section>`;
    root.querySelector('#exit-review').onclick = () => { render(); focusTitle(); };
    root.querySelector('#reveal-review').onclick = e => {
      if (revealed) return; revealed = true; e.currentTarget.hidden = true;
      const answer = root.querySelector('#review-answer');
      answer.innerHTML = `<p>${esc(active.translation)}</p>${active.example ? `<p lang="en">${esc(active.example)}</p>` : ''}<div class="study-actions"><button id="review-again">Me cuesta · 10 min</button><button id="review-good">La recuerdo</button></div>`;
      answer.querySelector('#review-again').onclick = () => rate(false);
      answer.querySelector('#review-good').onclick = () => rate(true);
      answer.querySelector('button').focus();
    };
    focusTitle();
  }
  function rate(remembered) {
    if (!active || !revealed) return;
    const word = active; active = null;
    const p = read(), key = getVocabProgressKey(word.level, word.word);
    p.reviews[key] = L.schedule(p.reviews[key], remembered); write(p);
    recordLearningAttempt('vocabulary', word.level, getCategoryInfo(categorizeWord(word.word, word.translation)).label, word.word, remembered);
    recordStudyActivity(); review();
  }
  function startPlacement() {
    diagnostic = { questions: [], answers: [], index: 0 };
    for (const l of data.tests.levels) {
      const seen = new Set();
      const chosen = l.questions.filter(q => { if (seen.has(q.topic)) return false; seen.add(q.topic); return true; }).slice(0,3);
      for (const q of l.questions) if (chosen.length < 3 && !chosen.includes(q)) chosen.push(q);
      diagnostic.questions.push(...shuffleTest(chosen).map(q => ({ ...q, level: l.level })));
    }
    placementQuestion();
  }
  function placementQuestion() {
    if (diagnostic.index >= diagnostic.questions.length) {
      const p = read(); p.placement = { level: L.placementLevel(diagnostic.answers), at: Date.now() }; p.preferredLevel = p.placement.level; write(p);
      render('Prueba terminada. Tu ruta se ha actualizado; tus resultados de los tests se conservan.'); focusTitle(); return;
    }
    const q = diagnostic.questions[diagnostic.index];
    root.innerHTML = `<section class="exercise-block"><h2 tabindex="-1">Prueba orientativa · ${diagnostic.index + 1} de ${diagnostic.questions.length}</h2><p lang="en">${esc(q.q)}</p><div id="placement-options">${q.options.map((o,i) => `<button class="option-btn" data-answer="${i}" lang="en">${esc(o)}</button>`).join('')}<button class="option-btn" data-answer="-1">No lo sé</button></div><button id="cancel-placement" class="account-secondary">Salir sin guardar la prueba</button></section>`;
    root.querySelectorAll('[data-answer]').forEach(b => b.onclick = () => { diagnostic.answers.push({ level: q.level, correct: Number(b.dataset.answer) === q.correct }); diagnostic.index++; placementQuestion(); });
    root.querySelector('#cancel-placement').onclick = () => { render(); focusTitle(); };
    focusTitle();
  }
  vocabularyReady.then(() => render()).catch(() => { root.textContent = 'No se pudo cargar el vocabulario. Recarga la página para volver a intentarlo.'; });
})();
