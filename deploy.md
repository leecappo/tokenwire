# deploy.md
## Netlify
Recommended one-liner:
```
npm install -g netlify-cli && netlify init && netlify deploy --prod
```

## Vercel
Recommended one-liner:
```
npm install -g vercel && vercel && vercel --prod
```

## Pre-flight
Suggested build step in package.json:
```
{
  "scripts": { "start": "npx http-server . -p 8000", "build": "cp -R . dist" },
  "engines": { "node": ">=18" }
}
```

## Static publish folder
Root `C:\Users\leedan\Desktop\cryptonews` (
 containing:
- index.html
- markets.html
- app.js
- styles.css
- netlify.toml
- vercel.json
) is the deploy root. No build step required.

## Repo backup
Suggested .gitignore additions:
- __pycache__/
- *.pyc
- .DS_Store
