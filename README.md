# TokenWire

Crypto news + live markets. Static site, no build step required.

## Local preview
- `index.html` — news feed
- `markets.html` — live prices + charts

## Deploy
- **Netlify Drop:** drag folder onto https://app.netlify.com/drop
- **Vercel:** `vercel` in the `cryptonews` folder
- **GitHub Pages:** push contents, publish `main` branch

## Data sources
- Prices: CoinGecko public API
- News: curated feeds via CORS proxy, with robust static fallback
- Images: Unsplash assets for editorial visuals

## Beehiiv newsletter
Both pages include a signup form. To activate it:
1. Open Beehiiv → **Publications → Settings**
2. Copy your **Publication ID**
3. In `index.html` and `markets.html`, replace `YOUR_BEEHIIV_PUBLICATION_ID`

## Notes
- Images are placeholders intended for later RSS-based extraction.
- Beehiiv handles double opt-in.
- CoinGecko rate limits apply.
