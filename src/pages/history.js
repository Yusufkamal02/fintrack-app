import { getSummary } from '../store.js';
import { renderSidebar, bindSidebarEvents } from '../components/sidebar.js';
import { renderFilterBar, bindFilterEvents } from '../components/filter-bar.js';
import { renderTransactionTable, bindTableDeleteEvents } from '../components/transaction-table.js';
import { renderExportButton, bindExportButton } from '../components/export-button.js';
import { renderTransactionModal, bindTransactionModal, openTransactionModal } from '../components/transaction-form.js';

let currentFilter = 'month';

/**
 * Render the history page
 * @param {HTMLElement} container - #app element
 */
export function renderHistoryPage(container) {
  const summary = getSummary(currentFilter);

  container.innerHTML = `
    ${renderSidebar()}
    <main class="main-content page-enter" id="main-content">
      <div class="section-header">
        <h3 class="section-title">📋 Riwayat Transaksi</h3>
        ${renderExportButton()}
      </div>

      ${renderFilterBar(currentFilter)}

      ${renderTransactionTable(summary.transactions)}
    </main>
    ${renderTransactionModal()}
  `;

  // Bind events
  bindSidebarEvents(openTransactionModal);
  bindFilterEvents(onFilterChange);
  bindTableDeleteEvents(refresh);
  bindTransactionModal(refresh);
  bindExportButton(() => getSummary(currentFilter).transactions);

  function onFilterChange(filter) {
    currentFilter = filter;
    refresh();
  }

  function refresh() {
    renderHistoryPage(container);
  }
}
