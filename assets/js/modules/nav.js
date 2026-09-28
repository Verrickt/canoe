/**
 * Navigation Module
 * Handles mobile sidebar drawer, desktop taxonomy panel, and navbar tabs indicator.
 */

export function initNav() {
  initMobileSidebar();
  initTaxonomyPanel();
  initTabsIndicator();
}

/**
 * Mobile Sidebar Drawer
 */
function initMobileSidebar() {
  const toggleBtn = document.querySelector('[data-activates="sidebar"], .button-collapse');
  const sidebar = document.getElementById('sidebar');

  if (!toggleBtn || !sidebar) return;

  function openSidebar() {
    document.body.classList.add('mobile-sidebar-active');
    let overlay = document.getElementById('sidenav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'sidenav-overlay';
      overlay.addEventListener('click', closeSidebar);
      document.body.appendChild(overlay);
    }
  }

  function closeSidebar() {
    document.body.classList.remove('mobile-sidebar-active');
    const overlay = document.getElementById('sidenav-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (document.body.classList.contains('mobile-sidebar-active')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Close when clicking links in sidebar or pressing Escape
  sidebar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeSidebar);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('mobile-sidebar-active')) {
      closeSidebar();
    }
  });
}

/**
 * Desktop Taxonomy Dropdown Panel
 */
function initTaxonomyPanel() {
  const termBtn = document.querySelector('.term-btn');
  const taxonomyPanel = document.querySelector('.taxonomy');

  if (!termBtn || !taxonomyPanel) return;

  function toggleTaxonomy(e) {
    e.preventDefault();
    taxonomyPanel.classList.toggle('active');
  }

  function closeTaxonomy() {
    taxonomyPanel.classList.remove('active');
  }

  termBtn.addEventListener('click', toggleTaxonomy);

  // Close when clicking outside panel or pressing Escape
  document.addEventListener('click', (e) => {
    if (
      taxonomyPanel.classList.contains('active') &&
      !taxonomyPanel.contains(e.target) &&
      !termBtn.contains(e.target)
    ) {
      closeTaxonomy();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && taxonomyPanel.classList.contains('active')) {
      closeTaxonomy();
    }
  });
}

/**
 * Navbar Tabs Active Indicator
 */
function initTabsIndicator() {
  const tabsContainer = document.querySelector('.navbar ul.tabs');
  if (!tabsContainer) return;

  let indicator = tabsContainer.querySelector('.indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'indicator';
    tabsContainer.appendChild(indicator);
  }

  const tabs = tabsContainer.querySelectorAll('.tab');
  const activeTab = tabsContainer.querySelector('.tab a.active')?.parentElement;

  function updateIndicator(targetTab) {
    if (!targetTab) {
      indicator.style.display = 'none';
      return;
    }
    indicator.style.display = 'block';
    const left = targetTab.offsetLeft;
    const width = targetTab.offsetWidth;
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
  }

  // Initial position
  updateIndicator(activeTab);

  // Update on window resize
  window.addEventListener('resize', () => {
    const currentActive = tabsContainer.querySelector('.tab a.active')?.parentElement;
    updateIndicator(currentActive);
  });

  // Hover transitions
  tabs.forEach((tab) => {
    tab.addEventListener('mouseenter', () => updateIndicator(tab));
  });

  tabsContainer.addEventListener('mouseleave', () => {
    const currentActive = tabsContainer.querySelector('.tab a.active')?.parentElement;
    updateIndicator(currentActive);
  });
}
