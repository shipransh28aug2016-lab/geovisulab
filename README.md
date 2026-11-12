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

## Deploy (Vercel)
1. Import the repo → framework auto-detects Next.js (`vercel.json` included).
2. Optional env: `DATABASE_URL` (Postgres) for durable accounts/notes. Without it a demo file store in `/tmp` is used (resets on cold start). See `.env.example`.
3. Atlas data (`atlas/data/pilot/**`) is bundled via `outputFileTracingIncludes`. Full-corridor geometry (`shapes-corridor.geojson`, 24.6 MB) is gitignored; run `npm run atlas:build` before deploying if you want every boundary, otherwise the committed 145-shape focus tier is used and the UI says so.

## API
`/api/health` · `/api/atlas/snapshot?astronomical=-260` (or `year=261&era=BCE`, `edtf=1765-08-12`) · `/api/atlas/timeline` · `/api/atlas/event?event=<id>` · `/api/atlas/basemap`
