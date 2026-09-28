/**
 * Dark / Light Theme Module
 * Handles manual toggle, localStorage persistence, and system preference sync.
 */

export function initTheme() {
  const desktopToggle = document.getElementById('theme-toggle');
  const desktopIcon = desktopToggle?.querySelector('.theme-icon');

  const mobileToggle = document.getElementById('theme-toggle-mobile');
  const mobileIcon = mobileToggle?.querySelector('.theme-icon-mobile');
  const mobileText = mobileToggle?.querySelector('.theme-text-mobile');

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function updateUI(theme) {
    const isDark = theme === 'dark';
    const iconName = isDark ? 'light_mode' : 'dark_mode';
    const textLabel = isDark ? '亮色模式' : '暗色模式';

    if (desktopIcon) desktopIcon.textContent = iconName;
    if (mobileIcon) mobileIcon.textContent = iconName;
    if (mobileText) mobileText.textContent = textLabel;
  }

  function setTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
      localStorage.setItem('theme', theme);
    }
    updateUI(theme);
  }

  function toggleTheme(e) {
    if (e) e.preventDefault();
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next, true);
  }

  // Initial UI sync
  updateUI(getCurrentTheme());

  // Event Listeners
  desktopToggle?.addEventListener('click', toggleTheme);
  mobileToggle?.addEventListener('click', toggleTheme);

  // Sync with OS theme changes when not manually overridden
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }
}
