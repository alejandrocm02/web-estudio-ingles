// Fixed recordings. Playback never falls back to device speech synthesis.
(function () {
  'use strict';
  window.stopListeningAudio = () => document.querySelectorAll('audio[data-study-track]').forEach(a => a.pause());
  window.setRecordedRate = value => {
    const rate = Number(value);
    if (![0.75, 0.9, 1, 1.25].includes(rate)) return;
    window.recordedRate = rate;
    document.querySelectorAll('audio[data-study-track]').forEach(a => { a.playbackRate = rate; });
  };
  window.toggleRecordedAudio = async (index) => {
    const audio = document.getElementById(`recording-${index}`);
    if (!audio) return;
    const retry = Boolean(audio.error || audio.dataset.failed);
    if (!audio.paused && !retry) { audio.pause(); return; }
    const status = document.getElementById(`audio-status-${index}`);
    try {
      delete audio.dataset.failed;
      // A rejected play() can leave WebKit unpaused without a MediaError yet.
      // Reset that failed load before requesting playback again.
      if (retry) audio.load();
      status.textContent = 'Cargando audio…';
      audio.playbackRate = window.recordedRate || 1;
      await audio.play();
    } catch (error) {
      if (error.name === 'AbortError') { status.textContent = 'Audio en pausa.'; return; }
      audio.dataset.failed = 'true';
      status.textContent = 'No se pudo reproducir el audio. Comprueba la conexión y vuelve a intentarlo. La transcripción sigue disponible.';
    }
  };
  function onAudio(event) {
    const a = event.target;
    if (!a.matches?.('audio[data-study-track]')) return;
    const i = a.dataset.studyTrack;
    const btn = document.getElementById(`play-${i}`);
    const status = document.getElementById(`audio-status-${i}`);
    if (event.type === 'error' || a.error) a.dataset.failed = 'true';
    if (a.dataset.failed) {
      if (status) status.textContent = 'No se pudo cargar el audio. Comprueba la conexión y usa la transcripción mientras tanto.';
      if (btn) { btn.textContent = 'Reproducir'; btn.setAttribute('aria-label', `Reproducir ${a.dataset.title}`); }
      return;
    }
    if (event.type === 'play') {
      document.querySelectorAll('audio[data-study-track]').forEach(other => { if (other !== a) other.pause(); });
      a.playbackRate = window.recordedRate || 1;
      if (btn) { btn.textContent = 'Pausar'; btn.setAttribute('aria-label', `Pausar ${a.dataset.title}`); }
      if (status) status.textContent = 'Reproduciendo.';
    } else if (event.type === 'pause' || event.type === 'ended') {
      if (btn) { btn.textContent = 'Reproducir'; btn.setAttribute('aria-label', `Reproducir ${a.dataset.title}`); }
      if (status) status.textContent = event.type === 'ended' ? 'Audio terminado. Responde la pregunta de comprensión.' : 'Audio en pausa.';
      if (event.type === 'ended') markListeningComplete(a.dataset.level, Number(i));
    } else if (event.type === 'error' && status) {
      status.textContent = 'No se pudo cargar el audio. Comprueba la conexión y usa la transcripción mientras tanto.';
    }
  }
  for (const type of ['play','pause','ended','error']) document.addEventListener(type, onAudio, true);
  window.addEventListener('pagehide', window.stopListeningAudio);
})();
