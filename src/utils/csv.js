/**
 * Export transactions to CSV and trigger download
 * @param {Array} transactions
 */
export function exportToCSV(transactions) {
  if (!transactions.length) {
    alert('Tidak ada data untuk di-export.');
    return;
  }

  const headers = ['Tanggal', 'Tipe', 'Kategori', 'Keterangan', 'Nominal'];
  const rows = transactions.map(t => [
    t.date,
    t.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
    t.category,
    `"${(t.description || '').replace(/"/g, '""')}"`,
    t.amount
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  // Add BOM for Excel compatibility with Indonesian characters
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  const now = new Date();
  const filename = `laporan_keuangan_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}.csv`;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
