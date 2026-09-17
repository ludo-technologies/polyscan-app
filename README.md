<div align="center">

<img src="public/brand/logo-readme.svg" alt="Polyscan App" height="48">

### Weekly codebase health monitoring for GitHub, grounded in static analysis

Polyscan measures your whole codebase every week, tracks structural decay, and reports what to fix first. It also catches new problems on pull requests, powered by the open-source analyzers [pyscn](https://github.com/ludo-technologies/pyscn) (Python) and [polyscan](https://github.com/ludo-technologies/polyscan) (JavaScript/TypeScript, Go, Rust, C++).

**[Install the App →](https://github.com/apps/polyscan-app)** • **[Website](https://codescan.dev)** • **[Report an issue](../../issues)**

</div>

---

## What this repository is

The official home of **Polyscan App**: the [issue tracker](../../issues) for bug reports and feature requests about the App, and the source of the site served at [codescan.dev](https://codescan.dev) (a static Next.js app — no database, no accounts, no API).

The analysis engines are fully open source; the App's orchestration backend is closed:

| Project | Repository |
|---|---|
| polyscan monorepo (`core`, `polyscan` CLI) | [ludo-technologies/polyscan](https://github.com/ludo-technologies/polyscan) |
| pyscn (Python analyzer) | [ludo-technologies/pyscn](https://github.com/ludo-technologies/pyscn) |
| Polyscan App backend | `ludo-technologies/polyscan-backend` (private) |

## Configuring the App

Add `.github/polyscan.yml` to a repository where the App is installed:

```yaml
language: en             # report language: en, ja, zh, ko, es, fr, de, pt
target_directories:      # directories to analyze (default: all)
  - src/
audit_interval: weekly   # daily (Pro), weekly, or monthly
```

Reference documentation for the analyzers is published separately from `pyscn/website` (MkDocs) and served at [docs.codescan.dev](https://docs.codescan.dev/).

> This repository previously hosted codescan.dev, a hosted security scanner built on Semgrep, Gitleaks, and Trivy. That product was retired; its frontend and Go scan engine remain in the git history up to the `feat/polyscan-site` branch point.

## Development

```bash
bun install
bun run dev      # http://localhost:3000
```

| Command | Description |
|---|---|
| `bun run dev` | Start the dev server |
| `bun run build` | Production build |
| `bun run lint` | Biome check |
| `bun run format` | Biome format |
| `bun run test` | Vitest |

### Environment variables

All optional — see [`.env.example`](.env.example).

| Variable | Purpose |
|---|---|
| `SITE_URL` / `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, and robots. Falls back to the Vercel URL, then `https://codescan.dev`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics measurement ID. Analytics are disabled when unset. |

## Deployment

Deployed to Vercel manually: `bunx vercel --prod` from the repo root (there is no Git-integration auto-deploy).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
