# Will Finlay Photography — Website Maintenance Guide

A Hugo photography portfolio hosted on GitHub Pages. This guide is written for occasional updates: adding photographs, arranging albums, changing covers, and publishing.

## Quick reference

| What you want to do | Where to make the change |
| --- | --- |
| Add, remove, or reorder photos in an album | `content/portfolio/travel/<album>/` or `content/portfolio/live-music/<album>/` |
| Change an album's cover photo | `cover` in that album's `index.md` |
| Feature an album on the homepage | `featured: true` in its `index.md` |
| Control homepage feature order | `featured_order` in its `index.md` |
| Change an album's displayed name | `title` in its `index.md` |
| Change the About page | Content under `content/about/` (locate its existing Markdown file) |
| Change gallery layout or navigation | Hugo templates in `layouts/`, styles in `assets/`, and JavaScript in `assets/js/main.js` |

## How the pages fit together

```text
Homepage  /
  Five selected featured albums, in a custom responsive layout
  (selected from either Travel or Live Music)

Portfolio  /portfolio/
  All albums from Travel and Live Music together, A–Z

Travel  /portfolio/travel/
  Travel albums only, A–Z

Live Music  /portfolio/live-music/
  Live Music albums only, A–Z

Individual album  /portfolio/travel/<album>/
               or /portfolio/live-music/<album>/
  Photos within that album, in filename order
```

An **album** is one folder with its own `index.md` and image files. You maintain each album only once. The Portfolio and category pages automatically link to it; the homepage displays it only when you mark it as featured. Clicking the **WILL FINLAY PHOTOGRAPHY** wordmark goes to the homepage; clicking **Portfolio** goes to the full album index. Travel and Live Music are also available through its submenu.

**Layouts:** The homepage has its own five-tile featured grid. Portfolio, Travel, and Live Music show album cover images in justified rows. Inside each album, the photos also appear in justified rows, and clicking a photo opens a lightbox. These layouts adapt to browser width.

## 1. Add photos to an existing album

1. Open the appropriate album folder, e.g. `content/portfolio/travel/arizona/`.
2. Export the new images for the web (see **Photo sizing** below).
3. Copy the images into the folder **alongside `index.md`**, not into a separate subfolder.
4. Give each file a numeric prefix reflecting where it should appear, e.g. `01-canyon.jpg`, `02-trail.jpg`, `03-sunset.jpg`.
5. Preview locally, check the order and lightbox, then publish.

You do **not** need to add each image to `index.md`. Hugo reads the image resources from the album folder.

## 2. Change the order of photos in an album

The intended photo order is controlled by **filenames**, not by `weight` or by the order files appear in Finder.

Example:

```text
01-opening-shot.jpg
02-close-up.jpg
03-wide-landscape.jpg
04-final-shot.jpg
```

To move the final shot into second position, rename the files so the prefixes become `01`, `02`, `03`, `04` in your desired order. Use consistent zero-padded prefixes (`01`–`09`, then `10`, etc.). If you have 100+ images, use three digits (`001`, `002`, etc.).

**Important verification:** The gallery template should explicitly sort images by resource name/filename. If images appear out of sequence despite their prefixes, inspect the `range` statement in the gallery-specific `single.html`: relying on the default resource order may not guarantee the intended sequence. Test the order in the local preview before publishing.

## 3. Change the featured/cover photo for an album

Open that album's `index.md` and change `cover` to the **exact filename** of a photo in the same folder:

```yaml
---
title: "Arizona"
date: 2024-06-01
cover: "03-wide-landscape.jpg"
---
```

The cover is what visitors see for that album on Portfolio, Travel, and Live Music. The homepage normally uses the same cover unless you have configured a separate `homepage_cover` field in your homepage template.

If `cover` is missing, the gallery-grid template is designed to fall back to the first available image; explicitly specifying a cover is more reliable. Check capitalization, extension (`.jpg` vs `.JPG`), and spelling if a cover doesn't appear.

## 4. Add or remove an album from the homepage

Open the album's `index.md` and add:

```yaml
featured: true
featured_order: 1
```

- `featured: true` makes it eligible for the homepage.
- `featured: false` (or omitting the field) keeps it off the homepage, **without removing it** from Portfolio or its category.
- `featured_order: 1` places it before albums with larger manual order numbers (`2`, `3`, etc.).
- Featured albums without a `featured_order` follow manually ordered ones and are sorted by their `date`, newest first.
- The homepage template displays **only the first five** featured albums. If you mark six or more, some won't appear.

For predictable results, designate exactly **five** albums and give each a unique `featured_order` from `1` through `5`. To swap their positions, change those numbers; don't rename folders. Remove an old album's `featured: true` when replacing it with a new feature.

Example complete front matter:

```yaml
---
title: "Arizona"
date: 2024-06-01
cover: "03-wide-landscape.jpg"
featured: true
featured_order: 2
---
```

**Optional homepage-only cover:** If your current `layouts/index.html` includes support for `homepage_cover`, you can set `homepage_cover: "another-photo.jpg"` to use a different image in the homepage grid. If the template does not reference this field, adding it alone will have no effect.

## 5. Create a new album

1. Choose the category: `content/portfolio/travel/` or `content/portfolio/live-music/`.
2. Create a new lowercase, hyphenated folder, e.g. `content/portfolio/travel/hawaii/`.
3. Create `index.md` inside it:

   ```yaml
   ---
   title: "Hawaii"
   date: 2026-10-18
   cover: "01-beach.jpg"
   featured: false
   ---
   ```

4. Add your numbered photo files to the same folder.
5. Preview the category page, Portfolio page, and individual album.
6. If you want it on the homepage, set `featured: true` and optionally `featured_order` as described above.

New albums automatically appear on their category page and on Portfolio. Those indexes are sorted alphabetically by the album's **displayed `title`**, not by folder name or `weight`. The gallery Previous/Next pager was also changed to follow alphabetical album titles.

**Older instructions mentioned `weight`:** It is no longer needed to control album order in the current alphabetical setup. You can leave existing `weight` fields in place, but don't rely on them for sorting.

## 6. Rename an album or category

To change an album's visible name without changing its URL, edit `title` in its `index.md`.

Renaming a folder **does change its URL**. For example, moving an album from `events` to `live-music` changes its address. If you rename a published folder, consider adding a Hugo `aliases` entry in the album's front matter for the old URL, so existing bookmarks and shared links continue to work:

```yaml
aliases:
  - /portfolio/events/example-album/
```

The category previously called **Events** is now **Live Music**, with content in `content/portfolio/live-music/`. Do not create new albums under the old `events` path.

## 7. Photo sizing and exports

Do not add full-resolution camera originals directly to the repository. Hugo processes photos during builds, but very large sources make builds slower and enlarge Git history.

- Export at roughly **2000–2500 pixels on the long edge**.
- JPEG quality around **80–85%** is a practical starting point.
- Keep your full-resolution originals backed up separately.
- Check orientation, color, and any watermark before uploading.
- Both portrait and landscape photos are supported; justified rows preserve their proportions in the layout.

## 8. Edit the About page

Find the existing About content under `content/about/` and edit its Markdown/front matter. (The older README referenced `content/about.md`; the newer site structure uses an About folder.) Preview the result on both desktop and mobile widths.

## 9. Preview changes locally

Open Terminal and change into the Hugo project folder. Type `cd ` (including the space), drag the `Will-Finlay-Photography-main` folder into Terminal to insert its full path, then press Return.

Start the preview server:

```bash
hugo server -D
```

Open **http://localhost:1313/** in your browser. Saved edits should update automatically. Keep Terminal open while previewing; press **Control+C** to stop the server.

Before publishing, check: homepage has five intended covers in the right order; Portfolio and category albums are alphabetical; new images appear in the desired order; cover links and lightbox work; mobile menu and layouts work at narrow widths.

## 10. Publish to GitHub Pages

From the project folder in Terminal, run each command separately:

```bash
git status
git add .
git commit -m "Update photo galleries"
git pull --rebase
git push
```

`git status` lets you inspect changes before committing. `git pull --rebase` integrates any newer remote commits before pushing; if Git reports conflicts, **resolve them before continuing** rather than force-pushing. If no changes were made, Git may report that there's nothing to commit.

Pushing to `main` triggers the GitHub Actions build/deployment workflow at `.github/workflows/hugo.yml`. Check the repository's **Actions** tab for a successful run, then refresh the live site. Deployment may take a few minutes.

## 11. Troubleshooting

| Problem | What to check |
| --- | --- |
| New photo doesn't appear | Is it in the correct album folder beside `index.md`? Is it a supported image file? |
| Photos are in the wrong order | Check zero-padded filenames and verify that the gallery template explicitly sorts by filename. |
| Wrong album cover | Verify the `cover` filename exactly matches a file in the album folder. |
| Album missing from homepage | Check `featured: true`, the five-album limit, and `featured_order`. |
| Album missing from Portfolio/category | Check that its folder is under `content/portfolio/travel/` or `content/portfolio/live-music/`, with a valid `index.md`. |
| Changes don't show locally | Check the Hugo Terminal output for template errors; save the file and reload the page. |
| Git push rejected | Run `git pull --rebase`, resolve any conflicts, then `git push`. Don't use `--force` as a routine fix. |
| Live site didn't update | Check GitHub Actions status, then refresh or hard-refresh the page. |
| Images look cropped in the lightbox | Check the GLightbox-specific styles in `main.css`; thumbnail styling should not control the full-size viewer. |

## Key files (only if you need to change the design)

- `layouts/index.html` — homepage featured-album selection and markup.
- `layouts/partials/gallery-grid.html` — album covers on Portfolio, Travel, and Live Music.
- Gallery-specific `single.html` — photos within each album and Previous/Next navigation.
- `layouts/partials/header.html` — wordmark, navigation, and submenu button.
- `assets/js/main.js` — navigation behavior, justified-row layout, and GLightbox initialization.
- `assets/` CSS (typically `main.css`) — responsive layouts, image presentation, and hover styling.
- `hugo.toml` — site configuration and navigation URLs.

**Occasional-maintenance tip:** Most updates should require editing only an album folder and its `index.md`. Avoid changing templates, CSS, or JavaScript unless you intentionally want to change how the site behaves.
