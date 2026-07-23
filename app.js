/* TokenWire App */

const NEWS = [
  {
    title: 'Solana Foundation pushes governance proposal for validator fee changes',
    excerpt: 'The foundation wants to tweak validator economics as network revenue remains elevated and dApp demand climbs.',
    source: 'Solana Foundation',
    url: 'https://solana.com/news',
    category: 'solana',
    tags: ['solana'],
    time: '2 hours ago',
    img: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'Jupiter DEX routes another month of multi-billion dollar weekly Solana volume',
    excerpt: 'Aggregated DEX activity remains strong on Solana, with Jupiter still dominant despite quarterly revenue slowing in some metrics.',
    source: 'Dune / Solflare',
    url: 'https://memeburn.com/solana-defi-volumes-surge-after-jupiters-latest-trading-update/',
    category: 'defi',
    tags: ['solana', 'defi'],
    time: '8 hours ago',
    img: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'Bitcoin hits key resistance above $62K as ETF inflows accelerate',
    excerpt: 'Spot Bitcoin ETFs saw their strongest weekly inflows since March, reigniting bullish momentum into month-end.',
    source: 'CoinDesk',
    url: 'https://coindesk.com',
    category: 'bitcoin',
    tags: ['bitcoin'],
    time: '3 hours ago',
    img: 'https://images.unsplash.com/photo-1516245834210-cc1007553f13?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'Ethereum Pectra upgrade timeline updated for late Q2',
    excerpt: 'Core developers confirmed the next major network upgrade will target late June with account abstraction improvements.',
    source: 'Ethereum Foundation',
    url: 'https://blog.ethereum.org',
    category: 'ethereum',
    tags: ['ethereum'],
    time: '5 hours ago',
    img: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'UK Treasury consults on crypto promotions rules with stricter enforcement planned',
    excerpt: 'Updated guidance could change how exchanges and token projects advertise in the UK from late 2026.',
    source: 'HMT',
    url: 'https://www.gov.uk/government/consultations',
    category: 'regulation',
    tags: ['regulation'],
    time: '12 hours ago',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    type: 'feature',
  },
  {
    title: 'Pump.fun lifetime revenue crosses $800M as weekly buybacks continue',
    excerpt: 'Revenue remains high but growth rate is moderating; more competition from newer Solana consumer apps is emerging.',
    source: 'Tokenomics.com',
    url: 'https://pump.fun',
    category: 'solana',
    tags: ['solana'],
    time: '14 hours ago',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'Marinade Finance launches earthquake relief yield campaign in Venezuela',
    excerpt: 'SOL holders can donate staking rewards to earthquake victims without exiting positions, via a Solana Foundation-linked program.',
    source: 'Marinade',
    url: 'https://marinade.finance',
    category: 'defi',
    tags: ['solana', 'defi'],
    time: '16 hours ago',
    img: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'USDC issuer Circle explores new custody partnerships as stablecoin issuance climbs',
    excerpt: 'With stablecoin supply climbing again, Circle is expanding its institutional wallet and treasury options.',
    source: 'Circle',
    url: 'https://circle.com',
    category: 'payments',
    tags: ['payments'],
    time: '18 hours ago',
    img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'SEC delays spot Ethereum ETF decision while fee wars intensify',
    excerpt: 'The regulator postponed its ruling again, while issuers cut fees in anticipation of a crowded ETF market.',
    source: 'Bloomberg',
    url: 'https://bloomberg.com',
    category: 'ethereum',
    tags: ['ethereum'],
    time: '24 hours ago',
    img: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'Bitcoin miners hold as halving revenue pressure shifts toward fee reliance',
    excerpt: 'Hashrate remains stable despite compressed margins, suggesting miner confidence in longer-term fee-based revenue.',
    source: 'CoinDesk',
    url: 'https://coindesk.com',
    category: 'bitcoin',
    tags: ['bitcoin'],
    time: '26 hours ago',
    img: 'https://images.unsplash.com/photo-1516245834210-cc1007553f13?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'Japan updates stablecoin and payments licensing framework for 2026',
    excerpt: 'New rules clarify issuer requirements and custodial arrangements for yen-backed stablecoins.',
    source: 'Nikkei Asia',
    url: 'https://asia.nikkei.com',
    category: 'payments',
    tags: ['payments', 'regulation'],
    time: '28 hours ago',
    img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=1200&q=80',
    type: 'news',
  },
];

const CATEGORY_LABELS = {
  all: 'All',
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
  solana: 'Solana',
  defi: 'DeFi',
  payments: 'Payments',
  regulation: 'Regulation',
  crypto: 'Crypto',
};

let activeTag = 'all';
let activeQuery = '';
let liveCache = [];

const CRYPTOCOMPARE_NEWS_URL =
  'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=latest';
const NEWS_PROXY = 'https://api.allorigins.win/get?url=';
const RSS_LIVE_FEED =
  'https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss&count=12';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmtTime(t) { return t || 'recently'; }

function resolveImage(n) {
  const raw = n.img || n.image || '';
  if (raw && /^https?:\/\//.test(raw)) return raw;
  const map = {
    bitcoin: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&q=80',
    ethereum: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1200&q=80',
    solana: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80',
    defi: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80',
    payments: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=1200&q=80',
    regulation: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    crypto: 'https://images.unsplash.com/photo-1516245834210-cc1007553f13?w=1200&q=80',
  };
  const cat = (n.category || 'crypto').toLowerCase();
  return map[cat] || map['crypto'];
}

function categoryForNode(node) {
  const body = [node.title, node.body || '', node.tags ? node.tags.join(' ') : ''].join(' ').toLowerCase();
  if (/bitcoin|btc/i.test(body)) return 'bitcoin';
  if (/ethereum|eth/i.test(body)) return 'ethereum';
  if (/solana|sol/i.test(body)) return 'solana';
  if (/defi|yield|governance|lending|liquidity|dex/i.test(body)) return 'defi';
  if (/regulation|sec|cftc|treasury|law|compliance/i.test(body)) return 'regulation';
  if (/stablecoin|usdc|usdt|payments|cross-border/i.test(body)) return 'payments';
  return 'crypto';
}

function normalizeNewsItem(node) {
  const category = categoryForNode(node);
  return {
    title: node.title || 'Untitled',
    excerpt: (node.body || node.title || '').slice(0, 220),
    source: node.source || 'CryptoCompare',
    url: node.url || '#',
    category,
    tags: [category],
    time: 'recently',
    img: node.imageurl || '',
    type: 'news',
  };
}

function showLoadingSpinner() {
  const container = document.getElementById('latest');
  const topstories = document.getElementById('topstories');
  const heroLink = document.getElementById('hero-link');
  const feature = document.getElementById('features');
  if (container)
    container.innerHTML =
      '<div class="news-loading">Loading TokenWire feed...</div>';
  if (topstories) topstories.innerHTML = '';
  if (heroLink) {
    document.getElementById('hero-title').textContent = '';
    document.getElementById('hero-excerpt').textContent = '';
    document.getElementById('hero-meta').textContent = '';
  }
  if (feature) {
    document.getElementById('feature-title').textContent = '';
    document.getElementById('feature-excerpt').textContent = '';
    document.getElementById('feature-meta').textContent = '';
  }
}

function showError(message) {
  const container = document.getElementById('latest');
  if (container)
    container.innerHTML = `<div class="news-error">⚠️ ${esc(message || 'Could not load the live news feed right now. Please try again soon.')}</div>`;
}

function renderHero(item) {
  const img = document.getElementById('hero-img');
  const title = document.getElementById('hero-title');
  const excerpt = document.getElementById('hero-excerpt');
  const meta = document.getElementById('hero-meta');
  const badge = document.getElementById('hero-badge');
  const link = document.getElementById('hero-link');
  if (!img || !item) return;

  const resolved = resolveImage(item);
  if (resolved) img.style.backgroundImage = `url('${esc(resolved)}')`;
  if (title) title.textContent = item.title;
  if (excerpt) excerpt.textContent = item.excerpt;
  if (meta) meta.textContent = `${item.source} · ${fmtTime(item.time)}`;
  if (badge) {
    badge.textContent = item.sourceLabel || item.source;
  }
  if (item.url && item.url !== '#') {
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener';
  } else {
    link.href = 'javascript:void(0)';
  }
}

function renderTopStories(items) {
  const root = document.getElementById('topstories');
  if (!root) return;
  const top = items.slice(0, 3);
  root.innerHTML = top
    .map(
      (n) =>
        `<a class="ts-card" href="${esc(n.url || '#')}" target="_blank" rel="noopener">
        <div class="ts-img" style="background-image:url('${esc(resolveImage(n))}')"></div>
        <div class="ts-body">
          <span class="badge">${esc(n.category)}</span>
          <h4>${esc(n.title)}</h4>
          <span class="meta">${esc(n.source)} · ${fmtTime(n.time)}</span>
        </div>
      </a>`
    )
    .join('');
}

function renderFeature(items) {
  const pick = items.find((n) => n.type === 'feature') || items[0];
  if (!pick) return;

  const img = document.getElementById('feature-img');
  const title = document.getElementById('feature-title');
  const excerpt = document.getElementById('feature-excerpt');
  const meta = document.getElementById('feature-meta');
  const link = document.getElementById('feature-link');
  const badge = document.getElementById('feature-badge');

  if (img) img.style.backgroundImage = `url('${esc(resolveImage(pick))}')`;
  if (title) title.textContent = pick.title;
  if (excerpt) excerpt.textContent = pick.excerpt;
  if (meta) meta.textContent = `${pick.source} · ${fmtTime(pick.time)} · Feature`;
  if (badge) {
    badge.textContent = pick.category ? pick.category.charAt(0).toUpperCase() + pick.category.slice(1) : 'Feature';
    badge.className = 'badge ' + (pick.category || '');
  }
  if (pick.url && pick.url !== '#') {
    link.href = pick.url;
    link.target = '_blank';
    link.rel = 'noopener';
  } else {
    link.href = 'javascript:void(0)';
  }
}

function renderLatest(items) {
  const root = document.getElementById('latest');
  const count = document.getElementById('latest-count');
  if (!root) return;
  if (count) count.textContent = `${items.length} articles`;
  if (!items.length) {
    root.innerHTML = '<div class="news-loading">No articles match this filter yet.</div>';
    return;
  }
  const list = items.filter((n) => n.type !== 'feature');
  root.innerHTML = list
    .map(
      (n) =>
        `<a class="list-row" href="${esc(n.url || '#')}" target="_blank" rel="noopener">
        <div class="list-thumb" style="background-image:url('${esc(resolveImage(n))}')"></div>
        <div class="list-main">
          <span class="list-title">${esc(n.title)}</span>
          <span class="list-meta">${esc(n.source)} · ${fmtTime(n.time)}</span>
        </div>
        <span class="badge">${esc(n.category)}</span>
        ${n.sourceLabel ? `<span class="source-badge">${esc(n.sourceLabel)}</span>` : ''}
      </a>`
    )
    .join('');
}

function initTags() {
  document.querySelectorAll('[data-tag]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-tag]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = btn.dataset.tag || 'all';
      activeQuery = document.getElementById('tw-search')?.value || '';
      filter({ activeTag, q: activeQuery });
    });
  });
}

let TICKER_CACHE = [];
function initTicker() {
  const el = document.getElementById('ticker-top');
  if (!el) return;
  const render = (ticks) => {
    if (!ticks.length) return;
    el.innerHTML =
      '&nbsp;<span class="ticker-dot">&#9679;</span>&nbsp;'.repeat(6) +
      ticks
        .map((x) => {
          const m = x.match(/^(.+?)\s+\$([\d,.]+)$/);
          if (m) {
            return `&nbsp;<span class="ticker-name">${esc(m[1])}</span>&nbsp;<span class="ticker-price">$${esc(m[2])}</span>&nbsp;<span class="ticker-dot">&#9679;</span>&nbsp;`;
          }
          return `&nbsp;<span class="ticker-item">${esc(x)}</span>&nbsp;<span class="ticker-dot">&#9679;</span>&nbsp;`;
        })
        .join('');
  };
  renderTrending();
  const upd = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const ticks = (Array.isArray(data) ? data : [])
        .filter((c) => c.current_price != null)
        .map((c) => ({
          symbol: c.symbol.toUpperCase(),
          price: Number(c.current_price),
          change: Number(c.price_change_percentage_24h || 0),
        }));
      TICKER_CACHE = ticks;
      const ts = ticks.map((t) => `${t.symbol} $${t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`);
      render(ts);
      renderTrending();
    } catch {
      render([
        'BTC $61,400', 'ETH $1,660', 'SOL $81.07', 'BNB $560.41',
        'XRP $1.09', 'DOGE $0.155', 'ADA $0.45', 'AVAX $18.9',
        'DOT $6.72', 'LINK $14.2', 'MATIC $0.58', 'LTC $72.4',
        'BCH $302', 'XLM $0.11', 'ALGO $0.18', 'ATOM $4.55',
        'VET $0.022', 'FIL $5.68', 'APT $8.33', 'ARB $0.45',
        'OP $2.12', 'INJ $22.4', 'SUI $2.82', 'PEPE $0.0000114',
        'SHIB $0.0000158',
      ]);
    }
  };
  upd();
  setInterval(upd, 60 * 1000);
}

async function handleTokenWireSubscribe(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input[type="email"]');
  const email = (input.value || '').trim();
  if (!email) return;
  const btn = form.querySelector('button[type="submit"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Joining...'; }
  const status = document.getElementById('tw-status');
  const setStatus = (kind, message) => {
    if (!status) return;
    status.textContent = message;
    status.style.color = kind === 'success' ? '#7ee787' : '#ff8a8a';
  };
  const bd = window.__TOKENWIRE_BUTTONDOWN__;
  if (bd && bd.endpoint) {
    try {
      const res = await fetch(bd.endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success', "You're on the list. Check your inbox to confirm.");
        input.value = '';
        return;
      }
      const data = await res.json().catch(() => ({}));
      setStatus('error', (data && data.message) || 'Subscription issue. Try again.');
    } catch {
      setStatus('error', 'Could not reach newsletter service. Try again.');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Join'; }
    }
    return;
  }
  const pubId = '7a43efb4-02cb-46cb-96b6-b647b04fe7f8';
  const url = `https://www.beehiiv.com/api/v1/public/subscribers/${pubId}/add`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, name: '' }),
    });
    const data = await res.json();
    if (data && data.status === 'active') {
      setStatus('success', "You're on the list. Check your inbox to confirm.");
      input.value = '';
    } else {
      setStatus('error', 'Subscription issue: ' + (data.status || 'try again later'));
    }
  } catch {
    setStatus('error', 'Could not reach newsletter service. Use Subscribe on Beehiiv below.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Join'; }
  }
}

function initNewsletter() {
  const form = document.getElementById('tw-newsletter');
  if (form) form.addEventListener('submit', handleTokenWireSubscribe);
}

function nowStamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function matchesQuery(n, q) {
  const term = String(q || '').toLowerCase().trim();
  if (!term) return true;
  return [n.title, n.excerpt, n.source].some((s) => String(s || '').toLowerCase().includes(term));
}
function matchesTag(n, tag) {
  const t = String(tag || '').toLowerCase();
  if (!t || t === 'all') return true;
  return (
    String(n.category || '').toLowerCase() === t ||
    (Array.isArray(n.tags) && n.tags.some((tagItem) => String(tagItem || '').toLowerCase() === t))
  );
}
function applyFilter(items) {
  return items.filter((n) => matchesTag(n, activeTag) && matchesQuery(n, activeQuery));
}

function renderFiltered(items) {
  const base = applyFilter(items || NEWS);
  const sorted = base.slice().sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  renderHero(sorted[0] || base[0] || NEWS[0]);
  renderTopStories(sorted);
  renderLatest(sorted);
  renderFeature(sorted);
}

function setLastUpdated(tsText) {
  const ts = document.getElementById('live-ts');
  if (ts) ts.textContent = `Last updated at ${tsText || nowStamp()}`;
}

async function fetchLiveCryptoNews() {
  const res = await fetch(RSS_LIVE_FEED);
  if (!res.ok) throw new Error(`RSS feed failed: HTTP ${res.status}`);
  const data = await res.json();
  const items = Array.isArray(data?.items) ? data.items : [];
  if (!items.length) throw new Error('RSS returned no items.');

  const mapped = items.slice(0, 12).map((item, index) => {
    const category = categoryForNode(item);
    const published = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
    const thumbnail = item.thumbnail || item.enclosure?.link || '';
    return {
      title: item.title || 'Untitled',
      excerpt: (item.description || item.title || '').replace(/<[^>]+>/g, '').slice(0, 220),
      source: 'Cointelegraph',
      url: item.link || '#',
      category,
      tags: [category],
      time: published,
      img: thumbnail,
      sourceLabel: 'Live',
      type: index === 0 ? 'feature' : 'news',
    };
  });

  return mapped;
}

async function refreshLiveNews() {
  const items = await fetchLiveCryptoNews();
  liveCache = items;
  const ts = document.getElementById('live-ts');
  if (ts) ts.dataset.fallback = '0';
  renderFiltered(items);
  setLastUpdated();
}

function showLiveError(message) {
  liveCache = [];
  const fallback = [...NEWS];
  renderFiltered(fallback);
  setLastUpdated();
  const status = document.getElementById('feed-status');
  if (status) {
    status.textContent = message || 'Live news unavailable — showing curated news.';
    status.classList.add('error');
  }
}

async function bootstrapLiveNews() {
  showLoadingSpinner();
  try {
    await refreshLiveNews();
  } catch (err) {
    console.warn('TokenWire live news failed:', err);
    showLiveError('Live news failed to load. Showing curated news for now.');
  }
}

function filter(state) {
  const active = state?.activeTag || 'all';
  const q = state?.q ? String(state.q).toLowerCase().trim() : '';
  activeTag = active;
  activeQuery = q;
  document.querySelectorAll('[data-tag]').forEach((b) => b.classList.remove('active'));
  document.querySelector(`[data-tag="${active}"]`)?.classList.add('active');
  const items = liveCache.length ? liveCache : NEWS;
  renderFiltered(items);
}

function initSearch() {
  const input = document.getElementById('tw-search');
  const clear = document.getElementById('tw-search-clear');
  const root = document.getElementById('latest');
  if (!input) return;
  const apply = (term) => filter({ q: term });
  const filterWithCache = (term) => {
    document.querySelectorAll('[data-tag]').forEach((b) => b.classList.remove('active'));
    if (clear) clear.style.display = term ? 'inline-flex' : 'none';
    apply(term || '');
    if (!term) document.querySelector('[data-tag="all"]')?.classList.add('active');
  };
  let t;
  input.addEventListener('input', (e) => {
    if (clear) clear.style.display = e.target.value ? 'inline-flex' : 'none';
    clearTimeout(t);
    t = setTimeout(() => filterWithCache(e.target.value.trim()), 120);
  });
  if (clear) {
    clear.addEventListener('click', () => {
      input.value = '';
      clear.style.display = 'none';
      filterWithCache('');
    });
    clear.style.display = 'none';
  }
}

function initNavLinks() {
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function renderTrending() {
  const root = document.getElementById('trending-list');
  if (!root) return;
  const list = TICKER_CACHE.slice(0, 5).map((x) => ({
    name: x.symbol,
    price: `$${x.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`,
    change: `${x.change >= 0 ? '+' : ''}${x.change.toFixed(2)}%`,
  }));
  root.innerHTML = list
    .map(
      (n) =>
        `<div class="trending-item">
        <span class="trending-name">${esc(n.name)}</span>
        <div>
          <span class="trending-price">${esc(n.price)}</span>
          <span class="trending-change ${n.change.startsWith('+') ? 'up' : 'down'}">${esc(n.change)}</span>
        </div>
      </div>`
    )
    .join('');
}

function renderInsights() {
  const labels = [
    'Expert Analysis',
    'On-chain Insights',
    'Regulation Watch',
    'DeFi Deep Dive',
  ];
  const root = document.querySelector('.widget:nth-child(2) .about-text');
  if (!root) return;
  root.textContent = `TokenWire curates ${labels[Math.floor(Math.random() * labels.length)]} across protocol design, governance risk, and policy shifts.`;
}

async function bootstrap() {
  try {
    renderHero(NEWS[0]);
    renderTopStories(NEWS);
    renderFeature(NEWS);
    renderLatest(NEWS);
    renderTrending();
    renderInsights();
    initTags();
    initTicker();
    initNewsletter();
    initSearch();
    initNavLinks();
    bootstrapLiveNews();
    setInterval(bootstrapLiveNews, 60 * 60 * 1000);
  } catch (err) {
    console.error('TokenWire bootstrap failed:', err);
    const fallback = document.createElement('div');
    fallback.className = 'container';
    fallback.style.cssText = 'padding:30px;color:#ff8a8a;text-align:center;';
    fallback.textContent = 'Loading failed. If it persists, open dev tools (F12) and send me the error.';
    document.querySelector('main')?.insertAdjacentElement('afterbegin', fallback);
  }
}
bootstrap();
