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
      .map((w) => escapeRegExp(escapeHtml(w)));
    if (words.length === 0) return escaped;

    const pattern = new RegExp(`(${words.join('|')})`, 'gi');
    return escaped.replace(pattern, '<mark class="search-highlight">$1</mark>');
  }

  function extractSnippet(item, matches, query) {
    const content = (item.content || '').replace(/\s+/g, ' ').trim();
    if (!content) return '';

    const queryWords = (query || '')
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);

    // 1. Exact keyword search in content (similar to hugo-theme-stack)
    let matchRanges = [];
    if (queryWords.length > 0) {
      const pattern = new RegExp(queryWords.map(escapeRegExp).join('|'), 'gi');
      let m;
      while ((m = pattern.exec(content)) !== null) {
        matchRanges.push({ start: m.index, end: m.index + m[0].length });
      }
    }

    // 2. Fallback to Fuse fuzzy content matches if no exact match in content
    if (matchRanges.length === 0 && matches) {
      const contentMatch = matches.find((m) => m.key === 'content');
      if (contentMatch && contentMatch.indices && contentMatch.indices.length > 0) {
        // Sort by match length descending to pick substantial word matches over 1-char noise
        const sorted = [...contentMatch.indices].sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));
        const best = sorted[0];
        matchRanges.push({ start: best[0], end: best[1] + 1 });
      }
    }

    // 3. Fallback: if keyword matched tags or categories but not in content, show tag context
    if (matchRanges.length === 0 && queryWords.length > 0) {
      const hasTagMatch = (item.tags || []).some((t) =>
        queryWords.some((w) => t.toLowerCase().includes(w.toLowerCase()))
      );
      const hasCatMatch = (item.categories || []).some((c) =>
        queryWords.some((w) => c.toLowerCase().includes(w.toLowerCase()))
      );

      let prefix = '';
      if (hasTagMatch && item.tags?.length) {
        prefix = `[标签: ${item.tags.join(', ')}] `;
      } else if (hasCatMatch && item.categories?.length) {
        prefix = `[分类: ${item.categories.join(', ')}] `;
      }

      if (prefix) {
        const remainingLen = 160 - prefix.length;
        return prefix + content.slice(0, remainingLen) + (content.length > remainingLen ? '...' : '');
      }
    }

    // 4. Construct snippet around match ranges with generous radius (Stack-inspired)
    if (matchRanges.length > 0) {
      const offset = 80; // Extended radius before and after matched keyword
      const charLimit = 180;

      const first = matchRanges[0];
      let start = Math.max(0, first.start - offset);
      let end = Math.min(content.length, first.end + offset);

      // Merge adjacent or nearby matches within the snippet budget
      for (let i = 1; i < matchRanges.length; i++) {
        const next = matchRanges[i];
        if (next.start <= end + 30 && (next.end + offset - start) <= charLimit + 40) {
          end = Math.min(content.length, next.end + offset);
        } else {
          break;
        }
      }

      // Adjust boundaries to clean word boundaries without truncating the matched keyword
      if (start > 0) {
        const spaceIdx = content.indexOf(' ', start);
        if (spaceIdx !== -1 && spaceIdx - start < 15 && spaceIdx < first.start) {
          start = spaceIdx + 1;
        }
      }
      if (end < content.length) {
        const spaceIdx = content.lastIndexOf(' ', end);
        if (spaceIdx !== -1 && end - spaceIdx < 15 && spaceIdx > first.end) {
          end = spaceIdx;
        }
      }

      let snippet = content.slice(start, end).trim();
      if (start > 0) snippet = '...' + snippet;
      if (end < content.length) snippet = snippet + '...';
      return snippet;
    }

    // 5. Default preview of start of content
    return content.slice(0, 150) + (content.length > 150 ? '...' : '');
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
