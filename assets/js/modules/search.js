/**
 * Search Module (Desktop & Mobile)
 * Powered by vendored Fuse.js with lazy index loading and fuzzy matching.
 */

import Fuse from '../vendor/fuse.basic.mjs';

export function initSearch() {
  const desktopForm = document.querySelector('.navbar form.nav-form');
  const desktopInput = desktopForm?.querySelector('input');
  const desktopResult = desktopForm?.querySelector('.search-result');
  const navbar = document.querySelector('.navbar');

  const mobileSearchBtn = document.querySelector('.search-btn');
  const mobileSearchPanel = document.querySelector('.mobile-search');
  const mobileInput = mobileSearchPanel?.querySelector('.header input');
  const mobileCloseBtn = mobileSearchPanel?.querySelector('.mobile-search-close');
  const mobileResult = mobileSearchPanel?.querySelector('.content');

  let fuseInstance = null;
  let isLoadingIndex = false;

  // Determine base URL for index.json
  const scriptTag = document.querySelector('script[data-baseurl]');
  const baseUrl = scriptTag?.getAttribute('data-baseurl') || '/';
  const indexUrl = baseUrl.endsWith('/') ? `${baseUrl}index.json` : `${baseUrl}/index.json`;

  async function loadIndex() {
    if (fuseInstance || isLoadingIndex) return;
    isLoadingIndex = true;
    try {
      const res = await fetch(indexUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      fuseInstance = new Fuse(data, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'tags', weight: 0.25 },
          { name: 'categories', weight: 0.15 },
          { name: 'content', weight: 0.1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 1,
      });
    } catch (err) {
      console.warn('[Canoe Search] Failed to load search index:', err);
    } finally {
      isLoadingIndex = false;
    }
  }

  function renderResults(results, container, query) {
    const label = container.querySelector('label');
    const ul = container.querySelector('ul');
    if (!label || !ul) return;

    ul.innerHTML = '';

    if (!query) {
      label.textContent = '输入搜索关键字';
      return;
    }

    if (results.length === 0) {
      label.textContent = '暂无搜索结果';
      return;
    }

    label.textContent = `找到 ${results.length} 条相关结果`;

    results.slice(0, 15).forEach((res) => {
      const item = res.item;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.uri;
      a.textContent = item.title;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  function handleSearch(query, resultContainer) {
    if (!query || !query.trim()) {
      renderResults([], resultContainer, '');
      return;
    }
    if (!fuseInstance) {
      loadIndex().then(() => {
        if (fuseInstance) {
          const results = fuseInstance.search(query.trim());
          renderResults(results, resultContainer, query);
        }
      });
      return;
    }
    const results = fuseInstance.search(query.trim());
    renderResults(results, resultContainer, query);
  }

  // Desktop Search Handlers
  if (desktopForm && desktopInput && desktopResult) {
    desktopInput.addEventListener('focus', () => {
      loadIndex();
      navbar?.classList.add('search-active');
      if (desktopInput.value) {
        handleSearch(desktopInput.value, desktopResult);
      }
    });

    desktopInput.addEventListener('input', (e) => {
      handleSearch(e.target.value, desktopResult);
    });

    // Close on outside click or ESC
    document.addEventListener('click', (e) => {
      if (navbar?.classList.contains('search-active') && !desktopForm.contains(e.target)) {
        navbar.classList.remove('search-active');
      }
    });

    desktopInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navbar?.classList.remove('search-active');
        desktopInput.blur();
      }
    });
  }

  // Mobile Search Handlers
  if (mobileSearchBtn && mobileSearchPanel && mobileInput && mobileResult) {
    function openMobileSearch(e) {
      if (e) e.preventDefault();
      loadIndex();
      document.body.classList.add('mobile-search-active');
      setTimeout(() => mobileInput.focus(), 100);
      if (mobileInput.value) {
        handleSearch(mobileInput.value, mobileResult);
      }
    }

    function closeMobileSearch() {
      document.body.classList.remove('mobile-search-active');
      mobileInput.value = '';
      renderResults([], mobileResult, '');
    }

    mobileSearchBtn.addEventListener('click', openMobileSearch);
    mobileCloseBtn?.addEventListener('click', closeMobileSearch);

    mobileInput.addEventListener('input', (e) => {
      handleSearch(e.target.value, mobileResult);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('mobile-search-active')) {
        closeMobileSearch();
      }
    });
  }
}
