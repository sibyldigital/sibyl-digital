# Sibyl Digital

Personal portfolio site for Zan Dean (Business Analyst & Systems Designer). Static site, hand-authored HTML/CSS, hosted on GitHub Pages. Rebuilt from the original Wix Studio version.

## Structure

```
sibyl-digital/
  index.html        Home: hub with the throughline, three pillar cards, and flagship projects
  about.html        About: throughline statement, three pillars, testimonials, deep dive
  portfolio.html    Tag-filterable work grid (filter by pillar)
  contact.html      Contact details + form
  work/             Portfolio case-study detail pages
    gardens-of-eatin.html      (flagship, DRAFT)
    black-koi.html             (flagship, DRAFT)
    crafted-for-community.html (flagship)
    dream-to-print.html        (flagship)
    structure-with-spark.html
    busy-bees.html
    mojo-in-motion.html
    retro-refined.html
    first-ladies-final-draft.html
    moving-with-heart.html     (Move It or Lose It, logo build)
    timeless-events.html       (81 Broadway, logo build)
    insert-coin-for-chaos.html (Butter Boy, logo build)
  css/style.css     All styles (palette + type tokens at the top)
  js/main.js        Mobile nav + contact form + portfolio pillar filter
  images/           Drop real images here (see notes)
  .nojekyll         Tells GitHub Pages to serve files as-is (no Jekyll build)
```

## Portfolio structure (four pillars + Logo tag)

Projects are organized by tag, not folder. Each carries one or more tags and shows up under every tag it holds. The portfolio filter reads `?pillar=business|marketing|visual|system|logo`, so the home-page pillar links land pre-filtered.

Four pillars (these appear as the "What I Do" cards on Home and About):

- **Business & Operations Analytics** (`business`, green chip)
- **Marketing & Communications** (`marketing`, rose chip)
- **Visual Design** (`visual`, slate chip)
- **System Design** (`system`, teal chip)

Plus one filter-only tag:

- **Logo** (`logo`, plum chip) for the logo/character builds. Not a pillar card, just a filter.

Split rule for Visual vs System: Visual = brand, identity, logo, graphic, environmental, and the look of sites; System = architecture, CMS/backend, workflow, automation, and operational/data systems. Sites built end to end carry both.

To add a project: add a `.card` with `data-pillars="..."` and matching `.tag` chips to `portfolio.html`, then create its `work/<slug>.html` page. To retag: edit the `data-pillars` attribute and the chips.

## Home page sections

Home is a hub in five sections: (1) professional summary/intro with the throughline, (2) the four pillars, (3) a "learn more about me" teaser linking to About, (4) flagship projects, (5) a closing contact CTA. Nav is Home / About / Portfolio + the Let's Connect button (Contact is reachable via the CTA button, not a nav link).

## Run locally

```bash
python -m http.server 8000 --directory .
```

Then open http://localhost:8000

## Deploy to GitHub Pages

1. Create a new repo (e.g. `sibyl-digital`) and push these files.
2. Repo Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/root`.
3. Site publishes at `https://<username>.github.io/sibyl-digital/`.

### Custom domain

1. Add a `CNAME` file at the repo root containing only the domain (e.g. `sibyldigital.com`).
2. Settings > Pages > Custom domain: enter the domain.
3. At the DNS host (SiteGround, etc.), point the domain at GitHub Pages:
   - Apex domain: four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `www` subdomain: a `CNAME` record to `<username>.github.io`.
4. Enable "Enforce HTTPS" once the certificate provisions.

## Notes / to-do

- **Images:** the About designer photo and Portfolio project covers are placeholder blocks. Upload real images to `images/` and swap the `.ph` placeholder `<div>`s for `<img>` tags.
- **Contact form:** GitHub Pages is static and cannot process form submissions. The current form opens the visitor's mail client (mailto). For a real inbox submission, wire it to a form backend (Formspree, Basin, or similar) by changing the form `action`.
- **DRAFT flagships:** `gardens-of-eatin.html` and `black-koi.html` are drafted from Zan's spec with no invented metrics. Each has an inline `[Draft note for Zan]` and an HTML comment. Fill in real specifics, tools, timelines, and results before publishing.
- **"View the Site" buttons** on 6 case studies (Structure with Spark, Retro Refined, First Ladies, Moving with Heart, Dream to Print, Timeless Events) link to `#`. Replace with the real live client URLs.
- **Typos fixed** from the original copy: home page (ANSLYSIS, DOCUMENTAITON, SYSTEMD, "and and"); case studies (IDENTITYy, ACQUISTION, ENGAGMENT).
- **Em-dashes** in the original portfolio copy were replaced with commas/colons/periods to match the site's writing style.
- **Name check:** the About page testimonial cites "Hallie Gray, Graymarket Designs"; the Craft Party case study cites "Holly Gray." Confirm whether these are the same person.
- **Positioning:** Home reads as Business Analyst, About + portfolio read as creative/brand designer. This is the restructuring conversation to have next: how to section skills so the BA and creative sides both land.
