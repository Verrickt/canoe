/**
 * Canoe Theme Main Entrypoint
 */

import { initNav } from './modules/nav.js';
import { initTOC } from './modules/toc.js';
import { initSplash } from './modules/splash.js';
import { initSearch } from './modules/search.js';
import { initTheme } from './modules/theme.js';

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('enter');
    }, Math.min(index * 35, 300));
  });
}

function bootstrap() {
  initTheme();
  initNav();
  initTOC();
  initSplash();
  initSearch();
  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
