/**
 * Dark / Light Theme Module
 * Handles manual toggle, localStorage persistence, and system preference sync.
 */

export function initTheme() {
  const desktopToggle = document.getElementById('theme-toggle');
  const desktopIcon = desktopToggle?.querySelector('.theme-icon');

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function updateUI(theme) {
    const isDark = theme === 'dark';
    const iconName = isDark ? 'light_mode' : 'dark_mode';
    if (desktopIcon) desktopIcon.textContent = iconName;
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
