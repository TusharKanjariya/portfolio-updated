# Tushar Kanjariya — Portfolio

A dependency-free personal portfolio built with semantic HTML, modern CSS, and a small amount of vanilla JavaScript.

## Run locally

```powershell
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Files

- `index.html` — site content and structure
- `styles.css` — responsive visual system and motion
- `script.js` — mobile navigation, scroll reveals, header behavior, and contact email handoff
- `assets/` — locally stored profile, certification, and portfolio images

The site can be deployed directly to GitHub Pages, Netlify, Vercel, or any static host.

## SEO and profile maintenance

The site includes canonical metadata, crawl directives, social preview metadata, `ProfilePage`/`Person`/`WebSite` JSON-LD, `robots.txt`, `sitemap.xml`, and visible professional trust signals.

When making a substantial content update:

1. Update `dateModified` in the JSON-LD inside `index.html`.
2. Update `<lastmod>` in `sitemap.xml`.
3. Keep job history, certification status, article URLs, and public profile links factually current.
4. After deployment, test the public URL with Google Rich Results Test and URL Inspection.
5. Submit `https://tusharkanjariya.me/sitemap.xml` in Google Search Console.

Do not add claims, reviews, ratings, clients, awards, or experience metrics unless they can be verified publicly or supported with direct evidence.
