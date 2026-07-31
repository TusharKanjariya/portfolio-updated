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
- `analytics.js` — consent-aware GA4 loading and privacy-safe interaction events
- `assets/` — locally stored profile, certification, and portfolio images

The site can be deployed directly to GitHub Pages, Netlify, Vercel, or any static host.

## Automatic Medium posts

The recent-writing cards are generated from Tushar's official Medium RSS feed by `scripts/update-medium-posts.mjs`.

- `.github/workflows/refresh-medium-and-deploy.yml` runs after pushes to `main`, every day at 12:00 AM IST, or manually from the Actions tab.
- The updater keeps the three newest valid posts, removes Medium tracking parameters, escapes feed content, and updates the visible cards plus their Article JSON-LD.
- `sitemap.xml` and the profile `dateModified` value change only when the selected posts change.
- If Medium is unavailable or returns incomplete data, the workflow fails before editing or deploying, leaving the last successful cards live.
- No Medium API token, GitHub secret, package installation, or browser-side RSS request is required.

### One-time GitHub Pages setting

In the GitHub repository, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. Then open **Actions → Refresh Medium posts and deploy** and run the workflow once.

The workflow uses the repository's short-lived `GITHUB_TOKEN` with only the permissions required to update the generated files and deploy GitHub Pages.

## Google Analytics

The site uses the existing GA4 web stream `G-WX015PXD1L`. Analytics loads only after a visitor selects **Allow analytics**, and the footer's **Privacy choices** control lets them change that decision.

Tracked events are limited to contact actions, valid contact-form handoff, Medium article clicks, and professional-profile clicks. Form values, email addresses, phone numbers, and message contents are never sent to Analytics. In GA4, mark `generate_lead` as a key event if contact-form handoffs are a primary outcome.

## SEO and profile maintenance

The site includes canonical metadata, crawl directives, social preview metadata, `ProfilePage`/`Person`/`WebSite` JSON-LD, `robots.txt`, `sitemap.xml`, and visible professional trust signals.

When making a substantial content update:

1. Update `dateModified` in the JSON-LD inside `index.html`.
2. Update `<lastmod>` in `sitemap.xml`.
3. Keep job history, certification status, article URLs, and public profile links factually current.
4. After deployment, test the public URL with Google Rich Results Test and URL Inspection.
5. Submit `https://tusharkanjariya.me/sitemap.xml` in Google Search Console.

Do not add claims, reviews, ratings, clients, awards, or experience metrics unless they can be verified publicly or supported with direct evidence.
