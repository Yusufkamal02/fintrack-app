/**
 * Render filter bar with period pills
 * @param {string} activeFilter - current active filter
 * @returns {string}
 */
export function renderFilterBar(activeFilter = 'month') {
  const filters = [
    { value: 'today', label: 'Hari Ini' },
    { value: 'week', label: 'Minggu Ini' },
    { value: 'month', label: 'Bulan Ini' },
    { value: 'all', label: 'Semua' },
  ];

  return `
    <div class="filter-bar" id="filter-bar">
      ${filters.map(f => `
        <button class="filter-pill ${f.value === activeFilter ? 'active' : ''}" data-filter="${f.value}">
          ${f.label}
        </button>
      `).join('')}
    </div>
  `;
}

/**
 * Bind filter click events
 * @param {Function} onFilterChange - callback with new filter value
 */
export function bindFilterEvents(onFilterChange) {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (onFilterChange) onFilterChange(pill.dataset.filter);
    });
  });
}
