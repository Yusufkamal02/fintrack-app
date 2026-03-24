import { exportToCSV } from '../utils/csv.js';

/**
 * Render export button
 * @returns {string}
 */
export function renderExportButton() {
  return `<button class="btn btn-secondary" id="btn-export-csv">📥 Export CSV</button>`;
}

/**
 * Bind export button click
 * @param {Function} getTransactions - function returning transactions to export
 */
export function bindExportButton(getTransactions) {
  const btn = document.getElementById('btn-export-csv');
  if (btn) {
    btn.addEventListener('click', () => {
      const transactions = getTransactions();
      exportToCSV(transactions);
    });
  }
}
