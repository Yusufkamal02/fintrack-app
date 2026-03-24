import { formatCurrency } from '../utils/format.js';

/**
 * Render the line chart onto a canvas
 * @param {HTMLCanvasElement} canvas
 * @param {{ labels: string[], income: number[], expense: number[] }} data
 */
export function drawLineChart(canvas, data) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const padding = { top: 24, right: 20, bottom: 44, left: 70 };
  const chartW = W - padding.left - padding.right;
  const chartH = H - padding.top - padding.bottom;

  // Clear
  ctx.clearRect(0, 0, W, H);

  // Find max value
  const allValues = [...data.income, ...data.expense];
  const maxVal = Math.max(...allValues, 1);
  const niceMax = ceilNice(maxVal);

  // Draw grid lines & Y labels
  const gridLines = 5;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.font = '11px Inter, sans-serif';

  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (chartH / gridLines) * i;
    const val = niceMax - (niceMax / gridLines) * i;

    // Grid line
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(W - padding.right, y);
    ctx.stroke();

    // Y label
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(shortCurrency(val), padding.left - 10, y);
  }

  // X labels
  const step = Math.max(1, Math.floor(data.labels.length / 10));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  for (let i = 0; i < data.labels.length; i += step) {
    const x = padding.left + (chartW / (data.labels.length - 1)) * i;
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(data.labels[i], x, H - padding.bottom + 10);
  }

  // Draw lines with animation
  drawAnimatedLine(ctx, data.income, '#22C55E', 'rgba(34, 197, 94, 0.1)', padding, chartW, chartH, niceMax, data.labels.length);
  drawAnimatedLine(ctx, data.expense, '#EF4444', 'rgba(239, 68, 68, 0.1)', padding, chartW, chartH, niceMax, data.labels.length);

  // Draw data points
  drawPoints(ctx, data.income, '#22C55E', padding, chartW, chartH, niceMax, data.labels.length);
  drawPoints(ctx, data.expense, '#EF4444', padding, chartW, chartH, niceMax, data.labels.length);

  // Setup tooltip
  setupTooltip(canvas, data, padding, chartW, chartH, niceMax);
}

function drawAnimatedLine(ctx, values, color, fillColor, padding, chartW, chartH, maxVal, count) {
  if (count < 2) return;

  const points = values.map((v, i) => ({
    x: padding.left + (chartW / (count - 1)) * i,
    y: padding.top + chartH - (v / maxVal) * chartH
  }));

  // Fill area
  ctx.beginPath();
  ctx.moveTo(points[0].x, padding.top + chartH);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();
}

function drawPoints(ctx, values, color, padding, chartW, chartH, maxVal, count) {
  if (count < 2) return;

  values.forEach((v, i) => {
    if (v === 0) return;
    const x = padding.left + (chartW / (count - 1)) * i;
    const y = padding.top + chartH - (v / maxVal) * chartH;

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

function setupTooltip(canvas, data, padding, chartW, chartH, maxVal) {
  const container = canvas.parentElement;
  let tooltip = container.querySelector('.chart-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    container.appendChild(tooltip);
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mouseX < padding.left || mouseX > rect.width - padding.right) {
      tooltip.classList.remove('visible');
      return;
    }

    const count = data.labels.length;
    const stepX = chartW / (count - 1);
    const idx = Math.round((mouseX - padding.left) / stepX);

    if (idx >= 0 && idx < count) {
      const inc = data.income[idx];
      const exp = data.expense[idx];

      tooltip.innerHTML = `
        <div style="font-weight:600; margin-bottom:4px;">Tanggal ${data.labels[idx]}</div>
        <div style="color:#22C55E;">Masuk: ${formatCurrency(inc)}</div>
        <div style="color:#EF4444;">Keluar: ${formatCurrency(exp)}</div>
      `;

      const tipX = padding.left + stepX * idx;
      tooltip.style.left = tipX + 'px';
      tooltip.style.top = (mouseY - 70) + 'px';
      tooltip.classList.add('visible');
    }
  });

  canvas.addEventListener('mouseleave', () => {
    tooltip.classList.remove('visible');
  });
}

function ceilNice(value) {
  if (value === 0) return 100000;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  return Math.ceil(value / magnitude) * magnitude;
}

function shortCurrency(value) {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'M';
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'Jt';
  if (value >= 1000) return (value / 1000).toFixed(0) + 'Rb';
  return value.toString();
}

/**
 * Render chart section HTML (canvas + legend)
 * @returns {string}
 */
export function renderChartSection() {
  return `
    <div class="chart-section card">
      <div class="chart-header">
        <h3 class="section-title">📈 Tren Bulan Ini</h3>
        <div class="chart-legend">
          <div class="chart-legend-item">
            <div class="chart-legend-dot" style="background: #22C55E;"></div>
            <span>Pemasukan</span>
          </div>
          <div class="chart-legend-item">
            <div class="chart-legend-dot" style="background: #EF4444;"></div>
            <span>Pengeluaran</span>
          </div>
        </div>
      </div>
      <div class="chart-container" id="chart-container">
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  `;
}
