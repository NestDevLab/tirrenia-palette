# Tirrenia Palette

The Tirrenia Palette workspace is a lightweight React + Vite app that showcases Tirrenia’s colour system. It presents curated palette sections with imagery, allows designers to copy hex codes instantly, and exports the full page as a PDF for offline sharing.

## Prerequisites
- Node.js 20 LTS (any Node ≥18 works with Vite).

## Setup

```bash
cd workspaces/tirrenia-palette
npm install
```

## Scripts

```bash
npm run dev      # Start Vite dev server (http://localhost:5173 by default)
npm run build    # Production build to dist/
npm run preview  # Preview the production build locally
```

The app relies on CDN-hosted Tailwind CSS and PDF helpers (`html2canvas`, `jspdf`) referenced in `index.html`, so no additional setup is required.

## Features
- **Curated sections** – Palette data (`paletteData` in `index.tsx`) is grouped by theme (Earth & Volcano, Sea & Coast, etc.) with contextual imagery from the `assets/` directory.
- **Copy to clipboard** – Each swatch exposes a "copy" button that writes the hex value to the clipboard and provides transient feedback.
- **Logo downloads** – Download buttons allow instant access to brand logos in both PNG (raster) and SVG (vector) formats for use in different contexts.
- **PDF export** – A "Download PDF" button triggers `html2canvas` + `jspdf` to capture the full page and export `palette-campania-tradition.pdf`.
- **Responsive layout** – Tailwind utility classes ensure the layout adapts from mobile to desktop, with sticky imagery for larger viewports.

## Project structure

```
workspaces/tirrenia-palette/
├── assets/          # Palette imagery referenced by the UI
├── index.html       # Entry HTML (includes Tailwind + PDF libraries)
├── index.tsx        # React app with palette data and components
├── src/             # Source files for the palette package (colors.css)
├── dist/            # Built assets for publishing (dist/colors.css)
├── metadata.json    # App metadata (used by hosting environments)
├── package.json     # Scripts and dependency manifest
├── tsconfig.json    # TypeScript configuration
└── vite.config.ts   # Vite build configuration
```

## Palette single source of truth

This workspace publishes a canonical CSS file containing only color custom properties at `dist/colors.css` (source at `src/colors.css`).

- Treat `@tirrenia/palette` as the single source of truth for colors.
- Other workspaces should consume the palette via npm and reference variables, e.g.

```css
@import 'node_modules/@tirrenia/palette/dist/colors.css';
body { background: var(--tirrenia-app-background, #F2F0E9); }
```

When updating colors, edit `src/colors.css`, build the workspace (`npm run build`), then bump the package version and re-install the package in consuming workspaces.

## Using the logos

The palette page displays official brand logos for Tirrenia and Caffè al Banco, available in both formats:

### Available logo files
Located in `assets/`:
- **Tirrenia**: `logo-tirrenia.png` (raster) and `logo-tirrenia.svg` (vector)
- **Caffè al Banco**: `logo-caffe-al-banco.png` (raster) and `logo-caffe-al-banco.svg` (vector)
- **Caffè al Banco (logo-only)**: `logo-caffe-al-banco-logo-only.svg` (icon variant without text)

### When to use PNG vs SVG
- **PNG format**: Use for social media profiles, email signatures, PowerPoint presentations, or anywhere raster images are required. PNGs have a fixed resolution but work universally.
- **SVG format**: Preferred for web applications, print materials, and scalable contexts. SVGs are vector-based, infinitely scalable without quality loss, and can be styled with CSS.

### Download from the palette page
Each logo on the palette page has dedicated **PNG** and **SVG** download buttons directly below the image preview. Click the appropriate button to download the format you need.

### Usage guidelines
- Use logos on backgrounds that provide sufficient contrast (refer to the color palette for brand-compliant combinations)
- Maintain aspect ratio when resizing
- For Tirrenia logo, prefer **Capri Blue** (`#0F5D84`) or **Tyrrhenian Blue** (`#2A6FA9`) as accent colors
- For Caffè al Banco logo, use **Coffee Brown** (`#8A5B36`) or **Dark Espresso** (`#3B2C28`) for complementary elements

## Customisation tips
- Update palette colours or notes inside `paletteData` in `index.tsx`. Each item defines `name`, `hex`, and optional `note`.
- Replace imagery by dropping new assets into `assets/` and updating the `imageUrl` fields.
- Tailwind classes are injected via CDN; adjust them directly in JSX or add custom styles inside `<style>` blocks in `index.html` if needed.
- PDF export hides the download button during capture (see `handleDownloadPdf` in `index.tsx`); extend this function if you want to exclude other elements.

## Deployment
The default Vite build emits static assets to `dist/`. Host them behind any static file server or CDN. Remember that the app loads Tailwind/`html2canvas`/`jspdf` from public CDNs; if offline operation is required, vendor those scripts locally and update the `<script>` tags in `index.html`.
