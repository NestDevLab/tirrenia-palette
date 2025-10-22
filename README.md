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
- **Copy to clipboard** – Each swatch exposes a “copy” button that writes the hex value to the clipboard and provides transient feedback.
- **PDF export** – A “Download PDF” button triggers `html2canvas` + `jspdf` to capture the full page and export `palette-campania-tradition.pdf`.
- **Responsive layout** – Tailwind utility classes ensure the layout adapts from mobile to desktop, with sticky imagery for larger viewports.

## Project structure

```
workspaces/tirrenia-palette/
├── assets/          # Palette imagery referenced by the UI
├── index.html       # Entry HTML (includes Tailwind + PDF libraries)
├── index.tsx        # React app with palette data and components
├── metadata.json    # App metadata (used by hosting environments)
├── package.json     # Scripts and dependency manifest
├── tsconfig.json    # TypeScript configuration
└── vite.config.ts   # Vite build configuration
```

## Customisation tips
- Update palette colours or notes inside `paletteData` in `index.tsx`. Each item defines `name`, `hex`, and optional `note`.
- Replace imagery by dropping new assets into `assets/` and updating the `imageUrl` fields.
- Tailwind classes are injected via CDN; adjust them directly in JSX or add custom styles inside `<style>` blocks in `index.html` if needed.
- PDF export hides the download button during capture (see `handleDownloadPdf` in `index.tsx`); extend this function if you want to exclude other elements.

## Deployment
The default Vite build emits static assets to `dist/`. Host them behind any static file server or CDN. Remember that the app loads Tailwind/`html2canvas`/`jspdf` from public CDNs; if offline operation is required, vendor those scripts locally and update the `<script>` tags in `index.html`.
