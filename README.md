# World Cup Live

A small, self-contained, **mobile-first** web app showing a football World Cup's
**group standings** and **knockout bracket**. It runs as a 100% client-side
static site — no backend, no database, no auth — and deploys to GitHub Pages.

> **Sample data.** Because no live feed is bundled, the standings and bracket are
> illustrative and clearly badged as such. Wiring a real source is a drop-in
> change (see [Going live](#going-live)).

## Features

- **Standings** — 48 teams across 12 groups (A–L). Horizontally scrollable group
  tabs, a responsive table that stays readable at 390px (position, team, P, GD,
  Pts always visible; W/D/L at `sm`, GF/GA at `md`), qualification color-coding
  (top 2 green, best-third amber) with a legend. Points are **derived** from the
  W/D/L record so totals can't drift.
- **Bracket** — a phone-friendly knockout tree paged one round at a time
  (R32 → R16 → QF → SF → Final). Compact fixture cards with flags, date and
  venue; `TBD` for undecided slots; scores only once a match is played; the
  Final is highlighted. Round chips distinguish decided vs. not-yet-decided.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS (dark theme) · lucide-react ·
Vitest + Testing Library.

## Develop

```bash
npm install
npm run dev      # local dev server
npm test         # run unit tests
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Project layout

```
src/
  types.ts              # typed data contracts (Standings, Bracket, …)
  lib/standings.ts      # rankTeams, withPoints, goalDiff (pure helpers)
  lib/bracket.ts        # isPlayed, isRoundDecided
  data/standings.ts     # sample group-stage data
  data/bracket.ts       # sample knockout data
  components/           # Header, StandingsView, GroupTable, BracketView
  test/                 # Vitest suites
```

## Going live

All data lives in typed modules (`src/data/*.ts`) returning the shapes in
`src/types.ts`. Replace those modules with a `fetch` to a sports API that
returns the same `Standings` / `Bracket` shapes — no component changes needed.
Points stay derived from W/D/L via `withPoints`, so feed totals can't disagree
with the records.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages (`upload-pages-artifact` + `deploy-pages`,
with `pages: write` / `id-token: write`).

The Vite `base` is set to `/scoreboard/` in `vite.config.ts` so asset paths
resolve at the Pages URL **https://gioguarin.github.io/scoreboard/**. If the
repository is renamed, update `base` to match the new repo name.

> One-time setup: in the repository's **Settings → Pages**, set the source to
> **GitHub Actions**.
