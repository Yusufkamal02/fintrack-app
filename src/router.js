import { isLoggedIn } from './store.js';

const routes = {};
let currentPage = null;

/**
 * Register a route
 * @param {string} path - e.g. '/dashboard'
 * @param {Function} renderFn - function that returns HTML string
 */
export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

/**
 * Navigate to a path
 * @param {string} path
 */
export function navigate(path) {
  window.location.hash = path;
}

/**
 * Get the main content container
 * @returns {HTMLElement}
 */
function getContentEl() {
  return document.getElementById('app');
}

/**
 * Render the current route
 */
export function renderRoute() {
  const hash = window.location.hash.slice(1) || '/login';

  // Auth guard
  if (hash !== '/login' && !isLoggedIn()) {
    navigate('/login');
    return;
  }

  // If logged in and going to login, redirect to dashboard
  if (hash === '/login' && isLoggedIn()) {
    navigate('/dashboard');
    return;
  }

  const renderFn = routes[hash];
  if (renderFn) {
    const container = getContentEl();
    if (container) {
      currentPage = hash;
      renderFn(container);
    }
  } else {
    navigate('/dashboard');
  }
}

/**
 * Initialize router
 */
export function initRouter() {
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}

/**
 * Get current route path
 * @returns {string}
 */
export function getCurrentRoute() {
  return currentPage || window.location.hash.slice(1) || '/login';
}
