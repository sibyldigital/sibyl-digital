# Soul Activism

Static rebuild of the Soul Activism Wix Studio site (`sibyldigital.wixstudio.com/soul`) for GitHub Pages at **soulactivism.com**. Hand-authored HTML/CSS, no build step, no Wix scripts.

## Structure

URLs match the Wix site, so existing links and search results keep working.

```
index.html                      Home
about/                          About Zan Dean + certifications + FAQ
course/                         Psychic Development Course + curriculum
offerings/                      All services
consult/                        Intuitive business consulting
connect/                        Contact form
blog/                           Post index
post/<slug>/                    8 blog posts
service-page/<slug>/            Service detail pages (start-here-… redirects to soul-activism)
policies-and-terms/             Disclaimer, refund, accessibility, terms, privacy (anchor links)
404.html                        Not-found page
css/style.css                   All styles (palette + fonts at the top)
js/main.js                      Mobile menu + contact form mailto fallback
images/                         All site images, downloaded from Wix and converted to WebP
CNAME                           soulactivism.com
.nojekyll                       Serve files as-is
```

Pages use root-relative links (`/css/style.css`), so the site must be served from the domain root (a custom domain or a `<user>.github.io` repo), not a project subpath.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy (new repo + custom domain)

GitHub Pages allows one custom domain per repository, so this site needs its own repo:

1. Create a new repo (e.g. `sibyldigital/soulactivism`) and push the **contents** of this folder to its root on `main`.
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Settings → Pages → Custom domain: `soulactivism.com` (the `CNAME` file is already here).
4. At the DNS host for soulactivism.com:
   - Apex: four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: `CNAME` → `sibyldigital.github.io`
5. Tick "Enforce HTTPS" once the certificate is issued.

## What changed from the Wix version

- **Booking:** Wix Bookings doesn't exist on a static host. "Book Now" on each service opens an email to info@soulactivism.com with the service name in the subject. Swap in a scheduler link (Calendly, Square, Acuity, PayPal) when ready.
- **Contact form:** opens the visitor's mail client. For real inbox delivery, set the form's `action` to a form backend (Formspree, Basin) in `connect/index.html`.
- **Fonts:** Questrial and Sora (same as Wix). The Wix signature script font is replaced with Google's *Mrs Saint Delafield*.
- **Wix template placeholder text** on the Consult page ("This is the space to introduce visitors…", "Let the writing speak for itself…", "Service Title") was left out.
- Small typo fixes: "a expert" → "an expert", "spiritaul", "lifeblocks", "Intutive", "Level 1, 11, 111" → "I, II, III".

## To review

- **Price mismatch:** Home says "For just USD 300" but the reading is listed at **$200**. Kept as on Wix; confirm which is right.
- **Course length:** one paragraph said "six-week program"; everything else says eight weeks. Changed to eight; confirm.
- **Policies** reference `www.soulactivism.org` (the new domain is `.com`), and Terms §2 contains a leftover `[Business Name]` placeholder. Kept verbatim since it's legal text; update when you're ready.
- **Cancellation terms differ:** service pages say late cancellations forfeit 100%; the Refund Policy says 50%.
- The 988 Suicide & Crisis Lifeline (call/text 988) has replaced the 1-800-273-8255 number listed in the policies.
