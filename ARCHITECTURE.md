# Workbench — ARCHITECTURE.md

Last updated: 2026-05-22

---

## Tech Stack

- **Framework:** SvelteKit (Svelte 5 — $props, $state, $derived runes)
- **Styling:** Tailwind CSS v4 + @tailwindcss/forms
- **Backend:** Supabase (auth + SSR client) — wired but lightly used; most data is filesystem-based
- **Build:** Vite 7, TypeScript 5
- **Deployment:** Vercel adapter (nodejs22.x runtime), also runs locally via `vite dev`
- **Fonts:** Geist (npm), Satoshi + Inter (referenced in CSS)
- **Icons:** lucide-svelte
- **Animation:** gsap
- **Markdown:** marked
- **Port:** 51740 (local dev), Vercel default (production)

---

## Directory Structure

```
library/workbench/
  src/
    app.css                          # Global styles (dark theme, cream/magenta palette)
    app.html                         # HTML shell
    app.d.ts                         # Type declarations
    hooks.server.ts                  # Supabase SSR hooks
    lib/
      components/
        ChatBubble.svelte            # Chat engine bubble renderer
        MeasurementRuler.svelte      # Ruler overlay
        PhoneFrame.svelte            # Phone mockup frame
        Polaroid.svelte              # Polaroid-style image frame
      supabase/
        client.ts                    # Browser Supabase client (PUBLIC_SUPABASE_URL + KEY)
        server.ts                    # Server Supabase client
    routes/
      +layout.svelte                 # Root layout (Supabase auth listener)
      +layout.server.ts              # Server-side layout loader
      +page.svelte                   # Landing page

      # === Bavaria Production Asset Management (REQ-001 through REQ-008) ===
      bavaria/                       # Production asset grid + review controls
        +page.svelte                 # Responsive grid, voting, lightbox, zoom, drag-compare, arrow keys, ESC layering, CSV metadata filters, comments display, approved/all toggle switch, realtime SSE updates
        +page.server.ts              # Reads from BAVARIA_DIR (library/bavaria/), loads bavaria-manifest.json + CSV009/001/002/000 metadata. Returns ids, votes, meta, comments.

      # === Visual Asset Management (legacy Vast.ai era) ===
      gallery/                       # LoRA ablation review (E001-E014)
        +page.svelte                 # Grid, voting, lightbox, zoom, drag-compare
        +page.server.ts              # Reads from GALLERY_DIR, loads .votes.json
      obj005/                        # LoRA validation (F002 vs F003)
        +page.svelte                 # Table layout, reference face, voting
        +page.server.ts              # Reads from OBJ005 dir
      passport-photos/               # Reference face grid
        +page.svelte                 # Responsive grid, ID overlay
        +page.server.ts              # Reads passport dir
      dataset/                       # Training dataset browser (20 images)
        +page.svelte                 # Lightbox + zoom
        +page.server.ts              # Reads dataset dir
      lora-training/                 # Training step progression
        +page.svelte                 # Swimlane layout, 4-direction arrow keys

      # === Chat Engine Tournament ===
      cernere/                       # Cernere tournament
        +page.svelte
        +page.server.ts
      cydonia/                       # Cydonia tournament
        +page.svelte
        +page.server.ts
      judge/                         # Scoring interface
        +page.svelte
        +page.server.ts

      # === Product/Marketing (inert) ===
      homepage/                      # Product homepage
      preorder-benefits/             # Marketing page
      pricing/                       # Pricing page
      style-guide/                   # Style guide

      # === APIs ===
      api/
        bavaria/[id]/+server.ts      # Serve Bavaria image by ID (PNG/JPG/JPEG/WebP)
        bavaria/vote/+server.ts      # Bavaria approve/reject votes (POST/DELETE to bavaria-manifest.json)
        bavaria/events/+server.ts    # SSE endpoint — fs.watch on BAVARIA_DIR, pushes change events to browser (REQ-005)
        rd/[id]/+server.ts           # Serve image by ID from GALLERY_DIR
        rd/[id]/pin/+server.ts       # Pin image
        rd/[id]/trash/+server.ts     # Trash image
        gallery/vote/+server.ts      # Approve/reject vote (POST/DELETE to .votes.json)
        obj005/[id]/+server.ts       # Serve OBJ005 image
        obj005/vote/+server.ts       # OBJ005 voting
        passport/[id]/+server.ts     # Serve passport photo
        dataset/[id]/+server.ts      # Serve dataset image
        lora-samples/[name]/+server.ts # Serve LoRA sample
        training/[id]/+server.ts     # Serve training image
        cernere/check/+server.ts     # Cernere check endpoint
        cernere/data/+server.ts      # Cernere data endpoint
        judge/score/+server.ts       # Judge scoring endpoint

  static/                            # Static assets (obj005 images, reference photos)
  _backup/                           # Old backup (scroll-lab, mockup pages)
  .vercel/output/                    # Build output
  package.json
  svelte.config.js                   # Vercel adapter, nodejs22.x
  tailwind.config.js
  tsconfig.json
  vite.config.ts
```

---

## Data Flow

```
Filesystem (~/images/...)
  └── +page.server.ts (readdir, readFile, load .votes.json)
       └── +page.svelte (renders grid, lightbox, compare)
            └── User interaction (vote, drag, click)
                 └── POST/DELETE to /api/gallery/vote
                      └── writeFile to .votes.json
```

**Key pattern:** All image data is filesystem-based. Each route has a hardcoded `GALLERY_DIR` constant pointing to a specific directory under `~/images/`. Votes are persisted as `.votes.json` files alongside the images. No database for image metadata — pure filesystem.

Supabase is wired for auth (layout.svelte onAuthStateChange) but not used for image data storage.

---

## Dependency Graph

```
+layout.svelte
  └── Supabase auth listener (invalidate on state change)

gallery/+page.svelte
  ├── gallery/+page.server.ts (filesystem read)
  ├── /api/rd/[id] (image serving)
  └── /api/gallery/vote (vote persistence)

obj005/+page.svelte
  ├── obj005/+page.server.ts (filesystem read)
  ├── /api/obj005/[id] (image serving)
  └── /api/obj005/vote (vote persistence)

(Each visual route follows same pattern: server load → page render → API for images + votes)
```

---

## Blast Radius Map

| Change | Affects |
|--------|---------|
| app.css | All routes (global styles) |
| +layout.svelte | All routes (Supabase auth) |
| Any API under api/ | Only the route(s) that call it |
| gallery/ | Isolated — own server load + own API |
| obj005/ | Isolated — own server load + own API |
| bavaria/ | Isolated — own server load + own APIs (bavaria/[id], bavaria/vote). Uses bavaria-manifest.json in BAVARIA_DIR. |
| Supabase client/server | Auth on all routes; image data unaffected (filesystem) |
| Hardcoded GALLERY_DIR paths | Each route's server.ts — change one, only that route breaks |

---

## Shared Interaction Patterns (Reusable)

These patterns are implemented inline in each route (not extracted to shared components):

1. **Vote (approve/reject)** — toggle button, persisted to `.votes.json` via API POST/DELETE
2. **Lightbox** — fullscreen overlay, ESC to dismiss
3. **Click-to-zoom** — 3x scale at cursor position, toggle on/off
4. **Drag-to-compare** — drag one image onto another, side-by-side overlay
5. **Arrow key navigation** — left/right through image array in lightbox
6. **Image labels** — metadata overlay on card (font-mono, gradient background)
7. **ESC layering** — compare → zoom → lightbox (dismiss in order)

Not yet extracted into shared components — each route re-implements. A Bavaria route will need to either copy these or extract them.

---

## Known Issues

1. **Hardcoded filesystem paths.** Every route's +page.server.ts has a hardcoded absolute path to `~/images/...`. No configuration, no env vars. Bavaria will need its own path.
2. **No shared image/vote components.** Each route re-implements lightbox, zoom, compare, voting inline. Duplication, not reuse.
3. **No database for image metadata.** Only filesystem + .votes.json. No character info, no use case tagging, no generation metadata, no destination tagging. Bavaria's 9 new features all require structured metadata that the current filesystem approach can't support.
4. **Stale build output.** `.vercel/output/` contains a build artifact. May be out of date.
5. **Product/marketing routes present.** homepage/, pricing/, preorder-benefits/ are inert but present. Not relevant to Bavaria.
