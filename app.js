/* TokenWire - Live data layer */
(() => {
  const NEWS_CACHE_KEY = 'tw_news_cache';
  const TICKER_CACHE_KEY = 'tw_ticker_cache';
  const NEWS_TTL_MS = 60 * 60 * 1000;
  const TICKER_TTL_MS = 5 * 60 * 1000;

  const COIN_SLUGS = ['bitcoin','ethereum','solana','binancecoin','ripple','dogecoin','cardano','avalanche-2'];
  const SIDEBAR_COIN_SLUGS = ['bitcoin','ethereum','solana'];
  const COIN_MAP = { bitcoin:'BTC', ethereum:'ETH', solana:'SOL', 'binancecoin':'BNB', ripple:'XRP', dogecoin:'DOGE', cardano:'ADA', 'avalanche-2':'AVAX' };

  const SECTIONS = {
    topstories: document.querySelector('#topstories .topstories'),
    features: document.querySelector('#features .features'),
    latest: document.querySelector('#latest .latest-list')
  };

  const filterBar = document.querySelector('.filter-bar');
  const filterPills = Array.from(document.querySelectorAll('.filter-pill'));
  const liveBadge = document.getElementById('tw-live-badge');
  const liveText = document.getElementById('tw-live-text');

  const heroImg = document.getElementById('hero-img');
  const heroTitle = document.getElementById('hero-title');
  const heroExcerpt = document.getElementById('hero-excerpt');
  const heroMeta = document.getElementById('hero-meta');
  const heroLink = document.getElementById('hero-link');
  const heroBadge = document.getElementById('hero-badge');

  const sidebarMarkets = document.querySelector('#sidebar-markets');

  function qs(selector, root = document) { return root.querySelector(selector); }
  function qsa(selector, root = document) { return Array.from(root.querySelectorAll(selector)); }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function normalizeCategory(category) {
    const c = String(category || '').toLowerCase();
    const map = { bitcoin:'bitcoin', ethereum:'ethereum', solana:'solana', defi:'defi', payments:'payments', regulation:'regulation' };
    return map[c] || '';
  }

  function tagCategory(item) {
    if (!item) return '';
    if (item.categories && item.categories[0]) {
      const cat = item.categories[0].title || item.categories[0].slug || '';
      const norm = normalizeCategory(cat);
      if (norm) return norm;
    }
    const title = (item.title || '').toLowerCase();
    const source = (item.source || '').toLowerCase();
    if (title.includes('bitcoin') || source.includes('bitcoin')) return 'bitcoin';
    if (title.includes('ethereum') || source.includes('ethereum')) return 'ethereum';
    if (title.includes('solana') || source.includes('solana')) return 'solana';
    if (title.includes('defi') || title.includes('jupiter') || title.includes('marinade')) return 'defi';
    if (title.includes('payment') || title.includes('stablecoin') || title.includes('usdc')) return 'payments';
    if (title.includes('sec') || title.includes('regulation') || title.includes('treasury')) return 'regulation';
    return '';
  }

  function updateHero(article) {
    if (!article) return;
    const img = article.image || '';
    const bg = img ? `url('${escapeHtml(img)}')` : "linear-gradient(135deg, #9945ff, #14f195)";
    if (heroImg) heroImg.style.backgroundImage = bg;
    if (heroTitle) heroTitle.textContent = article.title || '';
    if (heroExcerpt) heroExcerpt.textContent = '';
    if (heroMeta) heroMeta.textContent = `${escapeHtml(article.source || 'TokenWire')} · ${article.published_at ? new Date(article.published_at).toLocaleString() : ''}`;
    if (heroLink) {
      heroLink.href = article.url || '#';
      heroLink.target = '_blank';
      heroLink.rel = 'noopener';
    }
    if (heroBadge) heroBadge.textContent = article.category ? article.category.charAt(0).toUpperCase() + article.category.slice(1) : 'News';
  }

  function updateSidebarMarkets(items) {
    if (!sidebarMarkets) return;
    if (!items || !items.length) {
      sidebarMarkets.innerHTML = '<div class="about-text">Market data temporarily unavailable.</div>';
      return;
    }
    const rows = items.slice(0, 3).map(coin => `
      <div class="trending-item">
        <span class="trending-name">${escapeHtml(coin.symbol)}</span>
        <div>
          <span class="trending-price">${escapeHtml(coin.price)}</span>
          <span class="trending-change ${coin.up ? 'up' : 'down'}">${escapeHtml(coin.change)}</span>
        </div>
      </div>
    `).join('');
    sidebarMarkets.innerHTML = rows;
  }

  function createCard(item, type) {
    const link = item.url || '#';
    const title = item.title || 'Untitled';
    const source = item.source || '';
    const time = item.published_at ? new Date(item.published_at).toLocaleString() : '';
    const badgeClass = (item.categories && item.categories[0] && item.categories[0].slug) ? item.categories[0].slug : '';
    const img = item.image || '';

    if (type === 'list') {
      const el = document.createElement('a');
      el.className = 'list-row';
      el.href = link;
      el.target = '_blank';
      el.rel = 'noopener';
      el.setAttribute('data-category', badgeClass);
      el.innerHTML = `
        <div class="list-thumb" style="background-image: url('${img}')"></div>
        <div class="list-main">
          <span class="list-title">${escapeHtml(title)}</span>
          <span class="list-meta">${escapeHtml(source || '')} ${time ? '· ' + escapeHtml(time) : ''}</span>
        </div>
        <span class="badge">${escapeHtml(badgeClass || 'News')}</span>
      `;
      return el;
    }

    const article = document.createElement('article');
    article.className = type === 'feature' ? 'feature-card' : 'ts-card';
    article.setAttribute('data-category', badgeClass);
    article.innerHTML = `
      <a href="${link}" target="_blank" rel="noopener">
        <div class="${type === 'feature' ? 'feature-img' : 'ts-img'}" style="background-image: url('${img}')"></div>
        <div class="${type === 'feature' ? 'feature-body' : 'ts-body'}">
          <span class="badge">${escapeHtml(badgeClass || 'News')}</span>
          ${type === 'feature' ? `<p>${escapeHtml(title)}</p>` : `<h3>${escapeHtml(title)}</h3>`}
          <span class="meta">${escapeHtml(source || '')} ${time ? '· ' + escapeHtml(time) : ''}</span>
        </div>
      </a>
    `;
    return article;
  }

  function renderArticles(articles, filter) {
    const filterValue = (filter || 'all').toLowerCase();
    const items = articles.map(a => ({ ...a, category: tagCategory(a) }));

    const topData = items.filter(it => filterValue === 'all' || it.category === filterValue).slice(0, 3);
    if (SECTIONS.topstories) {
      SECTIONS.topstories.innerHTML = '';
      if (topData.length) topData.forEach(it => SECTIONS.topstories.appendChild(createCard(it, 'ts')));
      else SECTIONS.topstories.innerHTML = '<div class="muted">No articles right now.</div>';
    }

    const featureStart = topData.length ? 3 : 0;
    const featureData = items.filter(it => filterValue === 'all' || it.category === filterValue).slice(featureStart, featureStart + 3);
    if (SECTIONS.features) {
      SECTIONS.features.innerHTML = '';
      if (featureData.length) featureData.forEach(it => SECTIONS.features.appendChild(createCard(it, 'feature')));
      else SECTIONS.features.innerHTML = '<div class="muted">No articles right now.</div>';
    }

    const latestData = items.filter(it => filterValue === 'all' || it.category === filterValue).slice(0, 11);
    if (SECTIONS.latest) {
      SECTIONS.latest.innerHTML = '';
      if (latestData.length) latestData.forEach(it => SECTIONS.latest.appendChild(createCard(it, 'list')));
      else SECTIONS.latest.innerHTML = '<div class="muted">No articles right now.</div>';
    }

    if (topData.length) updateHero(topData[0]);
  }

  async function fetchWithTimeout(url, options = {}, timeoutMs = 20000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      return data;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%239945ff'/%3E%3Cstop offset='100%25' stop-color='%2314f195'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='200' fill='url(%23g)'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial,sans-serif' font-weight='800' font-size='48' fill='white'%3ETW%3C/text%3E%3C/svg%3E";

  function extractImage(item) {
    if (item.enclosure && item.enclosure.link) return String(item.enclosure.link);
    if (item.thumbnail) return String(item.thumbnail);
    if (item.enclosure && item.enclosure.url) return String(item.enclosure.url);
    return String(PLACEHOLDER_IMG);
  }

  function normalizeCategoryFromText(text) {
    const t = String(text || '').toLowerCase();
    if (t.includes('bitcoin') || t.includes('btc') || t.includes('₿')) return 'bitcoin';
    if (t.includes('ethereum') || t.includes('eth') || t.includes('ether')) return 'ethereum';
    if (t.includes('solana') || t.includes('sol ')) return 'solana';
    if (t.includes('defi') || t.includes('decentralized finance')) return 'defi';
    if (t.includes('payment') || t.includes('stablecoin') || t.includes('usdc') || t.includes('usdt')) return 'payments';
    if (t.includes('regulat') || t.includes('sec') || t.includes('legislation') || t.includes('law') || t.includes('ban')) return 'regulation';
    return '';
  }

  function tagRssItem(item) {
    const title = String(item.title || '');
    const description = String(item.description || '');
    const cats = Array.isArray(item.categories) ? item.categories.map(String).join(' ') : '';
    const text = title + ' ' + description + ' ' + cats;
    const category = normalizeCategoryFromText(text);
    return {
      title: title || 'Untitled',
      url: String(item.link || '#'),
      source: String(item.source || 'TokenWire'),
      published_at: String(item.pubDate || new Date().toISOString()),
      image: extractImage(item),
      categories: item.categories || [],
      category
    };
  }

  async function loadRssFeed(feedUrl) {
    const url = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl);
    const data = await fetchWithTimeout(url, {}, 20000);
    if (!data || data.status !== 'ok') {
      console.warn('TokenWire rss2json status not ok:', data && data.status, feedUrl);
      return [];
    }
    const items = Array.isArray(data.items) ? data.items : [];
    return items.slice(0, 40).map(it => ({
      ...tagRssItem(it),
      source: it.source || new URL(feedUrl).hostname.replace(/^www\\./, '')
    }));
  }

  async function loadRssChain() {
    const feeds = [
      'https://cointelegraph.com/rss',
      'https://coindesk.com/arc/outboundfeeds/rss/',
      'https://decrypt.co/feed',
      'https://cryptopotato.com/feed/',
      'https://www.coindesk.com/arc/outboundfeeds/rss/',
      'https://cointelegraph.com/rss'
    ];
    const seen = new Set();
    for (const feed of feeds) {
      if (seen.has(feed)) continue;
      seen.add(feed);
      try {
        const items = await loadRssFeed(feed);
        if (items.length) return items;
      } catch (e) {
        console.warn('TokenWire RSS feed failed:', feed, e);
      }
    }
    return [];
  }

  async function loadNews() {
    let articles = [];
    let mode = 'fallback';
    try {
      articles = await loadRssChain();
      if (articles.length) mode = 'live';
    } catch (e) {
      console.warn('TokenWire news fetch failed:', e);
      mode = 'fallback';
    }

    if (!articles.length) {
      articles = [{
        title: 'Live news temporarily unavailable.',
        url: '#',
        source: 'TokenWire',
        published_at: new Date().toISOString(),
        image: '',
        categories: [],
        category: ''
      }];
      mode = 'fallback';
    }

    const cache = { ts: Date.now(), articles, mode };
    try { localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(cache)); } catch (e) {}

    updateLiveBadge(mode);
    renderArticles(articles, getFilter());
  }

  function getFilter() {
    const hash = location.hash.replace('#', '').toLowerCase();
    const valid = ['all','bitcoin','ethereum','solana','defi','payments','regulation'];
    return valid.includes(hash) ? hash : 'all';
  }

  function updateLiveBadge(mode) {
    if (!liveBadge || !liveText) return;
    liveBadge.className = 'live-badge ' + (mode === 'live' ? 'live' : 'fallback');
    liveText.textContent = mode === 'live' ? 'Live' : 'Fallback';
  }

  function setActivePill(filter) {
    filterPills.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
  }

  async function loadTicker() {
    let items = [];
    let source = 'fallback';
    const fallback = [
      { id: 'bitcoin', symbol: 'BTC', price: '$64,996.00', change: '+1.84%', up: true },
      { id: 'ethereum', symbol: 'ETH', price: '$1,884.61', change: '-0.45%', up: false },
      { id: 'solana', symbol: 'SOL', price: '$75.52', change: '+3.21%', up: true }
    ];

    try {
      const ids = SIDEBAR_COIN_SLUGS.join(',');
      const data = await fetchWithTimeout(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`, {}, 20000);
      items = SIDEBAR_COIN_SLUGS.map(slug => data[slug]).filter(Boolean).map(coin => ({
        id: coin.id || slug,
        symbol: (COIN_MAP[coin.id] || coin.symbol || '').toUpperCase(),
        price: '$' + Number(coin.usd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: coin.usd_24h_change != null ? (coin.usd_24h_change >= 0 ? '+' : '') + Number(coin.usd_24h_change).toFixed(2) + '%' : '0.00%',
        up: coin.usd_24h_change == null ? true : coin.usd_24h_change >= 0
      }));
      source = items.length ? 'live' : 'fallback';
    } catch (e) {
      console.warn('TokenWire sidebar prices fetch failed:', e);
      items = fallback;
    }

    const cache = { ts: Date.now(), items, source };
    try { localStorage.setItem(TICKER_CACHE_KEY, JSON.stringify(cache)); } catch (e) {}

    renderTicker(items);
    updateSidebarMarkets(items);
  }

  function renderTicker(items) {
    const track = document.querySelector('.ticker-track');
    if (!track) return;
    const seen = new Set();
    const unique = [];
    for (const coin of items) {
      const key = String(coin.symbol || '').toUpperCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(coin);
      }
    }
    const html = unique.map(coin => `
      <span class="ticker-item">${escapeHtml(coin.symbol)} <span class="ticker-price">${escapeHtml(coin.price)}</span></span>
      <span class="ticker-dot" aria-hidden="true"></span>
    `).join('');
    track.innerHTML = html + html;
  }

  function initFilterBar() {
    if (!filterBar) return;
    filterPills.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter || 'all';
        location.hash = filter === 'all' ? '' : filter;
        setActivePill(filter);
        const cached = getNewsCache();
        if (cached && cached.articles) renderArticles(cached.articles, filter);
      });
    });

    window.addEventListener('hashchange', () => {
      const filter = getFilter();
      setActivePill(filter);
      const cached = getNewsCache();
      if (cached && cached.articles) renderArticles(cached.articles, filter);
    });
  }

  function getNewsCache() {
    try {
      const raw = localStorage.getItem(NEWS_CACHE_KEY);
      if (!raw) return null;
      const cache = JSON.parse(raw);
      if (!cache || !cache.ts || !cache.articles) return null;
      if (Date.now() - cache.ts > NEWS_TTL_MS) return null;
      return cache;
    } catch (e) { return null; }
  }

  function startPolling() {
    loadNews();
    loadTicker();
    setInterval(loadNews, NEWS_TTL_MS);
    setInterval(loadTicker, TICKER_TTL_MS);
  }

  function bootstrap() {
    initFilterBar();
    const cached = getNewsCache();
    if (cached) {
      renderArticles(cached.articles, getFilter());
      updateLiveBadge(cached.mode);
    } else {
      loadNews();
    }

    loadTicker();
    startPolling();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
