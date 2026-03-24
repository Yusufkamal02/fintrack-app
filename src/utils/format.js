/**
 * Format number as Indonesian Rupiah
 * @param {number} amount
 * @returns {string} e.g. "Rp 12.500.000"
 */
export function formatCurrency(amount) {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

/**
 * Format date string to readable Indonesian format
 * @param {string} dateString - ISO date string
 * @returns {string} e.g. "16 Mar 2026"
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Format date string to a short day label
 * @param {string} dateString
 * @returns {string} e.g. "16 Mar"
 */
export function formatDateShort(dateString) {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

/**
 * Get greeting based on current time
 * @returns {string}
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
}

/**
 * Get today's date as YYYY-MM-DD
 * @returns {string}
 */
export function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Generate a simple unique ID
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}