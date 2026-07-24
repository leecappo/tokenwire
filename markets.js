/* TokenWire Markets */
(() => {
  const MARKETS_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  const REFRESH_MS = 5 * 60 * 1000;

  const tableBody = document.querySelector('#markets-table tbody');
  const searchInput = document.getElementById('markets-search');
  const noResults = document.getElementById('markets-no-results');
  const liveBadge = document.getElementById('markets-live-badge');
  const liveText = document.getElementById('markets-live-text');
  const lastUpdated = document.getElementById('markets-last-updated');
  const errorBanner = document.getElementById('markets-error-banner');

  let currentCoins = [];

  function qs(sel, root = document) { return root.querySelector(sel); }

  function formatMoney(value, decimals = 2) {
    const n = Number(value);
    if (!isFinite(n)) return '—';
    if (n >= 1_000_000_000_000) return '$' + (n / 1_000_000_000_000).toFixed(decimals).replace(/\.00$/, '') + 'T';
    if (n >= 1_000_000_000) return '$' + (n / 1_000_000_000).toFixed(decimals).replace(/\.00$/, '') + 'B';
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(decimals).replace(/\.00$/, '') + 'M';
    return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatUsd(value) {
    const n = Number(value);
    if (!isFinite(n)) return '—';
    if (n >= 1) return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  }

  function formatPercent(value) {
    const n = Number(value);
    if (!isFinite(n)) return '—';
    const sign = n >= 0 ? '+' : '';
    return sign + n.toFixed(2) + '%';
  }

  function setLiveBadge(mode) {
    if (!liveBadge || !liveText) return;
    liveBadge.className = 'markets-live-badge ' + (mode === 'live' ? 'live' : 'fallback');
    liveText.textContent = mode === 'live' ? 'Live Data' : 'Fallback';
  }

  function setLastUpdated(date) {
    if (!lastUpdated) return;
    try {
      lastUpdated.textContent = 'Last updated: ' + new Date(date).toLocaleString();
    } catch (e) {
      lastUpdated.textContent = 'Last updated: ' + date;
    }
  }

  function showErrorBanner(show) {
    if (!errorBanner) return;
    errorBanner.style.display = show ? 'flex' : 'none';
  }

  function createRow(coin) {
    const tr = document.createElement('tr');
    const symbol = String(coin.symbol || '').toUpperCase();
    const change = Number(coin.price_change_percentage_24h);
    const isUp = change >= 0;
    const img = coin.image ? `<img src="${coin.image}" alt="${coin.name}" class="coin-logo" loading="lazy" />` : '';
    tr.innerHTML = `
      <td class="coin-rank">${coin.market_cap_rank ?? '—'}</td>
      <td class="coin-identity">${img} <span>${coin.name}</span> <span class="coin-symbol">${symbol}</span></td>
      <td class="coin-price">${formatUsd(coin.current_price)}</td>
      <td class="coin-change ${isUp ? 'up' : 'down'}">${formatPercent(change)}</td>
      <td class="coin-muted">${formatMoney(coin.market_cap)}</td>
      <td class="coin-muted">${formatMoney(coin.total_volume)}</td>
    `;
    return tr;
  }

  function renderTable(coins) {
    if (!tableBody) return;
    tableBody.innerHTML = '';
    if (!coins.length) {
      if (noResults) noResults.style.display = 'flex';
      return;
    }
    if (noResults) noResults.style.display = 'none';
    coins.forEach(coin => tableBody.appendChild(createRow(coin)));
  }

  function filterCoins(query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return currentCoins || [];
    return (currentCoins || []).filter(coin => {
      const name = String(coin.name || '').toLowerCase();
      const symbol = String(coin.symbol || '').toLowerCase();
      return name.includes(q) || symbol.includes(q);
    });
  }

  async function fetchMarkets() {
    try {
      const res = await fetch(MARKETS_URL);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      currentCoins = Array.isArray(data) ? data : [];
      return currentCoins;
    } catch (e) {
      console.warn('TokenWire markets fetch failed:', e);
      return [];
    }
  }

  async function loadMarkets() {
    showErrorBanner(false);
    const coins = await fetchMarkets();
    if (!coins.length) {
      showErrorBanner(true);
      renderTable([]);
      setLiveBadge('fallback');
      setLastUpdated(new Date().toISOString());
      return;
    }
    const query = searchInput ? searchInput.value : '';
    renderTable(filterCoins(query));
    setLiveBadge('live');
    setLastUpdated(new Date().toISOString());
  }

  function initSearch() {
    if (!searchInput) return;
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      const filtered = filterCoins(query);
      renderTable(filtered);
    });
  }

  function startPolling() {
    loadMarkets();
    setInterval(loadMarkets, REFRESH_MS);
  }

  function bootstrap() {
    initSearch();
    startPolling();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
