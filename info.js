const infoThemeButton = document.getElementById('theme-toggle');

if (infoThemeButton) {
  const updateInfoThemeIcon = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    infoThemeButton.textContent = dark ? '☀️' : '🌙';
    infoThemeButton.setAttribute('aria-label', dark ? 'Activar tema claro' : 'Activar tema oscuro');
  };

  updateInfoThemeIcon();

  infoThemeButton.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateInfoThemeIcon();
  });
}
