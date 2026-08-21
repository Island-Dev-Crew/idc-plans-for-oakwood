# IDC Plans for Oakwood — AI Production & Proof

A production web hub built with the Iron Canvas v5.2 MISSION workflow for Island Development Crew’s August 2026 Oakwood University AI enhancement proposal.

## What this repository contains

- layer-aware comparison of AAMU’s public 2026 AI ecosystem and IDC’s Oakwood implementation blueprint;
- confidence grade with explicit evidence limits;
- 2× **Foundations + Studio + Proof** operating model;
- interactive 10-seat lab architecture;
- eight-studio curriculum;
- interactive Body-of-Work Confidence Score / Proof Ledger;
- Campus Companion as a production-evidence case;
- 30/90/semester/year roadmap;
- source and claim ledger;
- a 4.8 MB single-file portable HTML build with locally embedded images.

## Evidence discipline

Claims are separated into four categories:

1. verified public fact;
2. IDC documented evidence;
3. planning estimate;
4. proposed target.

The comparison does **not** claim IDC’s implementation blueprint is an accredited degree, does not repeat an unverified “first HBCU” superlative, and does not claim a private LinkedIn candidate-ranking API exists.

## Local development

```bash
npm install
npm run dev
```

## Verification and production build

```bash
npm run check
npm run build
PORTABLE=true npm run build -- --outDir dist-portable
python3 embed_portable.py
```

The portable artifact is:

`IDC_Oakwood_Compilation_Hub_Portable.html`

It can be opened directly in a modern browser or moved to another host. The normal Vite build is emitted to `dist/` and is the recommended Vercel deployment source.

## Evidence files

- `docs/EVIDENCE_AND_2X_STRATEGY.md`
- `docs/IRON_CANVAS_DESIGN_PRD.md`
- `docs/evidence/aamu-ai-major-curriculum.txt`
- `docs/evidence/source-manifest.json`

## Primary public sources

- AAMU Undergraduate Bulletin 2026–2027
- AAMU AWS–Machine Learning University regional-lead announcement
- AAMU Center for AI/ML & Cybersecurity
- AAMU + Sandia AI Cage announcement
- IDC Oakwood AI Lab sites and proposal archive
- OU Campus Companion enhanced repository and comparison artifacts

## Design system

**Treatment:** Heritage Signal / Research Ledger
**Palette:** deep Oakwood navy, warm ivory, old gold, restrained maroon benchmark accent
**Composition:** editorial thesis scale, evidence ledgers, asymmetric image mosaics, interactive systems diagrams
**Motion:** restrained reveal/progress/interaction with `prefers-reduced-motion` support

Built by Island Development Crew using Iron Canvas v5.2.
