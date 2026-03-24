import { registerRoute, initRouter } from './router.js';
import { renderLoginPage } from './pages/login.js';
import { renderDashboardPage } from './pages/dashboard.js';
import { renderHistoryPage } from './pages/history.js';

// Register routes
registerRoute('/login', renderLoginPage);
registerRoute('/dashboard', renderDashboardPage);
registerRoute('/history', renderHistoryPage);

// Start app
initRouter();

// Handle window resize for chart re-draw
let resizeTimer;
let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const newWidth = window.innerWidth;
    // Only re-render if width actually changed (not keyboard open/close)
    if (newWidth === lastWidth) return;
    lastWidth = newWidth;

    // Don't re-render if transaction modal is open
    const modal = document.getElementById('transaction-modal');
    if (modal && modal.classList.contains('active')) return;

    const canvas = document.getElementById('line-chart');
    if (canvas) {
      const event = new HashChangeEvent('hashchange');
      window.dispatchEvent(event);
    }
  }, 300);
});
