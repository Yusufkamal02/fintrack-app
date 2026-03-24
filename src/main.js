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
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const canvas = document.getElementById('line-chart');
    if (canvas) {
      // Re-trigger current route to redraw chart
      const event = new HashChangeEvent('hashchange');
      window.dispatchEvent(event);
    }
  }, 300);
});
