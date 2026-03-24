import { getSummary, getChartData } from '../store.js';
import { getGreeting } from '../utils/format.js';
import { renderSidebar, bindSidebarEvents } from '../components/sidebar.js';
import { renderSummaryCards } from '../components/summary-cards.js';
import { renderChartSection, drawLineChart } from '../components/line-chart.js';
import { renderTransactionTable, bindTableDeleteEvents } from '../components/transaction-table.js';
import { renderTransactionModal, bindTransactionModal, openTransactionModal } from '../components/transaction-form.js';

/**
 * Render the dashboard page
 * @param {HTMLElement} container - #app element
 */
export function renderDashboardPage(container) {
  const summary = getSummary('month');
  const recentTx = summary.transactions.slice(0, 5);

  container.innerHTML = `
    ${renderSidebar()}
    <main class="main-content page-enter" id="main-content">
      <div class="greeting">${getGreeting()}, Admin 👋</div>
      <div class="greeting-sub">Berikut ringkasan keuangan bulan ini.</div>

      ${renderSummaryCards(summary)}

      ${renderChartSection()}

      <div class="section-header">
        <h3 class="section-title">Transaksi Terakhir</h3>
      </div>
      ${renderTransactionTable(recentTx)}
    </main>
    ${renderTransactionModal()}
  `;

  // Bind events
  bindSidebarEvents(openTransactionModal);
  bindTableDeleteEvents(refresh);
  bindTransactionModal(refresh);

  // Draw chart
  requestAnimationFrame(() => {
    const canvas = document.getElementById('line-chart');
    if (canvas) {
      const chartData = getChartData();
      drawLineChart(canvas, chartData);
    }
  });

  function refresh() {
    renderDashboardPage(container);
  }
}
