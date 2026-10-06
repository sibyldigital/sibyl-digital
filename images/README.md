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
