import { getCurrentRoute, navigate } from '../router.js';
import { logout } from '../store.js';

/**
 * Render sidebar (desktop) and bottom nav (mobile)
 * @returns {string} HTML string
 */
export function renderSidebar() {
  const current = getCurrentRoute();

  return `
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
 * Bind sidebar click events
 */
export function bindSidebarEvents(onAddTransaction) {
  // Navigation clicks
  document.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigate(btn.dataset.route);
    });
  });

  // Add transaction buttons
  const addBtns = [document.getElementById('btn-add-sidebar'), document.getElementById('btn-add-bottom')];
  addBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', onAddTransaction);
  });

  // Logout
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      navigate('/login');
    });
  }
}
