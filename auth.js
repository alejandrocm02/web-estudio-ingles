// ============================================================
//  AUTH.JS — Perfiles locales y progreso separado por usuario
// ============================================================

(function () {
  'use strict';

  const ACCOUNTS_KEY = 'studyEnglishAccountsV1';
  const SESSION_KEY = 'studyEnglishSessionV1';
  const LEGACY_PROGRESS_KEY = 'studyProgressV1';
  const GUEST_PROGRESS_KEY = 'studyProgressV1:guest';
  const HASH_ITERATIONS = 180000;

  function readJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function normalizeUsername(value) {
    return String(value).trim().toLocaleLowerCase('es');
  }

  function getAccounts() {
    const accounts = readJSON(ACCOUNTS_KEY, []);
    return Array.isArray(accounts) ? accounts : [];
  }

  function getSession() {
    const session = readJSON(SESSION_KEY, null);
    if (!session?.accountId) return null;
    const account = getAccounts().find(item => item.id === session.accountId);
    if (!account) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return account;
  }

  function getProgressKey(account = getSession()) {
    return account ? `${LEGACY_PROGRESS_KEY}:user:${account.id}` : GUEST_PROGRESS_KEY;
  }

  function migrateLegacyProgress() {
    const legacy = localStorage.getItem(LEGACY_PROGRESS_KEY);
    if (legacy && !localStorage.getItem(GUEST_PROGRESS_KEY)) {
      localStorage.setItem(GUEST_PROGRESS_KEY, legacy);
    }
  }

  function bytesToBase64(bytes) {
    let binary = '';
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }

  function base64ToBytes(value) {
    const binary = atob(value);
    return Uint8Array.from(binary, char => char.charCodeAt(0));
  }

  async function derivePassword(password, salt) {
    if (!window.crypto?.subtle) {
      throw new Error('Tu navegador no permite proteger la contraseña de forma segura.');
    }
    const material = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );
    const bits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        hash: 'SHA-256',
        salt,
        iterations: HASH_ITERATIONS
      },
      material,
      256
    );
    return bytesToBase64(new Uint8Array(bits));
  }

  function validateUsername(username) {
    const clean = String(username).trim();
    if (clean.length < 3 || clean.length > 24) {
      return 'El usuario debe tener entre 3 y 24 caracteres.';
    }
    if (!/^[\p{L}\p{N}._-]+$/u.test(clean)) {
      return 'Usa letras, números, punto, guion o guion bajo.';
    }
    return '';
  }

  function validatePassword(password) {
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (!/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(password) || !/\d/.test(password)) {
      return 'Incluye al menos una letra y un número.';
    }
    return '';
  }

  async function register(username, password) {
    const usernameError = validateUsername(username);
    if (usernameError) throw new Error(usernameError);
    const passwordError = validatePassword(password);
    if (passwordError) throw new Error(passwordError);

    const accounts = getAccounts();
    const isFirstAccount = accounts.length === 0;
    const normalized = normalizeUsername(username);
    if (accounts.some(account => account.normalizedUsername === normalized)) {
      throw new Error('Ese nombre de usuario ya existe en este dispositivo.');
    }

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const account = {
      id: crypto.randomUUID(),
      username: String(username).trim(),
      normalizedUsername: normalized,
      salt: bytesToBase64(salt),
      passwordHash: await derivePassword(password, salt),
      createdAt: new Date().toISOString()
    };
    accounts.push(account);
    writeJSON(ACCOUNTS_KEY, accounts);

    const guestProgress = localStorage.getItem(GUEST_PROGRESS_KEY);
    if (isFirstAccount && guestProgress && !localStorage.getItem(getProgressKey(account))) {
      localStorage.setItem(getProgressKey(account), guestProgress);
    }

    writeJSON(SESSION_KEY, { accountId: account.id });
    return account;
  }

  async function login(username, password) {
    const normalized = normalizeUsername(username);
    const account = getAccounts().find(item => item.normalizedUsername === normalized);
    if (!account) throw new Error('Usuario o contraseña incorrectos.');
    const candidate = await derivePassword(password, base64ToBytes(account.salt));
    if (candidate !== account.passwordHash) throw new Error('Usuario o contraseña incorrectos.');
    writeJSON(SESSION_KEY, { accountId: account.id });
    return account;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function deleteCurrentAccount() {
    const account = getSession();
    if (!account) return;
    writeJSON(ACCOUNTS_KEY, getAccounts().filter(item => item.id !== account.id));
    localStorage.removeItem(getProgressKey(account));
    localStorage.removeItem(SESSION_KEY);
  }

  function dispatchAccountChange() {
    window.dispatchEvent(new CustomEvent('studyauthchange', { detail: { account: getSession() } }));
  }

  function mountAccountUI() {
    if (document.getElementById('account-toggle')) return;
    const header = document.querySelector('header');
    if (!header) return;

    const account = getSession();
    const toggle = document.createElement('button');
    toggle.id = 'account-toggle';
    toggle.className = 'account-toggle';
    toggle.type = 'button';
    toggle.innerHTML = account
      ? `<span aria-hidden="true">●</span><span>${account.username}</span>`
      : '<span aria-hidden="true">◎</span><span>Entrar</span>';
    toggle.setAttribute('aria-label', account ? `Cuenta de ${account.username}` : 'Iniciar sesión o crear una cuenta');

    const themeToggle = header.querySelector('.theme-toggle');
    if (themeToggle) themeToggle.insertAdjacentElement('beforebegin', toggle);
    else header.prepend(toggle);

    document.body.insertAdjacentHTML('beforeend', `
      <div class="account-overlay" id="account-overlay" hidden>
        <section class="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
          <button class="account-close" id="account-close" type="button" aria-label="Cerrar">×</button>
          <div id="account-content"></div>
        </section>
      </div>
    `);

    const overlay = document.getElementById('account-overlay');
    const close = () => {
      overlay.hidden = true;
      document.body.classList.remove('account-open');
      toggle.focus();
    };
    const open = () => {
      renderAccountView(account ? 'profile' : 'login');
      overlay.hidden = false;
      document.body.classList.add('account-open');
      requestAnimationFrame(() => overlay.querySelector('input, button')?.focus());
    };

    toggle.addEventListener('click', open);
    document.getElementById('account-close').addEventListener('click', close);
    overlay.addEventListener('click', event => {
      if (event.target === overlay) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !overlay.hidden) close();
    });
  }

  function accountMessage(text, type = 'error') {
    const message = document.getElementById('account-message');
    if (!message) return;
    message.className = `account-message ${type}`;
    message.textContent = text;
  }

  function renderAccountView(view) {
    const root = document.getElementById('account-content');
    if (!root) return;
    const account = getSession();

    if (view === 'profile' && account) {
      root.innerHTML = `
        <span class="account-eyebrow">TU ESPACIO DE ESTUDIO</span>
        <h2 id="account-title">Hola, ${account.username}</h2>
        <p class="account-copy">Tu progreso está separado del resto de usuarios de este dispositivo.</p>
        <div class="account-profile-card">
          <span aria-hidden="true">${account.username.charAt(0).toUpperCase()}</span>
          <div><strong>${account.username}</strong><small>Cuenta local activa</small></div>
        </div>
        <div class="account-notice">
          <strong>Guardado privado en este navegador</strong>
          <p>La contraseña nunca se guarda sin proteger. Para sincronizar entre dispositivos será necesario conectar un servicio de autenticación en la nube.</p>
        </div>
        <button class="account-primary" id="account-continue" type="button">Seguir estudiando</button>
        <button class="account-secondary" id="account-logout" type="button">Cerrar sesión</button>
        <button class="account-delete" id="account-delete" type="button">Eliminar cuenta y progreso</button>
      `;
      document.getElementById('account-continue').addEventListener('click', () => {
        document.getElementById('account-overlay').hidden = true;
        document.body.classList.remove('account-open');
      });
      document.getElementById('account-logout').addEventListener('click', () => {
        logout();
        dispatchAccountChange();
        location.reload();
      });
      document.getElementById('account-delete').addEventListener('click', () => {
        const accepted = window.confirm(`¿Eliminar la cuenta de ${account.username} y todo su progreso en este dispositivo? Esta acción no se puede deshacer.`);
        if (!accepted) return;
        deleteCurrentAccount();
        dispatchAccountChange();
        location.reload();
      });
      return;
    }

    const isRegister = view === 'register';
    root.innerHTML = `
      <span class="account-eyebrow">PROGRESO PERSONAL</span>
      <h2 id="account-title">${isRegister ? 'Crea tu cuenta' : 'Vuelve a tu ruta'}</h2>
      <p class="account-copy">${isRegister
        ? 'Crea un perfil para conservar tu avance separado en este dispositivo.'
        : 'Inicia sesión para recuperar tus palabras, ejercicios y lecturas.'}</p>
      <div class="account-tabs" role="tablist" aria-label="Acceso">
        <button type="button" role="tab" aria-selected="${!isRegister}" data-account-view="login">Entrar</button>
        <button type="button" role="tab" aria-selected="${isRegister}" data-account-view="register">Crear cuenta</button>
      </div>
      <form id="account-form" novalidate>
        <label for="account-username">Usuario</label>
        <input id="account-username" name="username" type="text" autocomplete="username" minlength="3" maxlength="24" required>
        <label for="account-password">Contraseña</label>
        <div class="account-password-row">
          <input id="account-password" name="password" type="password"
            autocomplete="${isRegister ? 'new-password' : 'current-password'}" minlength="8" required>
          <button type="button" id="account-show-password" aria-label="Mostrar contraseña">Ver</button>
        </div>
        ${isRegister ? `
          <label for="account-confirm">Repite la contraseña</label>
          <input id="account-confirm" name="confirm" type="password" autocomplete="new-password" minlength="8" required>
          <p class="account-password-hint">Mínimo 8 caracteres, con al menos una letra y un número.</p>
        ` : ''}
        <p class="account-message" id="account-message" role="status" aria-live="polite"></p>
        <button class="account-primary" id="account-submit" type="submit">${isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</button>
      </form>
      <p class="account-local-note"><span aria-hidden="true">◈</span> Cuenta local: no envía tus datos a servidores externos.</p>
    `;

    root.querySelectorAll('[data-account-view]').forEach(button => {
      button.addEventListener('click', () => renderAccountView(button.dataset.accountView));
    });
    document.getElementById('account-show-password').addEventListener('click', event => {
      const input = document.getElementById('account-password');
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      event.currentTarget.textContent = showing ? 'Ver' : 'Ocultar';
      event.currentTarget.setAttribute('aria-label', showing ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });
    document.getElementById('account-form').addEventListener('submit', async event => {
      event.preventDefault();
      const submit = document.getElementById('account-submit');
      const username = document.getElementById('account-username').value;
      const password = document.getElementById('account-password').value;
      if (isRegister && password !== document.getElementById('account-confirm').value) {
        accountMessage('Las contraseñas no coinciden.');
        return;
      }

      submit.disabled = true;
      submit.textContent = isRegister ? 'Creando…' : 'Entrando…';
      try {
        await (isRegister ? register(username, password) : login(username, password));
        accountMessage(isRegister ? 'Cuenta creada. Recuperando tu progreso…' : 'Sesión iniciada. Recuperando tu progreso…', 'success');
        dispatchAccountChange();
        setTimeout(() => location.reload(), 450);
      } catch (error) {
        accountMessage(error.message || 'No se pudo completar la operación.');
        submit.disabled = false;
        submit.textContent = isRegister ? 'Crear cuenta' : 'Iniciar sesión';
      }
    });
  }

  migrateLegacyProgress();

  window.StudyAuth = {
    getCurrentUser: getSession,
    getProgressKey,
    register,
    login,
    logout,
    deleteCurrentAccount,
    renderAccountView
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAccountUI);
  } else {
    mountAccountUI();
  }
})();
