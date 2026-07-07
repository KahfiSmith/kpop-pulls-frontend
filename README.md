<div align="center">

# KPop Pulls — Frontend

K-Pop idol card gacha with pity system, collection management, and shareable collections.

</div>

## Features

- Gacha pulls with rarity tiers and pity system (Rookie → Ultimate Bias)
- Reveal animation and sound effects
- Pull statistics (rarity distribution, pity pulls, recent history)
- Collection management via localStorage with duplicate tracking
- Export / import collection as JSON
- Share collection via encoded URL
- Filter, search, and sort your collection
- Responsive retro UI with shared layout and components

## Tech Stack

- Next.js 15 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4, `class-variance-authority`, `tailwind-merge`, `clsx`
- Radix UI (`dialog`, `label`, `select`, `slot`)
- Icons: `lucide-react`
- Animations: `tw-animate-css`
- E2E testing: Cypress 14

See `package.json` for exact dependency versions.

## Project Structure

```
src/
  app/                 # App Router pages (home, collection, shared)
  components/
    common/            # PageLayout, SiteHeader, OptimizedImage
    features/          # GachaPull, IdolCard, collection components
    ui/                # Button, Select, Dialog, etc.
  data/                # idols, groups, rarities
  hooks/               # useGacha, useSoundEffects, useLocalStorage
  lib/                 # utils, collection helpers
  types/               # TypeScript types
public/
  images/              # Idol images and gacha machine asset
  sounds/              # Pull sound effects
```

## Data Model

- `src/data/idols.ts` — idol records (name, group, rarity, image path, etc.)
- `src/data/rarities.ts` — rarity definitions, colors, probabilities, `pityConfig`
- `src/data/groups.ts` — K-pop group metadata

`group` values in `idols.ts` must match names in `groups.ts`.

## Local Development

Prerequisites: Node.js 18+, pnpm 9+

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm start
pnpm type-check
pnpm lint
```

## Testing

```bash
pnpm cypress:run     # headless E2E
pnpm cypress:open    # interactive runner
```

CI runs type-check, lint, build, and Cypress on push/PR.

## Implementation Notes

- Collection, pull history, and pity state persist in `localStorage`
- Share links encode collection JSON in the URL query string
- Sound effects can be muted from the gacha screen
- `data-cy` attributes are used for stable Cypress selectors

## Contributing

1. Fork and create a feature branch
2. Run `pnpm type-check` and `pnpm lint` before opening a PR
3. Include a clear description and test steps

---

Found incorrect idol/group/rarity data? Open an issue or PR.