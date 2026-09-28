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
        includeMatches: true,
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

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightText(text, query) {
    if (!text) return '';
    const escaped = escapeHtml(text);
    if (!query) return escaped;

    const words = query
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .map(escapeRegExp);
    if (words.length === 0) return escaped;

    const pattern = new RegExp(`(${words.join('|')})`, 'gi');
    return escaped.replace(pattern, '<mark class="search-highlight">$1</mark>');
  }

  function extractSnippet(item, matches, query) {
    const content = (item.content || '').replace(/\s+/g, ' ').trim();
    if (!content) return '';

    // 1. Match from Fuse.js content matches
    const contentMatch = matches?.find((m) => m.key === 'content');
    if (contentMatch && contentMatch.indices && contentMatch.indices.length > 0) {
      const [startIdx, endIdx] = contentMatch.indices[0];
      const snippetRadius = 45;
      const start = Math.max(0, startIdx - snippetRadius);
      const end = Math.min(content.length, endIdx + snippetRadius + 1);

      let snippet = content.slice(start, end).trim();
      if (start > 0) snippet = '...' + snippet;
      if (end < content.length) snippet = snippet + '...';
      return snippet;
    }

    // 2. Fallback: match query terms in content directly
    if (query) {
      const lowerContent = content.toLowerCase();
      const words = query.toLowerCase().trim().split(/\s+/);
      for (const w of words) {
        const idx = lowerContent.indexOf(w);
        if (idx !== -1) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(content.length, idx + w.length + 50);
          let snippet = content.slice(start, end).trim();
          if (start > 0) snippet = '...' + snippet;
          if (end < content.length) snippet = snippet + '...';
          return snippet;
        }
      }
    }

    // 3. Fallback: preview start of content
    return content.slice(0, 90) + (content.length > 90 ? '...' : '');
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
      a.className = 'search-result-item';
      a.href = item.uri;

      const titleEl = document.createElement('div');
      titleEl.className = 'search-result-title';
      titleEl.innerHTML = highlightText(item.title, query);

      const snippetText = extractSnippet(item, res.matches, query);
      const snippetEl = document.createElement('div');
      snippetEl.className = 'search-result-snippet';
      snippetEl.innerHTML = highlightText(snippetText, query);

      a.appendChild(titleEl);
      if (snippetText) {
        a.appendChild(snippetEl);
      }
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
