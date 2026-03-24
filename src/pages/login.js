import { login } from '../store.js';
import { navigate } from '../router.js';

/**
 * Render & bind the login page
 * @param {HTMLElement} container
 */
export function renderLoginPage(container) {
  container.innerHTML = `
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

            <button type="submit" class="btn btn-primary login-btn">
              🔐 Masuk
            </button>
          </form>

          <p class="login-hint">
            Demo: username <strong>admin</strong> / password <strong>admin</strong>
          </p>
        </div>
      </div>
    </div>
  `;

  // Bind form
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      errorEl.classList.add('show');
      setTimeout(() => errorEl.classList.remove('show'), 3000);
    }
  });
}
