import { getCurrentRoute, navigate } from '../router.js';
import { logout } from '../store.js';

/**
 * Render sidebar (desktop) + hamburger toggle & overlay (mobile)
 * @returns {string} HTML string
 */
export function renderSidebar() {
  const current = getCurrentRoute();

  return `
    <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">💰</div>
        <h1>FinTrack</h1>
      </div>
      <nav class="sidebar-nav">
        <button class="nav-item ${current === '/dashboard' ? 'active' : ''}" data-route="/dashboard" id="nav-dashboard">
          <span class="nav-icon">🏠</span>
          <span>Dashboard</span>
        </button>
        <button class="nav-item ${current === '/history' ? 'active' : ''}" data-route="/history" id="nav-history">
          <span class="nav-icon">📋</span>
          <span>Riwayat</span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <button class="btn-add-transaction" id="btn-add-sidebar">
          <span>＋</span>
          <span>Tambah Transaksi</span>
        </button>
        <button class="nav-item" id="btn-logout" style="margin-top: var(--space-sm);">
          <span class="nav-icon">🚪</span>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  `;
}

/**
 * Toggle mobile sidebar open/close
 */
function toggleSidebar(forceClose = false) {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const toggle = document.getElementById('sidebar-toggle');
  if (!sidebar || !overlay) return;

  const isOpen = sidebar.classList.contains('sidebar-open');
  if (forceClose || isOpen) {
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('active');
    if (toggle) toggle.textContent = '☰';
  } else {
    sidebar.classList.add('sidebar-open');
    overlay.classList.add('active');
    if (toggle) toggle.textContent = '✕';
  }
}

/**
 * Bind sidebar click events
 */
export function bindSidebarEvents(onAddTransaction) {
  // Sidebar toggle (mobile)
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => toggleSidebar());
  }

  // Overlay click closes sidebar
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => toggleSidebar(true));
  }

  // Navigation clicks — also close sidebar on mobile
  document.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleSidebar(true);
      navigate(btn.dataset.route);
    });
  });

  // Add transaction buttons
  const addBtns = [document.getElementById('btn-add-sidebar'), document.getElementById('btn-add-bottom')];
  addBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        toggleSidebar(true);
        if (onAddTransaction) onAddTransaction();
      });
    }
  });

  // Logout
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      toggleSidebar(true);
      logout();
      navigate('/login');
    });
  }
}
