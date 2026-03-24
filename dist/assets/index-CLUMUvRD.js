(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function h(e){return"Rp "+new Intl.NumberFormat("id-ID").format(e)}function J(e){const t=new Date(e),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];return`${t.getDate()} ${n[t.getMonth()]} ${t.getFullYear()}`}function U(){const e=new Date().getHours();return e<11?"Selamat pagi":e<15?"Selamat siang":e<18?"Selamat sore":"Selamat malam"}function E(){return new Date().toISOString().split("T")[0]}function G(){return Date.now().toString(36)+Math.random().toString(36).substr(2,5)}const D="fintrack_transactions",k="fintrack_auth";function w(){const e=localStorage.getItem(D);return e?JSON.parse(e):[]}function P(e){localStorage.setItem(D,JSON.stringify(e))}function V(e){const t=w(),n={id:G(),type:e.type,amount:Number(e.amount),category:e.category,date:e.date,description:e.description||"",createdAt:new Date().toISOString()};return t.unshift(n),P(t),n}function W(e){const t=w().filter(n=>n.id!==e);P(t)}function T(e="month"){const t=w(),n=new Date;let a;switch(e){case"today":{const s=n.toISOString().split("T")[0];a=t.filter(o=>o.date===s);break}case"week":{const s=new Date(n);s.setDate(s.getDate()-7),a=t.filter(o=>new Date(o.date)>=s);break}case"month":{a=t.filter(s=>{const o=new Date(s.date);return o.getMonth()===n.getMonth()&&o.getFullYear()===n.getFullYear()});break}default:a=t}const i=a.filter(s=>s.type==="income").reduce((s,o)=>s+o.amount,0),r=a.filter(s=>s.type==="expense").reduce((s,o)=>s+o.amount,0);return{income:i,expense:r,balance:i-r,transactions:a}}function X(){const e=new Date,t=e.getFullYear(),n=e.getMonth(),a=new Date(t,n+1,0).getDate(),i=w(),r={},s={};i.forEach(l=>{const m=new Date(l.date);if(m.getMonth()===n&&m.getFullYear()===t){const u=m.getDate();l.type==="income"?r[u]=(r[u]||0)+l.amount:s[u]=(s[u]||0)+l.amount}});const o=[],d=[],c=[];for(let l=1;l<=a;l++)o.push(l.toString()),d.push(r[l]||0),c.push(s[l]||0);return{labels:o,income:d,expense:c}}function S(){return localStorage.getItem(k)==="true"}function z(e,t){return e==="admin"&&t==="admin"?(localStorage.setItem(k,"true"),!0):!1}function Q(){localStorage.removeItem(k)}const C={};let F=null;function I(e,t){C[e]=t}function b(e){window.location.hash=e}function Z(){return document.getElementById("app")}function B(){const e=window.location.hash.slice(1)||"/login";if(e!=="/login"&&!S()){b("/login");return}if(e==="/login"&&S()){b("/dashboard");return}const t=C[e];if(t){const n=Z();n&&(F=e,t(n))}else b("/dashboard")}function ee(){window.addEventListener("hashchange",B),B()}function te(){return F||window.location.hash.slice(1)||"/login"}function ne(e){e.innerHTML=`
    <div class="login-page">
      <div class="login-container">
        <div class="login-card">
          <div class="login-logo">
            <div class="logo-icon">💰</div>
            <h1>FinTrack</h1>
            <p>Dashboard Keuangan Perusahaan</p>
          </div>

          <div class="login-error" id="login-error">
            Username atau password salah!
          </div>

          <form id="login-form">
            <div class="form-group">
              <label class="form-label" for="login-username">Username</label>
              <input
                type="text"
                class="form-input"
                id="login-username"
                placeholder="Masukkan username"
                autocomplete="username"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="login-password">Password</label>
              <input
                type="password"
                class="form-input"
                id="login-password"
                placeholder="Masukkan password"
                autocomplete="current-password"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; padding: var(--space-md);">
              🔐 Masuk
            </button>
          </form>

          <p style="text-align:center; margin-top: var(--space-lg); color: var(--text-tertiary); font-size: var(--font-size-xs);">
            Demo: username <strong>admin</strong> / password <strong>admin</strong>
          </p>
        </div>
      </div>
    </div>
  `;const t=document.getElementById("login-form"),n=document.getElementById("login-error");t.addEventListener("submit",a=>{a.preventDefault();const i=document.getElementById("login-username").value.trim(),r=document.getElementById("login-password").value;z(i,r)?b("/dashboard"):(n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),3e3))})}function A(){const e=te();return`
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">💰</div>
        <h1>FinTrack</h1>
      </div>
      <nav class="sidebar-nav">
        <button class="nav-item ${e==="/dashboard"?"active":""}" data-route="/dashboard" id="nav-dashboard">
          <span class="nav-icon">🏠</span>
          <span>Dashboard</span>
        </button>
        <button class="nav-item ${e==="/history"?"active":""}" data-route="/history" id="nav-history">
          <span class="nav-icon">📋</span>
          <span>Riwayat</span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <button class="btn-add-transaction" id="btn-add-sidebar">
          <span>＋</span>
          <span>Tambah Transaksi</span>
        </button>
        <button class="nav-item" id="btn-logout" style="margin-top: var(--space-sm);">
          <span class="nav-icon">🚪</span>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  `}function N(e){document.querySelectorAll("[data-route]").forEach(a=>{a.addEventListener("click",()=>{b(a.dataset.route)})}),[document.getElementById("btn-add-sidebar"),document.getElementById("btn-add-bottom")].forEach(a=>{a&&a.addEventListener("click",e)});const n=document.getElementById("btn-logout");n&&n.addEventListener("click",()=>{Q(),b("/login")})}function ae(e){return`
    <div class="summary-cards">
      <div class="card summary-card saldo">
        <div class="card-icon">💎</div>
        <div class="card-label">Total Saldo</div>
        <div class="card-value">${h(e.balance)}</div>
      </div>
      <div class="card summary-card income">
        <div class="card-icon">📈</div>
        <div class="card-label">Pemasukan Bulan Ini</div>
        <div class="card-value">${h(e.income)}</div>
      </div>
      <div class="card summary-card expense">
        <div class="card-icon">📉</div>
        <div class="card-label">Pengeluaran Bulan Ini</div>
        <div class="card-value">${h(e.expense)}</div>
      </div>
    </div>
  `}function oe(e,t){const n=e.getContext("2d"),a=window.devicePixelRatio||1,i=e.parentElement.getBoundingClientRect();e.width=i.width*a,e.height=i.height*a,e.style.width=i.width+"px",e.style.height=i.height+"px",n.scale(a,a);const r=i.width,s=i.height,o={top:24,right:20,bottom:44,left:70},d=r-o.left-o.right,c=s-o.top-o.bottom;n.clearRect(0,0,r,s);const l=[...t.income,...t.expense],m=Math.max(...l,1),u=se(m),p=5;n.textAlign="right",n.textBaseline="middle",n.font="11px Inter, sans-serif";for(let g=0;g<=p;g++){const v=o.top+c/p*g,x=u-u/p*g;n.strokeStyle="rgba(51, 65, 85, 0.5)",n.lineWidth=1,n.beginPath(),n.moveTo(o.left,v),n.lineTo(r-o.right,v),n.stroke(),n.fillStyle="#94A3B8",n.fillText(re(x),o.left-10,v)}const f=Math.max(1,Math.floor(t.labels.length/10));n.textAlign="center",n.textBaseline="top";for(let g=0;g<t.labels.length;g+=f){const v=o.left+d/(t.labels.length-1)*g;n.fillStyle="#94A3B8",n.fillText(t.labels[g],v,s-o.bottom+10)}L(n,t.income,"#22C55E","rgba(34, 197, 94, 0.1)",o,d,c,u,t.labels.length),L(n,t.expense,"#EF4444","rgba(239, 68, 68, 0.1)",o,d,c,u,t.labels.length),$(n,t.income,"#22C55E",o,d,c,u,t.labels.length),$(n,t.expense,"#EF4444",o,d,c,u,t.labels.length),ie(e,t,o,d)}function L(e,t,n,a,i,r,s,o,d){if(d<2)return;const c=t.map((l,m)=>({x:i.left+r/(d-1)*m,y:i.top+s-l/o*s}));e.beginPath(),e.moveTo(c[0].x,i.top+s),c.forEach(l=>e.lineTo(l.x,l.y)),e.lineTo(c[c.length-1].x,i.top+s),e.closePath(),e.fillStyle=a,e.fill(),e.beginPath(),e.moveTo(c[0].x,c[0].y);for(let l=1;l<c.length;l++)e.lineTo(c[l].x,c[l].y);e.strokeStyle=n,e.lineWidth=2.5,e.lineJoin="round",e.lineCap="round",e.stroke()}function $(e,t,n,a,i,r,s,o){o<2||t.forEach((d,c)=>{if(d===0)return;const l=a.left+i/(o-1)*c,m=a.top+r-d/s*r;e.beginPath(),e.arc(l,m,4,0,Math.PI*2),e.fillStyle=n,e.fill(),e.strokeStyle="#1E293B",e.lineWidth=2,e.stroke()})}function ie(e,t,n,a,i,r){const s=e.parentElement;let o=s.querySelector(".chart-tooltip");o||(o=document.createElement("div"),o.className="chart-tooltip",s.appendChild(o)),e.addEventListener("mousemove",d=>{const c=e.getBoundingClientRect(),l=d.clientX-c.left,m=d.clientY-c.top;if(l<n.left||l>c.width-n.right){o.classList.remove("visible");return}const u=t.labels.length,p=a/(u-1),f=Math.round((l-n.left)/p);if(f>=0&&f<u){const g=t.income[f],v=t.expense[f];o.innerHTML=`
        <div style="font-weight:600; margin-bottom:4px;">Tanggal ${t.labels[f]}</div>
        <div style="color:#22C55E;">Masuk: ${h(g)}</div>
        <div style="color:#EF4444;">Keluar: ${h(v)}</div>
      `;const x=n.left+p*f;o.style.left=x+"px",o.style.top=m-70+"px",o.classList.add("visible")}}),e.addEventListener("mouseleave",()=>{o.classList.remove("visible")})}function se(e){if(e===0)return 1e5;const t=Math.pow(10,Math.floor(Math.log10(e)));return Math.ceil(e/t)*t}function re(e){return e>=1e9?(e/1e9).toFixed(1)+"M":e>=1e6?(e/1e6).toFixed(1)+"Jt":e>=1e3?(e/1e3).toFixed(0)+"Rb":e.toString()}function le(){return`
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
  `}function O(e,t){return e.length?`
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
          ${[...e].sort((a,i)=>{const r=new Date(i.date)-new Date(a.date);return r!==0?r:new Date(i.createdAt)-new Date(a.createdAt)}).map(a=>`
            <tr>
              <td>${J(a.date)}</td>
              <td>${a.category}</td>
              <td>${a.description||"-"}</td>
              <td>
                <span class="badge ${a.type==="income"?"badge-income":"badge-expense"}">
                  ${a.type==="income"?"Masuk":"Keluar"}
                </span>
              </td>
              <td class="${a.type==="income"?"amount-income":"amount-expense"}">
                ${a.type==="income"?"+":"-"} ${h(a.amount)}
              </td>
              <td>
                <button class="btn btn-danger btn-delete-tx" data-id="${a.id}" title="Hapus">🗑️</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `:`
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <p>Belum ada transaksi. Mulai tambahkan data!</p>
      </div>
    `}function R(e){document.querySelectorAll(".btn-delete-tx").forEach(t=>{t.addEventListener("click",()=>{confirm("Hapus transaksi ini?")&&(W(t.dataset.id),e&&e())})})}const K=["Gaji","Penjualan","Investasi","Bonus","Lainnya"],ce=["Sewa","Alat Kantor","Transport","Makan","Listrik & Air","Internet","Lainnya"];function j(){return`
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
              ${K.map(e=>`<option value="${e}">${e}</option>`).join("")}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="tx-date">Tanggal</label>
            <input type="date" class="form-input" id="tx-date" value="${E()}" />
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
  `}function q(e){const t=document.getElementById("transaction-modal"),n=document.getElementById("modal-close-btn"),a=document.getElementById("modal-cancel-btn"),i=document.getElementById("transaction-form"),r=document.getElementById("toggle-income"),s=document.getElementById("toggle-expense"),o=document.getElementById("tx-category");let d="income";function c(){t.classList.remove("active")}function l(m){const u=m==="income"?K:ce;o.innerHTML=`
      <option value="">Pilih kategori...</option>
      ${u.map(p=>`<option value="${p}">${p}</option>`).join("")}
    `}r.addEventListener("click",()=>{d="income",r.className="type-toggle-btn active-income",s.className="type-toggle-btn",l("income")}),s.addEventListener("click",()=>{d="expense",s.className="type-toggle-btn active-expense",r.className="type-toggle-btn",l("expense")}),n.addEventListener("click",c),a.addEventListener("click",c),t.addEventListener("click",m=>{m.target===t&&c()}),i.addEventListener("submit",m=>{m.preventDefault();const u=document.getElementById("tx-amount").value,p=document.getElementById("tx-category").value,f=document.getElementById("tx-date").value,g=document.getElementById("tx-description").value;if(!u||!p){alert("Nominal dan Kategori wajib diisi!");return}V({type:d,amount:Number(u),category:p,date:f||E(),description:g}),i.reset(),document.getElementById("tx-date").value=E(),d="income",r.className="type-toggle-btn active-income",s.className="type-toggle-btn",l("income"),c(),e&&e()})}function H(){const e=document.getElementById("transaction-modal");e&&(document.getElementById("tx-date").value=E(),e.classList.add("active"),document.getElementById("tx-amount").focus())}function Y(e){const t=T("month"),n=t.transactions.slice(0,5);e.innerHTML=`
    ${A()}
    <main class="main-content page-enter" id="main-content">
      <div class="greeting">${U()}, Admin 👋</div>
      <div class="greeting-sub">Berikut ringkasan keuangan bulan ini.</div>

      ${ae(t)}

      ${le()}

      <div class="section-header">
        <h3 class="section-title">Transaksi Terakhir</h3>
      </div>
      ${O(n)}
    </main>
    ${j()}
  `,N(H),R(a),q(a),requestAnimationFrame(()=>{const i=document.getElementById("line-chart");if(i){const r=X();oe(i,r)}});function a(){Y(e)}}function de(e="month"){return`
    <div class="filter-bar" id="filter-bar">
      ${[{value:"today",label:"Hari Ini"},{value:"week",label:"Minggu Ini"},{value:"month",label:"Bulan Ini"},{value:"all",label:"Semua"}].map(n=>`
        <button class="filter-pill ${n.value===e?"active":""}" data-filter="${n.value}">
          ${n.label}
        </button>
      `).join("")}
    </div>
  `}function ue(e){document.querySelectorAll(".filter-pill").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".filter-pill").forEach(n=>n.classList.remove("active")),t.classList.add("active"),e&&e(t.dataset.filter)})})}function me(e){if(!e.length){alert("Tidak ada data untuk di-export.");return}const t=["Tanggal","Tipe","Kategori","Keterangan","Nominal"],n=e.map(l=>[l.date,l.type==="income"?"Pemasukan":"Pengeluaran",l.category,`"${(l.description||"").replace(/"/g,'""')}"`,l.amount]),a=[t.join(","),...n.map(l=>l.join(","))].join(`
`),i="\uFEFF",r=new Blob([i+a],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(r),o=document.createElement("a");o.href=s;const d=new Date,c=`laporan_keuangan_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}.csv`;o.download=c,o.click(),URL.revokeObjectURL(s)}function ge(){return'<button class="btn btn-secondary" id="btn-export-csv">📥 Export CSV</button>'}function pe(e){const t=document.getElementById("btn-export-csv");t&&t.addEventListener("click",()=>{const n=e();me(n)})}let y="month";function _(e){const t=T(y);e.innerHTML=`
    ${A()}
    <main class="main-content page-enter" id="main-content">
      <div class="section-header">
        <h3 class="section-title">📋 Riwayat Transaksi</h3>
        ${ge()}
      </div>

      ${de(y)}

      ${O(t.transactions)}
    </main>
    ${j()}
  `,N(H),ue(n),R(a),q(a),pe(()=>T(y).transactions);function n(i){y=i,a()}function a(){_(e)}}I("/login",ne);I("/dashboard",Y);I("/history",_);ee();let M;window.addEventListener("resize",()=>{clearTimeout(M),M=setTimeout(()=>{if(document.getElementById("line-chart")){const t=new HashChangeEvent("hashchange");window.dispatchEvent(t)}},300)});
