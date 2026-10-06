# images

All site images live in this folder. This guide covers how to add them and how to point the pages at them.

## 1. Add the image files

Two ways:

- **Local (recommended):** copy your files into this `images/` folder, then commit and push:
  ```bash
  git add images
  git commit -m "Add portfolio images"
  git push
  ```
- **GitHub web:** on the repo page, open the `images` folder, click **Add file > Upload files**, drag the images in, and commit.

## 2. Size and format

- **Format:** `.jpg` for photos, `.png` or `.svg` for logos/graphics with flat color or transparency.
- **Size:** export covers around **1600px** on the long edge, portraits around **1200px**. Compress them (TinyPNG, Squoosh, or your editor's "export for web") so each file is ideally under ~400KB. Big files make the site slow.
- **Filenames:** lowercase, hyphens, no spaces. The name is arbitrary; it only has to match the `src` you write in the tag. Suggested names are in the table below.

## 3. Swap a placeholder for an image

Every image spot is currently a gray placeholder `<div>`. Replace the whole `<div ...>...</div>` with an `<img>`. There are three patterns. Watch the path: pages in the `work/` folder need `../images/`, pages at the root need `images/`.

**A. Card cover** (on `portfolio.html` and the flagship cards in `index.html`) — root path:
```html
<!-- replace this -->
<div class="ph ph--wide" aria-label="Placeholder cover image">Cover (upload)</div>
<!-- with this -->
<img class="media media--wide" src="images/gardens-of-eatin.jpg" alt="Gardens of Eatin' website redesign" />
```

**B. Case-study hero** (on `work/<slug>.html`) — note the `../`:
```html
<!-- replace this -->
<div class="ph ph--wide" aria-label="Placeholder for project cover image">Project imagery<br />(upload)</div>
<!-- with this -->
<img class="media media--wide" src="../images/gardens-of-eatin.jpg" alt="Gardens of Eatin' website redesign" />
```

**C. Portrait** (the `about.html` designer photo and the `index.html` "Learn More" photo) — root path:
```html
<!-- replace this -->
<div class="ph" aria-label="Placeholder for designer photo">Designer photo<br />(upload hi-res)</div>
<!-- with this -->
<img class="media media--portrait" src="images/about-portrait.jpg" alt="Zan Dean" />
```

**D. Case-study gallery** (the "Gallery" grid near the bottom of each `work/<slug>.html`) — note the `../`. Each page starts with 6 placeholder tiles; swap each one, delete any you don't need, or copy a line to add more:
```html
<!-- replace this -->
<div class="ph gallery__item" aria-label="Placeholder gallery image">Image 1<br />(upload)</div>
<!-- with this -->
<img class="media gallery__item" src="../images/black-koi/pond-build-01.jpg" alt="Waterfall install in progress" loading="lazy" />
```
Tiles are cropped to 4:3 in the grid, and clicking one opens the full, uncropped image in a lightbox (arrow keys to browse, Esc to close). Optional extras:
- Add `gallery__item--wide` to the class list to make a tile span two columns (good for a hero shot).
- Add `data-full="../images/black-koi/pond-build-01-large.jpg"` to show a bigger file in the lightbox than in the grid.
- Gallery images can go in a subfolder per project (`images/black-koi/...`) to keep things tidy. The `alt` text doubles as the lightbox caption.

The `.media` / `.media--wide` / `.media--portrait` classes (in `css/style.css`) handle sizing, cropping, and the rounded border, so every image lands consistent.

## 4. Where each image goes (suggested filenames)

| Spot | File to edit | Suggested image name |
| --- | --- | --- |
| Designer photo | `about.html` | `about-portrait.jpg` |
| "Learn More" photo | `index.html` | `home-portrait.jpg` (can reuse the About photo) |
| Gardens of Eatin' | `portfolio.html` + `index.html` card, `work/gardens-of-eatin.html` hero | `gardens-of-eatin.jpg` |
| Black Koi | `portfolio.html` + `index.html` card, `work/black-koi.html` hero | `black-koi.jpg` |
| Craft Party | `portfolio.html` + `index.html` card, `work/crafted-for-community.html` hero | `crafted-for-community.jpg` |
| Remedy Rising | `portfolio.html` card, `work/dream-to-print.html` hero | `dream-to-print.jpg` |
| Tesio Energy | `portfolio.html` card, `work/structure-with-spark.html` hero | `structure-with-spark.jpg` |
| PBMA | `portfolio.html` card, `work/busy-bees.html` hero | `busy-bees.jpg` |
| Mojo Coworking | `portfolio.html` card, `work/mojo-in-motion.html` hero | `mojo-in-motion.jpg` |
| A-Escape | `portfolio.html` card, `work/retro-refined.html` hero | `retro-refined.jpg` |
| First Ladies | `portfolio.html` card, `work/first-ladies-final-draft.html` hero | `first-ladies.jpg` |
| Move It or Lose It | `portfolio.html` card, `work/moving-with-heart.html` hero | `moving-with-heart.jpg` |
| 81 Broadway | `portfolio.html` card, `work/timeless-events.html` hero | `timeless-events.jpg` |
| Butter Boy | `portfolio.html` card, `work/insert-coin-for-chaos.html` hero | `insert-coin-for-chaos.jpg` |

You can use the same image file for a project's card and its hero, or different crops. The card wants a clean, legible thumbnail; the hero can be more detailed.

## Tip: write good alt text

The `alt=""` text is read by screen readers and shows if an image fails to load. Describe what the image is, e.g. `alt="Mojo Girl window mural"`, not `alt="image"`.

## Current layout

- `<project>NN.webp` (e.g. `mojo07.webp`) are the gallery images. Each case study's Gallery lists them in number order.
- `thumbs/<page-slug>.webp` are 1600x1000 logo thumbnails built from each project's logo. They're used for the portfolio/home cards and the top image of each case study. To change one, overwrite the file (keep 16:10) or point the `src` at a different image.
- Gallery tiles crop to 4:3. Tiles with `gallery__item--contain` (logos, slides, banners) show the whole image padded on its own background color; `gallery__item--top` (full-page website screenshots, documents) crops from the top. In the lightbox, tall screenshots scroll.
- The Mojo page has a **Slide Deck** viewer (above the Gallery) for `mojo23`–`mojo56`. To add a slide, copy a `<img class="deck__slide" ... hidden />` line inside `.deck__frame` and change the `src`/`alt`; slides play in HTML order.
