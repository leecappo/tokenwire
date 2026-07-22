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
    title: 'Aave v4 roadmap expands to Bitcoin and Ethereum as unified liquidity layer',
    excerpt: 'The next Aave version aims to support cross-chain borrowing across multiple networks.',
    source: 'Aave',
    url: 'https://aave.com',
    category: 'defi',
    tags: ['ethereum', 'defi'],
    time: '20 hours ago',
    img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1200&q=80',
    type: 'news',
  },
  {
    title: 'Hyperliquid surpasses $5B USDC bridging amid derivatives surge on Solana',
    excerpt: 'Perpetual trading and institutional interest are pushing more collateral onto Solana-based venues.',
    source: 'CryptoSlate',
    url: 'https://cryptoslate.com',
    category: 'defi',
    tags: ['solana', 'defi'],
    time: '20 hours ago',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    type: 'news',
  },
];

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmtTime(t) { return t || 'recently'; }

function resolveImage(n) {
  const raw = n.img || '';
  if (raw) return raw;
  return '';
}

const LIVE = [];
function renderHero(item) {
  const img = document.getElementById('hero-img');
  const title = document.getElementById('hero-title');
  const excerpt = document.getElementById('hero-excerpt');
  const meta = document.getElementById('hero-meta');
  const badge = document.getElementById('hero-badge');
  const link = document.getElementById('hero-link');
  if (!img || !item) return;

  img.style.backgroundImage = `url('${resolveImage(item)}')`;
  if (title) title.textContent = item.title;
  if (excerpt) excerpt.textContent = item.excerpt;
  if (meta) meta.textContent = `${item.source} · ${fmtTime(item.time)}`;
  if (badge) {
    badge.textContent = item.category || 'NEWS';
    badge.className = 'badge ' + (item.category || '');
  }
  if (link) link.href = item.url || '#';
}

function renderTopStories(items) {
  const root = document.getElementById('topstories');
  if (!root) return;
  const top = items.slice(0, 3);
  root.innerHTML = top.map(n => `
    <a class="ts-card" href="${n.url || '#'}" target="_blank" rel="noopener">
      <div class="ts-img" style="background-image:url('${resolveImage(n)}')"></div>
      <div class="ts-body">
        <span class="badge">${n.category}</span>
        <h4>${esc(n.title)}</h4>
        <span class="meta">${esc(n.source)} · ${fmtTime(n.time)}</span>
      </div>
    </a>
  `).join('');
}

function renderFeature(items) {
  const pick = items.find(n => n.type === 'feature') || items[0];
  if (!pick) return;

  const img = document.getElementById('feature-img');
  const title = document.getElementById('feature-title');
  const excerpt = document.getElementById('feature-excerpt');
  const meta = document.getElementById('feature-meta');
  const link = document.getElementById('feature-link');
  const badge = document.getElementById('feature-badge');

  if (img) img.style.backgroundImage = `url('${resolveImage(pick)}')`;
  if (title) title.textContent = pick.title;
  if (excerpt) excerpt.textContent = pick.excerpt;
  if (meta) meta.textContent = `${pick.source} · ${fmtTime(pick.time)} · Feature`;
  if (link) link.href = pick.url || '#';
  if (badge) {
    badge.textContent = pick.category ? pick.category.charAt(0).toUpperCase() + pick.category.slice(1) : 'Feature';
    badge.className = 'badge ' + (pick.category || '');
  }
}

function renderLatest(items) {
  const root = document.getElementById('latest');
  const count = document.getElementById('latest-count');
  if (!root) return;
  const list = items.filter(n => n.type !== 'feature');
  if (count) count.textContent = `${list.length} articles`;
  root.innerHTML = list.map(n => `
    <a class="list-row" href="${n.url || '#'}" target="_blank" rel="noopener">
      <div class="list-thumb" style="background-image:url('${resolveImage(n)}')"></div>
      <div class="list-main">
        <span class="list-title">${esc(n.title)}</span>
        <span class="list-meta">${esc(n.source)} · ${fmtTime(n.time)}</span>
      </div>
      <span class="badge">${n.category}</span>
    </a>
  `).join('');
}

function initTags() {
  document.querySelectorAll('[data-tag]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-tag]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const f = btn.dataset.tag;
      const base = f === 'all' ? NEWS : NEWS.filter(n => {
        const matchCategory = n.category === f;
        const matchTags = Array.isArray(n.tags) && n.tags.includes(f);
        return matchCategory || matchTags;
      });
      const sorted = base.slice().sort((a, b) => (a.time || '').localeCompare(b.time || ''));
      renderHero(sorted[0] || base[0] || NEWS[0]);
      renderTopStories(sorted);
      renderLatest(sorted);
      renderFeature(sorted);
      const target = document.getElementById('topstories-section') || document.getElementById('latest-section');
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

function initTicker() {
  const el = document.getElementById('ticker-top');
  if (!el) return;
  const render = (ticks) => {
    if (!ticks.length) return;
    el.innerHTML = '&nbsp;<span class="ticker-dot">&#9679;</span>&nbsp;'.repeat(6) +
      ticks.map(x => {
        const m = x.match(/^(.+?)\s+\$([\d,.]+)$/);
        if (m) {
          return `&nbsp;<span class="ticker-name">${m[1]}</span>&nbsp;<span class="ticker-price">$${m[2]}</span>&nbsp;<span class="ticker-dot">&#9679;</span>&nbsp;`;
        }
        return `&nbsp;<span class="ticker-item">${x}</span>&nbsp;<span class="ticker-dot">&#9679;</span>&nbsp;`;
      }).join('');
  };
  const upd = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const ticks = (Array.isArray(data) ? data : [])
        .filter(c => c.current_price != null)
        .map(c => `${c.symbol.toUpperCase()} $${Number(c.current_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`);
      render(ticks);
    } catch {
      render([
        'BTC $61,400', 'ETH $1,660', 'SOL $81.07', 'BNB $560.41',
        'XRP $1.09', 'DOGE $0.155', 'ADA $0.45', 'AVAX $18.9',
        'DOT $6.72', 'LINK $14.2', 'MATIC $0.58', 'LTC $72.4',
        'BCH $302', 'XLM $0.11', 'ALGO $0.18', 'ATOM $4.55',
        'VET $0.022', 'FIL $5.68', 'APT $8.33', 'ARB $0.45',
        'OP $2.12', 'INJ $22.4', 'SUI $2.82', 'PEPE $0.0000114',
        'SHIB $0.0000158'
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

function initLiveNews() {
  const live = document.getElementById('live-indicator');
  const ts = document.getElementById('live-ts');
  const updateUI = (items) => {
    renderHero(items[0] || NEWS[0]);
    renderTopStories(items);
    renderLatest(items.filter(n => n.type !== 'feature'));
    renderFeature(items);
    if (ts) ts.textContent = 'Updated ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const fetchFeed = async () => {
    try {
      const sources = [
        'https://www.reddit.com/r/CryptoCurrency/new.json?limit=20',
        'https://www.reddit.com/r/solana/new.json?limit=10',
        'https://www.reddit.com/r/Bitcoin/new.json?limit=10'
      ];
      const entries = [];
      for (const url of sources) {
        const res = await fetch(url, { headers: { 'Accept': 'application/json', 'User-Agent': 'TokenWire/1.0' } });
        if (!res.ok) continue;
        const data = await res.json();
        const list = Array.isArray(data?.data?.children) ? data.data.children : [];
        list.forEach(({ data: child }) => {
          const title = child.title;
          if (!title || child.stickied || child.over_18) return;
          const tl = (title || '').toLowerCase();
          const category =
            /bitcoin|btc/i.test(tl) ? 'bitcoin' :
            /ethereum|eth/i.test(tl) ? 'ethereum' :
            /solana|sol /i.test(tl) ? 'solana' :
            tl.includes('defi') || tl.includes('yield') || tl.includes('governance') ? 'defi' :
            /regulation|cftc|sec|treasury|bills/i.test(tl) ? 'regulation' :
            tl.includes('usdc') || tl.includes('stablecoin') || tl.includes('cross-border') || tl.includes('circle') ? 'payments' :
            'crypto';
          const time = new Date((child.created_utc || Date.now()/1000) * 1000);
          const timeAgo = getTimeAgo(time);
          entries.push({
            title,
            excerpt: (child.selftext || child.title).slice(0, 220),
            source: 'r/' + (child.subreddit || 'news'),
            url: 'https://www.reddit.com' + (child.permalink || ''),
            category,
            tags: [category],
            time: timeAgo,
            image: child.thumbnail && /^https?:\/\//.test(child.thumbnail) ? child.thumbnail : '',
            type: 'news'
          });
        });
      }
      const seen = new Set();
      LIVE.length = 0;
      entries.forEach(n => {
        if (!seen.has(n.url)) { seen.add(n.url); LIVE.push(n); }
      });
      updateUI(LIVE.length ? LIVE : [...NEWS]);
      if (ts) ts.textContent = 'Updated ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      updateUI([...NEWS]);
    }
  };
  fetchFeed();
  setInterval(fetchFeed, 5 * 60 * 1000);
}

function updateUIFromLive() {
  const items = LIVE.length ? LIVE : [...NEWS];
  renderHero(items[0] || NEWS[0]);
  renderTopStories(items);
  renderLatest(items);
  renderFeature(items);
}

function getTimeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return seconds + 's ago';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + 'm ago';
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + 'h ago';
  const days = Math.floor(hours / 24);
  return days + 'd ago';
}

function initSearch() {
  const input = document.getElementById('tw-search');
  const clear = document.getElementById('tw-search-clear');
  const rootLatest = document.getElementById('latest');
  if (!input) return;
  const q = (v) => String(v || '').toLowerCase();
  const filter = (term) => {
    document.querySelectorAll('[data-tag]').forEach(b => b.classList.remove('active'));
    if (clear) clear.style.display = term ? 'inline-flex' : 'none';
    if (!term) {
      if (document.querySelector('[data-tag="all"]')) document.querySelector('[data-tag="all"]').classList.add('active');
      if (LIVE.length) {
        renderHero(LIVE[0]);
        renderTopStories(LIVE);
        renderLatest(LIVE);
        renderFeature(LIVE);
      } else {
        renderHero(NEWS[0]);
        renderTopStories(NEWS);
        renderLatest(NEWS);
        renderFeature(NEWS);
      }
      rootLatest && (rootLatest.id = 'latest');
      return;
    }
    const items = LIVE.length ? LIVE : [...NEWS];
    const matched = items.filter(n => q(n.title).includes(term) || q(n.excerpt).includes(term) || q(n.source).includes(term));
    const first = matched[0] || items[0];
    renderHero(first);
    renderTopStories(matched);
    renderLatest(matched.filter(n => n.type !== 'feature'));
    renderFeature(matched);
    if (!matched.length && term) {
      const empty = document.createElement('div');
      empty.className = 'latest-list';
      empty.id = 'latest';
      empty.innerHTML = '<div class="muted" style="padding:40px;text-align:center">No articles match your search.</div>';
      rootLatest && rootLatest.replaceWith(empty);
    } else {
      rootLatest && (rootLatest.id = 'latest');
    }
  };
  let t;
  input.addEventListener('input', (e) => {
    clear.style.display = e.target.value ? 'inline-flex' : 'none';
    clearTimeout(t);
    t = setTimeout(() => filter(e.target.value.trim()), 120);
  });
  if (clear) {
    clear.addEventListener('click', () => { input.value = ''; clear.style.display = 'none'; filter(''); });
    clear.style.display = 'none';
  }
}

function bootstrap() {
  const heroItem = NEWS[0];
  renderHero(heroItem);
  renderTopStories(NEWS);
  renderFeature(NEWS);
  renderLatest(NEWS);
  initTags();
  initTicker();
  initNewsletter();
  initSearch();
  initLiveNews();
}
bootstrap();
