# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A scrollytelling React SPA for sharing a trip with guests. As the user scrolls, a fixed Mapbox map pans/zooms to each chapter's location while a narrative card animates in on the left.

The setup is identical to `~/dev/JudkinsParkForPeople/app` — refer to that project for a mature reference implementation.

## Commands

All commands run from `app/`:

```bash
npm run dev      # start Vite dev server
npm run build    # production build → dist/
npm run preview  # serve production build locally
npm test         # run Vitest (vitest --run)
npm run lint     # ESLint
```

## Architecture

```
app/
├── src/
│   ├── App.jsx          # Main component: fixed map + Scrollama story track
│   ├── chapters.js      # Vite glob loader — reads all chapters/*/content.md
│   ├── index.css        # Tailwind v4 + mapbox-gl CSS imports
│   ├── main.jsx         # React entry point
│   └── setupTests.js    # Vitest: mocks mapbox-gl, react-map-gl, react-scrollama
└── chapters/
    └── 01-intro/
        └── content.md   # YAML frontmatter + Markdown body
```

**No TypeScript.** Pure JSX with `@vitejs/plugin-react`. Tailwind v4 via `@tailwindcss/vite` (no tailwind.config.js needed).

### Chapter Format

Each chapter is `chapters/NN-slug/content.md` with YAML frontmatter:

```yaml
---
id: unique-id
type: intro          # "intro" renders IntroCard; anything else renders ChapterCard
title: Chapter Title
subtitle: Optional label shown above title
icon: Mountain       # lucide-react icon name (see ICON_MAP in chapters.js)
color: '#16a34a'     # hex color for icon background and subtitle text
mapState:
  longitude: -122.3
  latitude: 47.6
  zoom: 13
  pitch: 45
  bearing: -20
marker:              # optional — renders a colored dot on the map
  longitude: -122.3
  latitude: 47.6
mapStates:           # optional — multi-leg flyTo animation (overrides mapState)
  - longitude: -122.3
    latitude: 47.6
    zoom: 10
    pitch: 0
    bearing: 0
  - longitude: -122.31
    latitude: 47.61
    zoom: 15
    pitch: 45
    bearing: -30
photos:              # optional — renders a before/after PhotoSlider
  - src: filename.jpg
    alt: Caption shown on image
  - src: filename2.jpg
    alt: Other caption
---

Markdown body here. Supports **bold**, *italic*, [links](url), and inline images.
```

**Available icons** (defined in `chapters.js` ICON_MAP): `Navigation`, `MapPin`, `Mountain`, `Waves`, `Utensils`, `Camera`, `Tent`, `Bike`, `Plane`, `Star`. Add more lucide icons by importing and adding to `ICON_MAP`.

### Scrollytelling Flow

- `Scrollama` triggers `onStepEnter` / `onStepExit` at 50% viewport offset
- On enter: `mapRef.current.flyTo()` animates to the chapter's `mapState` (1800ms) or chains multiple `mapStates` legs (800ms first, 3000ms each subsequent)
- `isReturningRef` suppresses intermediate card flashes when "Return to start" smooth-scrolls back to top
- Map style: `mapbox://styles/mapbox/outdoors-v12` (good for travel/nature)

### Environment

Mapbox token via `VITE_MAPBOX_ACCESS_TOKEN` in `.env` (see `.env.example`). Never committed.
