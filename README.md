# Oceanographer Gaurav

Personal website for Gaurav Madan, physical oceanographer. Plain HTML, CSS and
vanilla JavaScript. No build step, no framework, no dependencies. Hosted free
on GitHub Pages.

The design conceit: the page is a water column. The surface is light, and each
section descends into darker water. A depth rail on the left tracks your scroll
position. Research sits at 1000 m, as it should.

---

## Launching this site, step by step

### 1. Create the repository

Go to https://github.com/new and create a repository named exactly:

```
gauravmadan.github.io
```

Replace gauravmadan with your actual GitHub username. This exact naming is
what tells GitHub "this repo is my website". Set it to **Public** (Pages is
free for public repos). Do not initialise with a README since you already
have one here.

### 2. Push these files

From inside this folder on your machine:

```bash
git init
git add .
git commit -m "Launch: oceanographer website v1"
git branch -M main
git remote add origin https://github.com/gauravmadan/gauravmadan.github.io.git
git push -u origin main
```

If you prefer zero terminal: on the empty repo page, click
"uploading an existing file" and drag this whole folder's contents in.

### 3. Enable GitHub Pages

Usually automatic for a `username.github.io` repo, but verify:

1. Repo page > **Settings** > **Pages** (left sidebar)
2. Under "Build and deployment", Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**. Save.

### 4. Visit your site

Wait one to two minutes, then open:

```
https://gauravmadan.github.io
```

Done. Every future `git push` to main redeploys automatically within a
minute or so.

### 5. Optional: custom domain

Buy a domain (roughly 10 to 15 GBP per year from Namecheap, Cloudflare, etc),
then in Settings > Pages add it under "Custom domain" and follow GitHub's DNS
instructions (a CNAME record pointing to gauravmadan.github.io). Tick
"Enforce HTTPS" once the certificate provisions.

---

## Customising

Everything editable is marked with comments in the files.

| What | Where |
|---|---|
| Menu bar links | `index.html`, look for "ADD MORE MENU LINKS HERE" |
| All text content | `index.html`, each section is clearly labelled |
| Publications | `index.html`, duplicate the `<li>` template in the pub list |
| Every colour | `css/style.css`, the `:root` block at the top |
| Fonts | Swap the Google Fonts link in `index.html` and the `--serif` / `--mono` variables |
| Depth labels | The `data-depth` attribute on each `<section>` and the eyebrow text |
| Email and social links | The Contact section in `index.html` |

### Adding a new page

Create `photography.html` (copy `index.html` as a skeleton), push it, and it
appears at `https://gauravmadan.github.io/photography.html`. Link it from
the menu bar.

### Adding images

Drop files into `assets/` and reference them:

```html
<img src="assets/your-photo.jpg" alt="Describe the photo">
```

Keep individual images under about 500 KB (export at 1600 to 2000 px wide,
80 percent JPEG quality) so the site stays fast.

---

## Local preview

Open `index.html` in a browser directly, or for a proper local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

```
index.html        the whole site
css/style.css     water-column styling, all colours in :root
js/main.js        depth rail tracking + mobile menu
assets/           put images here
.nojekyll         tells GitHub Pages to serve files as-is
```
