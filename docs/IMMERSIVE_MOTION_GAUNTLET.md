# Immersive Motion Satisfaction Gauntlet

**Candidate:** `immersive-motion-pass`  
**Public review deployment:** https://idc-plans-for-oakwood-immersive.vercel.app  
**Canonical production retained:** https://idc-plans-for-oakwood.vercel.app  
**Assessment date:** August 21, 2026

## Why this pass exists

The first release delivered editorial quality, institutional credibility, and evidence clarity, but its motion language stopped at restrained entrances and state changes. This pass treats Iron Canvas as a quality framework rather than a visual ceiling and adds a meaning-bearing immersive layer.

## Refactoring delivered

- Scroll-linked `ProofConstellation` canvas that transforms scattered capabilities into the IDEA → BUILD → VERIFY → OPPORTUNITY proof path.
- Supporting LOCAL, EDGE, GOVERN, and RESEARCH nodes that connect to the main system.
- Three explicit visual states: capability, coordination, and proof.
- Mid-transition label dissolve to prevent collision while topology converges.
- Hero image parallax, cinematic signal sweep, staged ledger entrance, and stronger button response.
- Scroll-triggered score bars and chapter reveals with visible-by-default fallback.
- Animated local-inference core, signal line, roadmap nodes, cards, studio rows, and evidence links.
- Fine-pointer motion cursor; automatically absent on touch and reduced-motion systems.
- Canvas animation suspends outside the viewport.
- Dedicated mobile geometry rather than a scaled-down desktop layout.
- Static, compact reduced-motion equivalent.

## Promotion gates

| Gate | Required | Candidate |
|---|---:|---:|
| Visual satisfaction | ≥ 8/10 | **8.6/10 provisional** |
| Signature moment | ≥ 1 | **Proof network transformation** |
| Performance | ≥ 75 | **82** |
| Accessibility | 100 | **100** |
| Best Practices | 100 | **100** |
| SEO | 100 | **100** |
| Desktop/mobile console errors | 0 | **0** |
| Horizontal overflow | 0 | **0** |
| Distinct scroll states | 3 | **3** |
| Average frame time | < 22 ms | **8.33 ms** |
| p95 frame time | < 35 ms | **8.8–9 ms** |
| Reduced-motion animations | 0 | **0** |
| Reduced-motion canvas | Static | **Static** |
| Existing lab/proof interactions | Pass | **Pass** |

## Visual review record

### Iteration 1 — rejected

- Full-page screenshots exposed invisible off-screen reveal content.
- Resolved desktop geometry collided with the narrative copy.
- Mobile midpoint labels crowded the supporting paragraph.

### Iteration 2 — corrected

- Content remains visible by default; viewport entry adds movement rather than gating visibility.
- Resolved geometry moved below/right of the narrative block.
- Mobile receives a lower-stage coordinate transform.
- Labels dissolve during convergence and return when the proof system resolves.

### Current frame assessment

| Frame | Assessment |
|---|---:|
| Desktop opening | 8.7/10 |
| Desktop resolved system | 8.7/10 |
| Mobile midpoint transition | 8.3/10 |
| Mobile resolved system | 8.7/10 |
| Overall satisfaction | **8.6/10** |

## Evidence

- `qa/motion/motion-qa.json` — coded desktop/mobile/reduced-motion results.
- `qa/motion/*-constellation-{start,mid,end}.png` — three-state visual evidence.
- `qa/motion/reduced-motion.png` — static-equivalent evidence.
- `qa/lighthouse-immersive.json` — production-build Lighthouse report.
- `qa_motion.py` — repeatable local or deployed-URL test harness (`BASE_URL=...`).

## Release status

**Candidate passes the coded and internal visual gates but is not promoted to canonical production.** The current production deployment remains the rollback-safe baseline. Promotion requires Jon's visual satisfaction judgment and reconciliation of the independent critic seats.
