# GeoVisuLab

One app, two modes (toggle in the top bar, remembered via `?view=` and localStorage):

| Mode | What it is |
|---|---|
| **GeoSphere 3D · CBSE** | NCERT/CBSE Class XI–XII interactive globe, map, labs, quizzes, notes |
| **Historical Atlas · Ganga–Magadha** | Year slider (600 BCE–2000 CE), Cliopatria polity boundaries, curated events with sources, EN/हिं |

## Run
```bash
npm ci && npm run dev      # http://localhost:3000
npm run typecheck && npm run lint && npm test && npm run build
```

## Open source
Published on GitHub only. Code: MIT (`LICENSE`). Data: see `NOTICE.md` (Cliopatria CC BY 4.0 — keep attribution).
Run it yourself with the commands above; it is a Next.js server app (API routes), so it needs Node 20+, not static hosting.

Optional: `DATABASE_URL` (Postgres) for durable accounts/notes; otherwise a demo file store is used (see `.env.example`).
For every historical boundary run `npm run atlas:fetch && npm run atlas:build` once (needs internet; ~219 MB download). Without it the committed 145-shape focus tier is used and the UI says so.

## API
`/api/health` · `/api/atlas/snapshot?astronomical=-260` (or `year=261&era=BCE`, `edtf=1765-08-12`) · `/api/atlas/timeline` · `/api/atlas/event?event=<id>` · `/api/atlas/basemap`
