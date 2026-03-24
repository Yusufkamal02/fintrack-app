import { formatCurrency, formatDate } from '../utils/format.js';
import { deleteTransaction } from '../store.js';

/**
 * Render the transaction table
 * @param {Array} transactions
 * @param {Function} onDelete - callback after deletion
 * @returns {string}
 */
export function renderTransactionTable(transactions, onDelete) {
  if (!transactions.length) {
    return `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <p>Belum ada transaksi. Mulai tambahkan data!</p>
      </div>
    `;
  }

  // Sort by date descending, then by createdAt descending
  const sorted = [...transactions].sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff !== 0) return dateDiff;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return `
    <div class="table-container">
      <table class="data-table" id="transaction-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Kategori</th>
            <th>Keterangan</th>
            <th>Tipe</th>
            <th>Nominal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map(t => `
            <tr>
              <td>${formatDate(t.date)}</td>
              <td>${t.category}</td>
              <td>${t.description || '-'}</td>
              <td>
                <span class="badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">
                  ${t.type === 'income' ? 'Masuk' : 'Keluar'}
                </span>
              </td>
              <td class="${t.type === 'income' ? 'amount-income' : 'amount-expense'}">
                ${t.type === 'income' ? '+' : '-'} ${formatCurrency(t.amount)}
              </td>
              <td>
                <button class="btn btn-danger btn-delete-tx" data-id="${t.id}" title="Hapus">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Bind delete events on the transaction table
 * @param {Function} onRefresh - callback to refresh after deletion
 */
export function bindTableDeleteEvents(onRefresh) {
  document.querySelectorAll('.btn-delete-tx').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Hapus transaksi ini?')) {
        deleteTransaction(btn.dataset.id);
        if (onRefresh) onRefresh();
      }
    });
  });
}
