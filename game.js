// Juego de fichas: vocabulario general, verbos y pronombres.
const GAME_ROUNDS = 10;

const VERB_CARDS = [
  ['be', 'ser / estar'], ['have', 'tener'], ['do', 'hacer'], ['go', 'ir'],
  ['come', 'venir'], ['make', 'hacer / crear'], ['take', 'tomar / llevar'],
  ['give', 'dar'], ['get', 'obtener'], ['know', 'saber / conocer'],
  ['think', 'pensar'], ['see', 'ver'], ['say', 'decir'], ['speak', 'hablar'],
  ['eat', 'comer'], ['drink', 'beber'], ['sleep', 'dormir'], ['read', 'leer'],
  ['write', 'escribir'], ['learn', 'aprender'], ['teach', 'enseñar'],
  ['buy', 'comprar'], ['bring', 'traer'], ['find', 'encontrar']
].map(([word, translation]) => ({ word, translation }));

const PRONOUN_CARDS = [
  ['I', 'yo'], ['you', 'tú / usted'], ['he', 'él'], ['she', 'ella'],
  ['it', 'ello / eso'], ['we', 'nosotros/as'], ['they', 'ellos/as'],
  ['me', 'me / a mí'], ['him', 'lo / le / a él'], ['her', 'la / le / a ella'],
  ['us', 'nos / a nosotros'], ['them', 'los / las / a ellos'],
  ['my', 'mi'], ['your', 'tu / su'], ['his', 'su (de él)'],
  ['our', 'nuestro/a'], ['their', 'su (de ellos)'], ['mine', 'mío/a'],
  ['who', 'quién'], ['what', 'qué'], ['which', 'cuál']
].map(([word, translation]) => ({ word, translation }));

const gameState = {
  mode: 'vocabulary',
  level: 'A1',
  direction: 'random',
  deck: [],
  round: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  locked: false
};

const gameRoot = document.getElementById('game-content');

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeAnswer(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function getSourceCards() {
  if (gameState.mode === 'verbs') return VERB_CARDS;
  if (gameState.mode === 'pronouns') return PRONOUN_CARDS;
  return (vocabularyData && vocabularyData[gameState.level]) || [];
}

function getRoundDirection() {
  if (gameState.direction !== 'random') return gameState.direction;
  return Math.random() < 0.5 ? 'en-es' : 'es-en';
}

function buildDeck() {
  const source = getSourceCards().filter(card => card.word && card.translation);
  gameState.deck = shuffle(source).slice(0, Math.min(GAME_ROUNDS, source.length)).map(card => ({
    ...card,
    direction: getRoundDirection()
  }));
}

function renderGameSetup() {
  gameRoot.innerHTML = `
    <div class="game-intro">
      <span class="eyebrow">Reto rápido · ${GAME_ROUNDS} fichas</span>
      <h2>¿Qué quieres practicar?</h2>
      <p>Elige el tipo de fichas y adivina la traducción correcta. Cada partida mezcla las preguntas.</p>
    </div>

    <div class="game-settings" aria-label="Opciones de la partida">
      <fieldset>
        <legend>Contenido</legend>
        <div class="game-choice-grid">
          ${setupButton('mode', 'vocabulary', '📚', 'Vocabulario', 'Palabras de todos los temas')}
          ${setupButton('mode', 'verbs', '🏃', 'Verbos', 'Acciones esenciales')}
          ${setupButton('mode', 'pronouns', '👤', 'Pronombres', 'Personales y posesivos')}
        </div>
      </fieldset>

      <fieldset id="game-level-setting">
        <legend>Nivel</legend>
        <div class="game-pills">
          ${['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => `
            <button class="game-pill ${gameState.level === level ? 'active' : ''}"
              type="button" data-setting="level" data-value="${level}">${level}</button>`).join('')}
        </div>
      </fieldset>

      <fieldset>
        <legend>Dirección</legend>
        <div class="game-pills">
          <button class="game-pill ${gameState.direction === 'random' ? 'active' : ''}" type="button" data-setting="direction" data-value="random">🔀 Mezclado</button>
          <button class="game-pill ${gameState.direction === 'en-es' ? 'active' : ''}" type="button" data-setting="direction" data-value="en-es">EN → ES</button>
          <button class="game-pill ${gameState.direction === 'es-en' ? 'active' : ''}" type="button" data-setting="direction" data-value="es-en">ES → EN</button>
        </div>
      </fieldset>
    </div>

    <button class="game-primary-btn" id="start-game" type="button">Empezar partida <span aria-hidden="true">→</span></button>
  `;

  gameRoot.querySelectorAll('[data-setting]').forEach(button => {
    button.addEventListener('click', () => {
      gameState[button.dataset.setting] = button.dataset.value;
      renderGameSetup();
    });
  });
  document.getElementById('start-game').addEventListener('click', startGame);

  const levelSetting = document.getElementById('game-level-setting');
  levelSetting.hidden = gameState.mode !== 'vocabulary';
}

function setupButton(setting, value, icon, title, description) {
  return `
    <button class="game-mode-card ${gameState[setting] === value ? 'active' : ''}"
      type="button" data-setting="${setting}" data-value="${value}">
      <span class="game-mode-icon">${icon}</span>
      <strong>${title}</strong>
      <small>${description}</small>
    </button>`;
}

function startGame() {
  buildDeck();
  gameState.round = 0;
  gameState.score = 0;
  gameState.streak = 0;
  gameState.bestStreak = 0;
  showRound();
}

function showRound() {
  gameState.locked = false;
  if (gameState.round >= gameState.deck.length) {
    showResults();
    return;
  }

  const card = gameState.deck[gameState.round];
  const asksEnglish = card.direction === 'en-es';
  const prompt = asksEnglish ? card.word : card.translation;
  const correct = asksEnglish ? card.translation : card.word;
  const seenOptions = new Set([normalizeAnswer(correct)]);
  const alternatives = shuffle(getSourceCards())
    .map(item => asksEnglish ? item.translation : item.word)
    .filter(option => {
      const normalized = normalizeAnswer(option);
      if (!normalized || seenOptions.has(normalized)) return false;
      seenOptions.add(normalized);
      return true;
    })
    .slice(0, 3);
  const options = shuffle([correct, ...alternatives]);
  const progress = Math.round((gameState.round / gameState.deck.length) * 100);

  gameRoot.innerHTML = `
    <div class="game-topbar">
      <button class="game-quit-btn" id="quit-game" type="button">← Salir</button>
      <div class="game-counter">Ficha ${gameState.round + 1} de ${gameState.deck.length}</div>
      <div class="game-score">⭐ ${gameState.score}</div>
    </div>
    <div class="game-round-progress" aria-label="Progreso de la partida">
      <span style="width:${progress}%"></span>
    </div>

    <section class="flashcard-stage" aria-live="polite">
      <div class="language-route">
        <span>${asksEnglish ? 'ENGLISH' : 'ESPAÑOL'}</span>
        <span aria-hidden="true">→</span>
        <span>${asksEnglish ? 'ESPAÑOL' : 'ENGLISH'}</span>
      </div>
      <div class="flashcard">
        <span class="flashcard-kicker">¿Qué significa?</span>
        <h2>${prompt}</h2>
        ${card.example && asksEnglish ? `<p>“${card.example}”</p>` : ''}
      </div>
    </section>

    <div class="answer-grid" id="answer-grid">
      ${options.map((option, index) => `
        <button class="answer-option" type="button" data-answer="${encodeURIComponent(option)}">
          <span>${String.fromCharCode(65 + index)}</span>${option}
        </button>`).join('')}
    </div>
    <div class="game-feedback" id="game-feedback" role="status" aria-live="assertive"></div>
  `;

  document.getElementById('quit-game').addEventListener('click', renderGameSetup);
  gameRoot.querySelectorAll('.answer-option').forEach(button => {
    button.addEventListener('click', () => checkGameAnswer(button, decodeURIComponent(button.dataset.answer), correct));
  });
}

function checkGameAnswer(button, selected, correct) {
  if (gameState.locked) return;
  gameState.locked = true;
  const isCorrect = normalizeAnswer(selected) === normalizeAnswer(correct);

  gameRoot.querySelectorAll('.answer-option').forEach(option => {
    option.disabled = true;
    const value = decodeURIComponent(option.dataset.answer);
    if (normalizeAnswer(value) === normalizeAnswer(correct)) option.classList.add('correct');
  });

  if (isCorrect) {
    button.classList.add('correct');
    gameState.score++;
    gameState.streak++;
    gameState.bestStreak = Math.max(gameState.bestStreak, gameState.streak);
  } else {
    button.classList.add('wrong');
    gameState.streak = 0;
  }

  const feedback = document.getElementById('game-feedback');
  feedback.className = `game-feedback show ${isCorrect ? 'ok' : 'ko'}`;
  feedback.innerHTML = `
    <div>
      <strong>${isCorrect ? '¡Correcto!' : 'Casi. La respuesta es:'}</strong>
      ${isCorrect ? `Racha de ${gameState.streak} ${gameState.streak === 1 ? 'acierto' : 'aciertos'}` : correct}
    </div>
    <button class="game-next-btn" id="next-card" type="button">
      ${gameState.round === gameState.deck.length - 1 ? 'Ver resultado' : 'Siguiente'} →
    </button>`;
  document.getElementById('next-card').addEventListener('click', () => {
    gameState.round++;
    showRound();
  });
}

function showResults() {
  const percentage = Math.round((gameState.score / gameState.deck.length) * 100);
  const message = percentage === 100
    ? '¡Partida perfecta!'
    : percentage >= 70
      ? '¡Muy buen trabajo!'
      : 'Cada ficha te hace mejorar.';

  if (typeof recordStudyActivity === 'function') recordStudyActivity();

  gameRoot.innerHTML = `
    <section class="game-results">
      <div class="result-emoji">${percentage === 100 ? '🏆' : percentage >= 70 ? '🎉' : '💪'}</div>
      <span class="eyebrow">Partida terminada</span>
      <h2>${message}</h2>
      <p>Has acertado <strong>${gameState.score} de ${gameState.deck.length}</strong> fichas.</p>
      <div class="result-stats">
        <div><strong>${percentage}%</strong><span>Aciertos</span></div>
        <div><strong>${gameState.bestStreak}</strong><span>Mejor racha</span></div>
        <div><strong>${gameState.deck.length}</strong><span>Fichas</span></div>
      </div>
      <div class="result-actions">
        <button class="game-primary-btn" id="play-again" type="button">Jugar otra vez</button>
        <button class="game-secondary-btn" id="change-settings" type="button">Cambiar opciones</button>
      </div>
    </section>`;
  document.getElementById('play-again').addEventListener('click', startGame);
  document.getElementById('change-settings').addEventListener('click', renderGameSetup);
}

function waitForVocabulary() {
  if (vocabularyData) {
    renderGameSetup();
    return;
  }
  window.setTimeout(waitForVocabulary, 100);
}

waitForVocabulary();
