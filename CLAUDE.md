# CLAUDE.md - Spartan MMA Codebase Guide

## Project Overview

**Spartan MMA** is a static website for a Mixed Martial Arts gym based in Toledo, Spain.
- **Live site:** [www.spartamma.es](https://www.spartamma.es)
- **Hosting:** GitHub Pages (deployed from `main` branch)
- **Language:** Spanish (all UI text, comments, and user-facing content are in Spanish)
- **Template origin:** Built on a Colorlib "Gym" HTML template (see `readme.txt` for license)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (30 pages, flat structure at repo root) |
| Styling | CSS3 + Bootstrap 4.2.1 |
| JavaScript | Vanilla JS (ES5/ES6 mix) + jQuery 3.3.1 |
| Fonts | Google Fonts (Muli, Oswald), Font Awesome 4.7.0, Flaticon |
| Build system | None - no bundler, no package.json, no npm |
| Testing | None - no test framework or test files |
| CI/CD | None - direct push to `main` deploys via GitHub Pages |
| Large files | Git LFS for `*.mp4` files (see `.gitattributes`) |

## Directory Structure

```
Spartan-MMA/
├── index.html              # Homepage
├── *.html                  # 30 HTML pages at root level
├── CNAME                   # Custom domain: www.spartamma.es
├── .gitattributes          # Git LFS config for .mp4 files
├── readme.txt              # Colorlib template license notice
├── css/
│   ├── style.css           # Main custom stylesheet (~3,845 lines)
│   ├── style2.css          # Additional custom styles
│   ├── auth.css            # Login/registration styles
│   ├── bootstrap.min.css   # Bootstrap 4.2.1
│   ├── font-awesome.min.css
│   ├── flaticon.css
│   ├── owl.carousel.min.css
│   ├── barfiller.css
│   ├── magnific-popup.css
│   └── slicknav.min.css
├── js/
│   ├── main.js             # Core application logic (~530 lines)
│   ├── auth.js             # Client-side auth (~50 lines)
│   ├── jquery-3.3.1.min.js
│   ├── bootstrap.min.js
│   ├── owl.carousel.min.js
│   ├── jquery.magnific-popup.min.js
│   ├── jquery.slicknav.js
│   ├── jquery.barfiller.js
│   └── masonry.pkgd.min.js
├── img/                    # Images, logos, product photos
│   ├── disciplinas/        # Discipline-specific photos
│   ├── blog/               # Product photos (kimonos, etc.)
│   └── gallery/            # Gallery images
├── video/                  # Hero video and promotional clips
├── fonts/                  # Flaticon & Font Awesome web fonts
├── prodCard/               # Reusable product card component (from CodePen)
└── Source/                 # Archived library source ZIPs
```

## Key HTML Pages

### Main
- `index.html` - Homepage with hero video/slider, team, gallery, testimonials
- `team.html` - Instructor profiles
- `gallery.html` - Photo gallery (Masonry layout + Magnific Popup)
- `contact.html` - Contact form and gym info
- `prices.html` - Pricing / tariffs
- `class-timetable.html` - Class schedule with location filtering (Toledo / Limite)

### Disciplines
- `mmaPage.html`, `jjbPage.html`, `grapPage.html`, `kidsPage.html`, `extrasPage.html`

### Store / Products
- `store.html`, `mmaMerch.html`, `marcas.html`
- `prodCard*.html` - Individual product detail pages (various merchandise)

### Account & Legal
- `login.html`, `register.html` - Client-side localStorage auth
- `terminos.html`, `privacidad.html` - Terms and privacy policy

## JavaScript Architecture

### `js/main.js` - Core Logic
All main UI behavior runs inside a jQuery IIFE `(function($) { ... })(jQuery)`:

1. **Preloader** - Fades out on `window.load`
2. **Lazy-loading backgrounds** - Uses `IntersectionObserver` with `data-setbg` attribute; falls back to eager loading
3. **Off-canvas menu** - `.canvas-open` / `.canvas-close` toggle mobile nav
4. **Search modal** - `.search-switch` opens, `.search-close-switch` closes
5. **Masonry gallery** - Initialized on `.gallery` container
6. **QR overlay** - Dynamically injects QR code nav item and overlay for MAAT booking
7. **OWL Carousel sliders** - Hero (`.hs-slider`), Team (`.ts-slider`), Testimonial (`.ts_slider`), Brands (`.brand-carousel`)
8. **Hero video autoplay** - Robust retry logic with visibility/intersection observers
9. **Magnific Popup** - `.image-popup` for images, `.video-popup` for iframes
10. **Barfiller** - Animated skill/progress bars (`#bar1`, `#bar2`, `#bar3`)
11. **Schedule filtering** - `.table-controls` filters by `data-tsfilter` / `data-tsmeta`

Outside the IIFE:
- `fade()` / `unfade()` - Manual opacity animation helpers
- `toledoHorario()` - Location switch for class schedules
- `downloadSchedule()` - Uses html2canvas to export schedule table as PNG

### `js/auth.js` - Authentication
- Client-side only, uses `localStorage` to store users and passwords
- **Not secure for production** - passwords stored in plaintext in localStorage
- Handles both login and registration forms

## CSS Architecture

### `css/style.css` - Primary Stylesheet
- **Primary color:** `#e41c1f` (red)
- **Fonts:** `Muli` (body text), `Oswald` (headings)
- **Layout:** Bootstrap 4 grid + custom sections
- **Responsive breakpoints** follow Bootstrap conventions (576px, 768px, 992px, 1200px)

### `css/style2.css` - Supplementary Styles
- Explanation sections, benefit boxes, column layouts, utility classes

## HTML Page Template Pattern

Every page follows this structure:
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Meta tags, favicon, Google Fonts -->
    <!-- CSS: bootstrap → font-awesome → flaticon → plugins → style.css -->
</head>
<body>
    <!-- Preloader (#preloder) -->
    <!-- Off-canvas mobile menu -->
    <!-- Header with navigation -->
    <!-- Page content sections -->
    <!-- Footer with social links -->
    <!-- JS: jquery → bootstrap → plugins → main.js -->
</body>
</html>
```

## Development Workflow

### Making Changes
1. **No build step required** - Edit HTML/CSS/JS files directly
2. **Preview locally** - Open any `.html` file in a browser, or use a local server:
   ```bash
   python3 -m http.server 8000
   ```
3. **Deploy** - Push to `main` branch; GitHub Pages auto-deploys

### Adding a New Page
1. Copy an existing page (e.g., `mmaPage.html`) as a template
2. Keep the same CSS/JS include order in `<head>` and before `</body>`
3. Maintain the preloader, off-canvas menu, header, and footer sections
4. Update navigation links in both the desktop nav and off-canvas menu

### Adding New Images
- Place images in `img/` (or appropriate subdirectory)
- Use `data-setbg` attribute on elements with class `set-bg` for lazy-loaded backgrounds
- Gallery images should use Masonry-compatible `.gs-item` wrappers

### Adding New Products
- Create a new `prodCard*.html` file following existing product page patterns
- Link from `store.html` or the relevant merchandise page

## Conventions & Best Practices

### Code Style
- JavaScript uses `'use strict'` mode inside the main IIFE
- jQuery is used for DOM manipulation (`$` alias via IIFE parameter)
- CSS class names follow the existing template conventions (BEM-like where applicable)
- HTML uses double-quoted attributes

### Naming
- HTML files: camelCase for discipline/product pages (`mmaPage.html`, `prodCardKimono.html`)
- CSS classes: lowercase with hyphens (`class-timetable`, `hero-section`)
- JavaScript: camelCase for variables and functions

### Content Language
- All user-facing text must be in **Spanish**
- Code comments can be in English or Spanish (existing codebase mixes both)

### Important Considerations
- **No package manager** - Do not add `package.json` or npm dependencies without discussion
- **No build tools** - All files are served as-is; do not introduce webpack, Vite, etc.
- **Bootstrap 4** - Do not upgrade to Bootstrap 5 without a full migration plan
- **jQuery dependency** - Many plugins depend on jQuery 3.3.1; changes affect multiple plugins
- **Git LFS** - Video files (`.mp4`) are tracked with Git LFS
- **CNAME file** - Do not modify; it controls the custom domain routing
- **Colorlib license** - Template copyright in footer must be preserved per `readme.txt`

## Third-Party jQuery Plugins

| Plugin | Selector / Usage | Purpose |
|--------|-----------------|---------|
| OWL Carousel 2 | `.hs-slider`, `.ts-slider`, `.ts_slider`, `.brand-carousel` | Carousels/sliders |
| Magnific Popup | `.image-popup`, `.video-popup` | Lightbox for images/videos |
| SlickNav | `.mobile-menu` | Mobile navigation menu |
| Barfiller | `#bar1`, `#bar2`, `#bar3` | Animated progress bars |
| Masonry | `.gallery` with `.gs-item` | Gallery grid layout |
| html2canvas | Used in `downloadSchedule()` | Schedule table to PNG export |

## Common Tasks

### Update class schedule
Edit `class-timetable.html` - modify the `<table>` inside `#toledo_table`. Each cell uses `data-tsmeta` for location filtering.

### Add a team member
Edit `team.html` - add a new `.ts-slider` item following the existing card pattern with photo, name, and role.

### Update prices
Edit `prices.html` - modify the pricing cards directly in the HTML.

### Add gallery images
Edit `gallery.html` - add new `.gs-item` divs inside the `.gallery` container with `data-setbg` attributes pointing to image paths.
