import { addTransaction } from '../store.js';
import { getTodayISO } from '../utils/format.js';

const CATEGORIES_INCOME = ['Gaji', 'Penjualan', 'Investasi', 'Bonus', 'Lainnya'];
const CATEGORIES_EXPENSE = ['Sewa', 'Alat Kantor', 'Transport', 'Makan', 'Listrik & Air', 'Internet', 'Lainnya'];

/**
 * Render transaction form modal HTML
 * @returns {string}
 */
export function renderTransactionModal() {
  return `
    <div class="modal-overlay" id="transaction-modal">
      <div class="modal">
        <div class="modal-header">
          <h2>Tambah Transaksi</h2>
          <button class="modal-close" id="modal-close-btn">✕</button>
        </div>

        <form id="transaction-form">
          <div class="type-toggle" id="type-toggle">
            <button type="button" class="type-toggle-btn active-income" data-type="income" id="toggle-income">
              📈 Pemasukan
            </button>
            <button type="button" class="type-toggle-btn" data-type="expense" id="toggle-expense">
              📉 Pengeluaran
            </button>
          </div>

          <div class="form-group">
            <label class="form-label" for="tx-amount">Nominal (Rp) *</label>
            <input
              type="number"
              class="form-input"
              id="tx-amount"
              placeholder="Contoh: 5000000"
              min="1"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="tx-category">Kategori *</label>
            <select class="form-select" id="tx-category" required>
              <option value="">Pilih kategori...</option>
              ${CATEGORIES_INCOME.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="tx-date">Tanggal</label>
            <input type="date" class="form-input" id="tx-date" value="${getTodayISO()}" />
          </div>

          <div class="form-group">
            <label class="form-label" for="tx-description">Keterangan</label>
            <input
              type="text"
              class="form-input"
              id="tx-description"
              placeholder="Keterangan singkat (opsional)"
              maxlength="100"
            />
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" id="modal-cancel-btn">Batal</button>
            <button type="submit" class="btn btn-success" id="modal-save-btn">💾 Simpan</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Bind modal events
 * @param {Function} onSaved - callback after saving
 */
export function bindTransactionModal(onSaved) {
  const overlay = document.getElementById('transaction-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const form = document.getElementById('transaction-form');
  const toggleIncome = document.getElementById('toggle-income');
  const toggleExpense = document.getElementById('toggle-expense');
  const categorySelect = document.getElementById('tx-category');

  let currentType = 'income';

  function closeModal() {
    overlay.classList.remove('active');
  }

  function updateCategories(type) {
    const cats = type === 'income' ? CATEGORIES_INCOME : CATEGORIES_EXPENSE;
    categorySelect.innerHTML = `
      <option value="">Pilih kategori...</option>
      ${cats.map(c => `<option value="${c}">${c}</option>`).join('')}
    `;
  }

  // Type toggle
  toggleIncome.addEventListener('click', () => {
    currentType = 'income';
    toggleIncome.className = 'type-toggle-btn active-income';
    toggleExpense.className = 'type-toggle-btn';
    updateCategories('income');
  });

  toggleExpense.addEventListener('click', () => {
    currentType = 'expense';
    toggleExpense.className = 'type-toggle-btn active-expense';
    toggleIncome.className = 'type-toggle-btn';
    updateCategories('expense');
  });

  // Close handlers
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = document.getElementById('tx-amount').value;
    const category = document.getElementById('tx-category').value;
    const date = document.getElementById('tx-date').value;
    const description = document.getElementById('tx-description').value;

    if (!amount || !category) {
      alert('Nominal dan Kategori wajib diisi!');
      return;
    }

    addTransaction({
      type: currentType,
      amount: Number(amount),
      category,
      date: date || getTodayISO(),
      description
    });

    form.reset();
    document.getElementById('tx-date').value = getTodayISO();
    currentType = 'income';
    toggleIncome.className = 'type-toggle-btn active-income';
    toggleExpense.className = 'type-toggle-btn';
    updateCategories('income');
    closeModal();

    if (onSaved) onSaved();
  });
}

/**
 * Open the transaction modal
 */
export function openTransactionModal() {
  const overlay = document.getElementById('transaction-modal');
  if (overlay) {
    document.getElementById('tx-date').value = getTodayISO();
    overlay.classList.add('active');
    document.getElementById('tx-amount').focus();
  }
}
