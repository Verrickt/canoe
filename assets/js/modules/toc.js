/**
 * Table of Contents (TOC) Module
 * Handles heading tracking with active indicator and smooth scrolling.
 */

export function initTOC() {
  const tocPanel = document.querySelector('.toc-panel');
  if (!tocPanel) return;

  const nav = tocPanel.querySelector('nav');
  if (!nav) return;

  let indicator = nav.querySelector('.indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'indicator';
    nav.prepend(indicator);
  }

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  if (links.length === 0) return;

  // Map links to target heading elements
  const headingMap = [];
  links.forEach((link) => {
    const id = decodeURIComponent(link.getAttribute('href').slice(1));
    const target = document.getElementById(id);
    if (target) {
      headingMap.push({ link, target });
    }
  });

  if (headingMap.length === 0) return;

  function setActive(activeLink) {
    links.forEach((l) => l.classList.remove('active'));
    if (activeLink) {
      activeLink.classList.add('active');
      indicator.classList.add('show');
      indicator.style.top = `${activeLink.offsetTop}px`;

      // Keep active heading visible inside scrollable TOC
      const panelRect = tocPanel.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      if (linkRect.top < panelRect.top || linkRect.bottom > panelRect.bottom) {
        activeLink.scrollIntoView({ block: 'nearest' });
      }
    } else {
      indicator.classList.remove('show');
    }
  }

  // Smooth scroll click handler
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = decodeURIComponent(link.getAttribute('href').slice(1));
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
        history.pushState(null, '', link.getAttribute('href'));
        setActive(link);
      }
    });
  });

  // Scroll listener with throttle for performance
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveHeading();
        ticking = false;
      });
      ticking = true;
    }
  }

  function updateActiveHeading() {
    const scrollPos = window.scrollY + 100;
    let current = null;

    for (let i = 0; i < headingMap.length; i++) {
      const item = headingMap[i];
      if (item.target.offsetTop <= scrollPos) {
        current = item.link;
      } else {
        break;
      }
    }

    if (!current && headingMap.length > 0 && window.scrollY < 200) {
      current = headingMap[0].link;
    }

    setActive(current);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial update
  updateActiveHeading();
}
