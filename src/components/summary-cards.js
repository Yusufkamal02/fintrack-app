import { formatCurrency } from '../utils/format.js';

/**
 * Render summary cards
 * @param {{ balance: number, income: number, expense: number }} summary
 * @returns {string} HTML string
 */
export function renderSummaryCards(summary) {
  return `
    <div class="summary-cards">
      <div class="card summary-card saldo">
        <div class="card-icon">💎</div>
        <div class="card-label">Total Saldo</div>
        <div class="card-value">${formatCurrency(summary.balance)}</div>
      </div>
      <div class="card summary-card income">
        <div class="card-icon">📈</div>
        <div class="card-label">Pemasukan Bulan Ini</div>
        <div class="card-value">${formatCurrency(summary.income)}</div>
      </div>
      <div class="card summary-card expense">
        <div class="card-icon">📉</div>
        <div class="card-label">Pengeluaran Bulan Ini</div>
        <div class="card-value">${formatCurrency(summary.expense)}</div>
      </div>
    </div>
  `;
}
