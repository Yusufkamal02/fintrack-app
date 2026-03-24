import { generateId } from './utils/format.js';

const STORAGE_KEY = 'fintrack_transactions';
const AUTH_KEY = 'fintrack_auth';

/**
 * Get all transactions from localStorage
 * @returns {Array}
 */
export function getTransactions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Save transactions to localStorage
 * @param {Array} transactions
 */
function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

/**
 * Add a new transaction
 * @param {{ type: string, amount: number, category: string, date: string, description: string }} tx
 * @returns {object} the created transaction
 */
export function addTransaction(tx) {
  const transactions = getTransactions();
  const newTx = {
    id: generateId(),
    type: tx.type,
    amount: Number(tx.amount),
    category: tx.category,
    date: tx.date,
    description: tx.description || '',
    createdAt: new Date().toISOString()
  };
  transactions.unshift(newTx);
  saveTransactions(transactions);
  return newTx;
}

/**
 * Delete a transaction by ID
 * @param {string} id
 */
export function deleteTransaction(id) {
  const transactions = getTransactions().filter(t => t.id !== id);
  saveTransactions(transactions);
}

/**
 * Get financial summary for a given period
 * @param {'today'|'week'|'month'|'all'} period
 * @returns {{ income: number, expense: number, balance: number, transactions: Array }}
 */
export function getSummary(period = 'month') {
  const transactions = getTransactions();
  const now = new Date();
  let filtered;

  switch (period) {
    case 'today': {
      const todayStr = now.toISOString().split('T')[0];
      filtered = transactions.filter(t => t.date === todayStr);
      break;
    }
    case 'week': {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = transactions.filter(t => new Date(t.date) >= weekAgo);
      break;
    }
    case 'month': {
      filtered = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
      break;
    }
    default:
      filtered = transactions;
  }

  const income = filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
    transactions: filtered
  };
}

/**
 * Get daily aggregated data for chart
 * @returns {{ labels: string[], income: number[], expense: number[] }}
 */
export function getChartData() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const transactions = getTransactions();

  const incomeByDay = {};
  const expenseByDay = {};

  transactions.forEach(t => {
    const d = new Date(t.date);
    if (d.getMonth() === month && d.getFullYear() === year) {
      const day = d.getDate();
      if (t.type === 'income') {
        incomeByDay[day] = (incomeByDay[day] || 0) + t.amount;
      } else {
        expenseByDay[day] = (expenseByDay[day] || 0) + t.amount;
      }
    }
  });

  const labels = [];
  const income = [];
  const expense = [];

  for (let i = 1; i <= daysInMonth; i++) {
    labels.push(i.toString());
    income.push(incomeByDay[i] || 0);
    expense.push(expenseByDay[i] || 0);
  }

  return { labels, income, expense };
}

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

/**
 * Login (MVP: hardcoded credentials)
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 */
export function login(username, password) {
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

/**
 * Logout
 */
export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
