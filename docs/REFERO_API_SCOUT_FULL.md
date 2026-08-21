# Refero Styles design scout — Oakwood University × IDC AI strategy hub

**Scout date:** 2026-08-21
**Source:** [Refero Styles](https://styles.refero.design/) and its public `sort=popular` feed
**Use case:** premium, responsive strategy-compilation hub combining Oakwood heritage and frontier AI

## What was verified

- The homepage says it contains **2,000+** design systems, but the visible **Popular** tab renders only 20 cards at once and exposes no visible pager or “load more” control.
- Browser network inspection revealed the same-site endpoint `https://styles.refero.design/api/styles?page=N&sort=popular`. Pages 1–5 each returned 20 records, giving **100 unique records in stable rank order**. Therefore the first 100 were captured successfully; the appendix is the verified API order as observed on 2026-08-21.
- “Popular” is Refero’s label; Refero does not disclose the scoring formula or time window. Rank should therefore be treated as a site-defined ordering, not an independently validated popularity metric.
- Visual observations below combine the public thumbnail/screen preview with each Refero detail page’s design-system description and tokens. They are scouting inferences, not permission to copy brand assets or distinctive compositions.

## Strongest references for this brief

| Popular rank | Example | Visual observations | Transfer value |
|---:|---|---|---|
| 1 | [Dala](https://styles.refero.design/style/e5f5f8cf-e68d-4ed1-bbf5-6b67569af648) | Pure-black stage, huge low-weight grotesk headline, vivid violet CTA, and a multicolor triangular-particle “brain.” The hero is asymmetric: copy at left, generative object at right. Video preview implies particle drift/orbit rather than decorative page-wide animation. | Best frontier-AI reference. Reinterpret the particle object as an Oakwood knowledge constellation—schools, initiatives, evidence, and decisions—using blue, gold, and neutral sparks rather than Dala’s exact brain or palette. |
| 3 | [Mercury](https://styles.refero.design/style/3172cd4d-118a-4a16-a259-6b634d32322e) | Full-bleed misty mountain scene with a solitary desk; centered, quiet headline and single blue action. Atmospheric image does most of the emotional work while navigation and copy remain restrained. | Model for cinematic chapter openers: archival Oakwood campus photography or future-facing research scenes can carry emotion without sacrificing executive calm. |
| 4 | [Linear](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1) | Near-black command surface, tight white type, hairline rules, compact product UI rising from below the fold. The interface—not decoration—is the texture. | Useful for evidence-heavy strategy pages, roadmaps, portfolios, and operating-model views. Keep the precision but soften it with Oakwood blue and warmer typographic moments. |
| 5 | [ElevenLabs](https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26) | Warm-white editorial canvas; balanced two-column intro; large rounded product theatre with softly glowing spheres and tabbed modes. Motion is centered inside the product visual, not spread across every component. | Strong responsive pattern for three strategic lenses or content modes. Replace spheres with abstract “signal” objects or campus/AI themes; preserve restrained motion containment. |
| 7 | [Steep](https://styles.refero.design/style/75fdb89f-ca64-41b3-af36-7a78bd09448e) | Large regular-weight serif headline with italic phrase; near-monochrome warm paper; analytics fragments float around the headline like editorial cutouts. One peach wash and pill actions punctuate an otherwise quiet field. | Closest match for “academic credibility + data-rich.” Use a dignified serif, blue/gold accent discipline, and floating evidence artifacts rather than a generic dashboard shell. |
| 13 | [General Intelligence Company](https://styles.refero.design/style/34baa524-5d5b-4165-bbab-d01f05e6d6b9) | Moonlit illustrated city/campus-like vista; literary serif; glassy compact navigation; translucent lower-left manifesto card. Illustration and typography make AI feel cultured rather than synthetic. | Strong bridge between heritage and frontier. Commission an original Oakwood-at-blue-hour illustration or cinematic campus treatment; avoid copying its skyline, framing, or painterly signature. |
| 18 | [Stripe](https://styles.refero.design/style/48e5de76-05d5-4c4e-a269-c7c245b291ec) | Ledger-like discipline: deep navy text, crisp rules, small squared actions, dense information separated by large whitespace, vivid indigo reserved for action. The sampled hero is extremely dark and typographic. | Good governance/data-document grammar: compact controls, strict alignment, explicit hierarchy, and color only where users act. |
| 20 | [Ventriloc](https://styles.refero.design/style/f99aca3e-5289-4595-a7cc-77a72052f4b8) | Warm-paper two-column hero. Large plainspoken headline at left; three floating analytics cards at right; trusted-partner logos below. Monochrome is punctuated by a single orange ember. | Best model for strategy landing modules: proposition + proof + institutional validation in one viewport. Adapt orange to Oakwood gold and preserve the evidence-first hierarchy. |

## Recommended transferable pattern shortlist

### 1. Editorial evidence constellation
**References:** [Steep #7](https://styles.refero.design/style/75fdb89f-ca64-41b3-af36-7a78bd09448e), [Ventriloc #20](https://styles.refero.design/style/f99aca3e-5289-4595-a7cc-77a72052f4b8), [Seline Analytics #25](https://styles.refero.design/style/7967c6d9-e50c-42b5-b4d1-74003ba41781)

Build key strategy sections as an editorial spread: a strong thesis occupies 40–55% of the viewport while charts, quotations, benchmarks, and source cards orbit it as independent artifacts. This communicates “compiled intelligence,” not “software dashboard.” On mobile, collapse the orbit into a deliberate vertical evidence sequence with a sticky chapter label. Use Oakwood gold for one evidence class only—e.g., decisions or priority signals—so it retains authority.

### 2. Cinematic chapter thresholds
**References:** [Mercury #3](https://styles.refero.design/style/3172cd4d-118a-4a16-a259-6b634d32322e), [General Intelligence Company #13](https://styles.refero.design/style/34baa524-5d5b-4165-bbab-d01f05e6d6b9), [Origin Financial #27](https://styles.refero.design/style/c60f05ff-2420-4a24-92db-80c4b6a74683)

Open major chapters with a full-bleed archival or commissioned scene at blue hour, a short thesis, and one next action. Use slow parallax, subtle depth separation, or a 6–10 second ambient loop; do not animate body reading surfaces. This gives the compilation cinematic rhythm while letting dense sections remain sober and legible.

### 3. Living knowledge map as signature motion
**References:** [Dala #1](https://styles.refero.design/style/e5f5f8cf-e68d-4ed1-bbf5-6b67569af648), [Auros #12](https://styles.refero.design/style/21cfe0c1-778d-4613-9f47-a5718eb929b3), [Reflect Notes #82](https://styles.refero.design/style/e7f92774-3c08-402b-917d-020ba1f3d489)

Create one original generative visualization that links Oakwood history, strategic pillars, schools, initiatives, and evidence. Nodes can gather into the Oakwood “O,” a campus silhouette, or a branching knowledge tree, but should remain explorable and semantically meaningful. Motion should respond to chapter/filter state, support reduced-motion mode, and degrade to a clear static diagram on low-power/mobile contexts.

### 4. Heritage serif × technical sans
**References:** [Steep #7](https://styles.refero.design/style/75fdb89f-ca64-41b3-af36-7a78bd09448e), [Anthropic #23](https://styles.refero.design/style/d469cba4-c448-4a43-a033-883f8bfcdc42), [Perplexity #80](https://styles.refero.design/style/81afaa5c-73ac-4ef4-9a99-296da325ea6c)

Use a scholarly serif at regular weight for chapter titles, quotations, and historical framing; use a highly legible grotesk for navigation, data, methods, and AI terminology. Italic serif can mark human judgment, reflection, or historical voice. Avoid faux “old university” styling: credibility should come from proportion, whitespace, and sourcing—not crests stamped everywhere.

### 5. Dual-register light/dark narrative
**References:** [Dia Browser #44](https://styles.refero.design/style/b458ca1a-70f0-4f85-b745-f879a4d08457), [Wispr Flow #64](https://styles.refero.design/style/ac53825c-1e06-4ae0-8489-cace5c5e0339), [Customer.io #97](https://styles.refero.design/style/abbaa70a-5fe2-44a9-9c5f-272e68c450c3)

Use warm paper/light sections for heritage, evidence, people, and long reading; transition to midnight Oakwood blue for AI opportunity, simulations, scenarios, and interactive maps. The alternation becomes narrative syntax, not a user-selectable gimmick. Keep component geometry and typography consistent across both registers so the site still feels like one institution.

### 6. Color as institutional signal, not decoration
**References:** [Stripe #18](https://styles.refero.design/style/48e5de76-05d5-4c4e-a269-c7c245b291ec), [Ventriloc #20](https://styles.refero.design/style/f99aca3e-5289-4595-a7cc-77a72052f4b8), [Hyperstudio #16](https://styles.refero.design/style/8eb9c53e-d69c-497a-b640-610856cf3a60)

Let warm white, ink/navy, and graphite carry 85–95% of the interface. Reserve Oakwood gold for milestones, selected states, source annotations, and strategic priority; reserve brighter blue for interaction and live system state. This protects the premium feel and improves scanability. Do not use gold gradients on every heading or make blue/gold compete at equal saturation.

### 7. Product theatre for strategy models
**References:** [ElevenLabs #5](https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26), [Linear #4](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1), [ClickUp #70](https://styles.refero.design/style/efcb73cb-b84a-4ae7-9a2b-e1116f79f130)

Treat the strategy itself as an explorable product. Use a contained stage with tabs for “Vision / Portfolio / Roadmap” or “Learn / Decide / Act,” then animate only the changing model. This enables data-rich content without overwhelming the landing page. On narrow screens, tabs become a segmented horizontal scroller and visual models simplify rather than shrink unreadably.

### 8. Proof rails and provenance in the first viewport
**References:** [Ventriloc #20](https://styles.refero.design/style/f99aca3e-5289-4595-a7cc-77a72052f4b8), [Stripe #18](https://styles.refero.design/style/48e5de76-05d5-4c4e-a269-c7c245b291ec), [Vercel #56](https://styles.refero.design/style/f24daf3a-d43f-4dec-85a9-8ac1d5148a03)

Place trusted sources, participating Oakwood units, review status, and “last updated” metadata near the primary thesis—not hidden in a footer. Strategy hubs win trust by showing provenance. Use a quiet logo/source rail, source-count chips, and per-claim citations. Motion may reveal lineage on hover/focus, but the provenance must remain accessible without interaction.

## Suggested composite direction

**“Blue-hour archive / living observatory.”** Start with a cinematic Oakwood-at-blue-hour chapter threshold (Mercury/GIC), transition onto warm editorial paper for the compiled argument (Steep/Anthropic), and use midnight-blue observatory sections for interactive AI maps (Dala/Linear). A regular-weight heritage serif gives historical and academic voice; a precise sans handles evidence and operating detail. Gold appears as a rare decision marker; brighter blue denotes interaction. Motion is concentrated in one knowledge map, chapter transitions, and contained strategy-model stages—not scattered across cards.

## Avoid literal copying

- Do not reuse Dala’s triangular brain, GIC’s illustrated Manhattan scene, Mercury’s mountain desk, ElevenLabs’ glowing spheres, or any reference brand’s exact typeface/palette/composition.
- Do not let cinematic imagery replace evidence; every major claim should connect to a source, owner, or decision state.
- Do not force desktop “floating artifacts” onto mobile; restack them into an authored sequence.
- Avoid generic AI clichés (neon grids, robot heads, undifferentiated purple gradients). The distinctive visual asset should be Oakwood’s own people, archives, campus, strategic model, and data.

## Verified Popular 1–100 inventory

The list below records the order returned by Refero’s public `sort=popular` endpoint on 2026-08-21.

1. [Dala](https://styles.refero.design/style/e5f5f8cf-e68d-4ed1-bbf5-6b67569af648) — constellation on black velvet
2. [Apple (España)](https://styles.refero.design/style/c9cabb96-32fa-4896-837a-f2497ce1c856) — cathedral of white space
3. [Mercury](https://styles.refero.design/style/3172cd4d-118a-4a16-a259-6b634d32322e) — alpine banking at blue hour
4. [Linear](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1) — midnight precision instrument
5. [ElevenLabs](https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26) — warm cream Bauhaus editorial
6. [monopo saigon](https://styles.refero.design/style/3e52dd36-6ab1-48c6-bc40-47ef6d33abc2) — liquid iridescence, editorial silence
7. [Steep](https://styles.refero.design/style/75fdb89f-ca64-41b3-af36-7a78bd09448e) — serif analytics on warm paper
8. [ORYZO AI](https://styles.refero.design/style/1f204e95-454a-437e-845b-c1b169d35607) — darkroom product editorial
9. [Ui](https://styles.refero.design/style/0fd67ec5-7e9c-4ca9-b368-5d9c7388477a) — clinical blueprint on frosted paper
10. [Authkit](https://styles.refero.design/style/e80231a2-e4d6-406a-a2c9-2e6109679690) — frosted glass cathedral at midnight
11. [Awesomic](https://styles.refero.design/style/8512e28d-5385-4c20-a336-214568c4370c) — editorial zinc grid
12. [Auros](https://styles.refero.design/style/21cfe0c1-778d-4613-9f47-a5718eb929b3) — abyssal terminal, bioluminescent data
13. [General Intelligence Company](https://styles.refero.design/style/34baa524-5d5b-4165-bbab-d01f05e6d6b9) — literary journal beside a bonfire
14. [Monad](https://styles.refero.design/style/fc84e9f0-2058-4a0a-8d26-9cc1ba84ec9c) — editorial tech journal on parchment
15. [Cursor](https://styles.refero.design/style/4e3b4717-84c8-4599-baaf-a343c3d619b6) — warm parchment atelier
16. [Hyperstudio](https://styles.refero.design/style/8eb9c53e-d69c-497a-b640-610856cf3a60) — blueprint scratched into obsidian
17. [AI for Business](https://styles.refero.design/style/ee403055-480e-4bd4-9216-07c9ae2dde2e) — brutalist editorial showroom
18. [Stripe](https://styles.refero.design/style/48e5de76-05d5-4c4e-a269-c7c245b291ec) — indigo-ink ledger
19. [Apple](https://styles.refero.design/style/aecac5da-f397-4ddf-b71f-de1efc434cb8) — white room, single blue switch
20. [Ventriloc](https://styles.refero.design/style/f99aca3e-5289-4595-a7cc-77a72052f4b8) — editorial data observatory
21. [Duolingo](https://styles.refero.design/style/7088d695-362b-4e09-b325-fa8136d4f350)
22. [Resend](https://styles.refero.design/style/0d914ef0-fa84-4c60-a9aa-cef0b5eb6e5d)
23. [Anthropic](https://styles.refero.design/style/d469cba4-c448-4a43-a033-883f8bfcdc42)
24. [Air](https://styles.refero.design/style/d3289fe7-a85e-42d8-96b7-eb7faa62a104)
25. [Seline Analytics](https://styles.refero.design/style/7967c6d9-e50c-42b5-b4d1-74003ba41781)
26. [Raycast](https://styles.refero.design/style/3b6a17f0-3bdf-418c-a95e-0b89e5a8b2f8)
27. [Origin Financial](https://styles.refero.design/style/c60f05ff-2420-4a24-92db-80c4b6a74683)
28. [Dub](https://styles.refero.design/style/b0d80806-b724-4ed1-a1d1-074edd3c9bc9)
29. [Gsap](https://styles.refero.design/style/00537a20-e99e-4ef2-b119-c6f532c44cc9)
30. [Vivid+Co](https://styles.refero.design/style/8875b14e-c59a-492f-8780-8027a480f21c)
31. [dope.security](https://styles.refero.design/style/e1f18a7e-5af1-46b3-8f89-bce6c78b80d4)
32. [Notion](https://styles.refero.design/style/2bf4c61f-de10-4614-ba1b-20c0453bd2a9)
33. [Hyer Aviation](https://styles.refero.design/style/f61cf515-ccd5-4494-bdd1-be9fe4d7258c)
34. [Sequel](https://styles.refero.design/style/1bd3b2ba-9ad9-44ed-9130-03f9d94de821)
35. [Superhuman](https://styles.refero.design/style/418b374a-be64-44f0-b17e-1d45308c7e62)
36. [Slash](https://styles.refero.design/style/7c38e84b-aea0-4c8f-b3e9-60b994ee6c6b)
37. [Family](https://styles.refero.design/style/1bcae895-2245-4d33-aa43-1c1e80719554)
38. [Dimension](https://styles.refero.design/style/fbcf9cbb-7c6b-449d-862a-bce521a8ab1d)
39. [Caldera](https://styles.refero.design/style/fe8cdcf9-c850-4d52-be07-5ad269bf9ebf)
40. [Factory](https://styles.refero.design/style/13d6fc89-eba2-4724-ac37-20f4f2e5efec)
41. [Home / New Form Capital](https://styles.refero.design/style/1a519123-071a-449f-b5df-0def73ed7f35)
42. [Structured](https://styles.refero.design/style/6c0b77d3-71f9-469d-98aa-4ce1d6d76ac8)
43. [Geniestudio](https://styles.refero.design/style/2ffd50d4-93b7-4acf-9bc2-e86e61b63f27)
44. [Dia Browser](https://styles.refero.design/style/b458ca1a-70f0-4f85-b745-f879a4d08457)
45. [Column](https://styles.refero.design/style/a76ec6ba-20b3-495c-9d89-1e58281e79e7)
46. [Hungry Tiger](https://styles.refero.design/style/47f15da7-8905-45b3-bcab-06a4277c6168)
47. [xAI](https://styles.refero.design/style/3b83dfe4-2f53-4a4d-819d-e6045ca5f7dc)
48. [Claude](https://styles.refero.design/style/47cb86b6-cb2d-41c8-94ba-8607cd7c41cd)
49. [Apple (España), alternate](https://styles.refero.design/style/a4f123f2-cd4b-4d26-998f-a3d3ee158024)
50. [Active Theory](https://styles.refero.design/style/3416bd14-96bb-4c23-bd01-b2ea178ba5ce)
51. [Calendly](https://styles.refero.design/style/9946887b-ffa9-4276-af81-ae6352795afb)
52. [Antimetal](https://styles.refero.design/style/9f9a4a4f-1a27-47ca-a65b-68b9850a84e4)
53. [Adaline](https://styles.refero.design/style/312423bf-72ea-42fb-b8f5-ab0104e778f3)
54. [Augen Pro](https://styles.refero.design/style/0f7da1b2-9d06-4ef5-b5a8-ef7f92e57ab2)
55. [Ciridae](https://styles.refero.design/style/a1b78a21-a304-482b-8ce5-f612d95d44fe)
56. [Vercel](https://styles.refero.design/style/f24daf3a-d43f-4dec-85a9-8ac1d5148a03)
57. [Jeton](https://styles.refero.design/style/1f32d914-6fdd-4692-b4fc-fcee2c414766)
58. [Integrated Biosciences](https://styles.refero.design/style/80099f79-72b7-4367-b2e9-6a3d4a3e9e6a)
59. [Shop](https://styles.refero.design/style/4fa67bd1-f01d-454a-b522-4a0359ff9815)
60. [Ease Health](https://styles.refero.design/style/e9f5e976-53f7-42f5-a882-4e63b3c2f734)
61. [Airbnb](https://styles.refero.design/style/c2325884-4391-4688-85cd-e143f5107517)
62. [Gleap](https://styles.refero.design/style/2eab438d-32cd-40c2-b160-1e4127dac569)
63. [Visitors](https://styles.refero.design/style/e7876363-181a-44a9-9e5c-2255cf98aea5)
64. [Wispr Flow](https://styles.refero.design/style/ac53825c-1e06-4ae0-8489-cace5c5e0339)
65. [Perk](https://styles.refero.design/style/75c06591-34d2-493a-bd49-70551b5e4a53)
66. [Acctual](https://styles.refero.design/style/aeefc294-a8f7-443d-b76a-538dddc29afe)
67. [Seed](https://styles.refero.design/style/cd723d5a-e7ea-4e4c-a3bb-6cf56e05057a)
68. [Amplemarket](https://styles.refero.design/style/db451eca-8de6-43a9-a5d5-35271befdffd)
69. [ThoughtLab](https://styles.refero.design/style/82d52a5f-b1bb-4a69-91a3-15a7eb8bbe99)
70. [ClickUp](https://styles.refero.design/style/efcb73cb-b84a-4ae7-9a2b-e1116f79f130)
71. [Huly](https://styles.refero.design/style/d018e81d-6bb6-4445-86d7-39fd6be7e74d)
72. [Default](https://styles.refero.design/style/eeeb6ac9-fc07-4965-935a-e1989ed831f1)
73. [Say Briefly](https://styles.refero.design/style/8b91f4c9-74e5-4925-90a3-3dd31fd5725e)
74. [Relate](https://styles.refero.design/style/337ade6a-4bae-49ba-b4aa-8994ac805a81)
75. [MindMarket](https://styles.refero.design/style/9130ad37-bf80-458f-b808-ac0ef6a8d1e9)
76. [Modal](https://styles.refero.design/style/68c15685-5db9-4869-b71d-27240568c9d8)
77. [Dylanbrouwer](https://styles.refero.design/style/b1e82907-d1cf-46cd-8ae7-3561c5b15fd0)
78. [Giga](https://styles.refero.design/style/607e0dbf-e2fc-45c9-b939-946b8981c156)
79. [Superpower](https://styles.refero.design/style/5d34568d-4bdc-445d-a527-c6f5249fa8fb)
80. [Perplexity AI](https://styles.refero.design/style/81afaa5c-73ac-4ef4-9a99-296da325ea6c)
81. [Wise](https://styles.refero.design/style/367c0c6e-73a7-441c-a8ff-91d139ac60dc)
82. [Reflect Notes](https://styles.refero.design/style/e7f92774-3c08-402b-917d-020ba1f3d489)
83. [Amrit Palace](https://styles.refero.design/style/b753dfda-cbe1-41e4-b341-b98d69c8422f)
84. [ChatGPT](https://styles.refero.design/style/52a007ed-ad1b-46a6-bd44-b76f91df6d0c)
85. [Superr](https://styles.refero.design/style/cfd0fec1-f25a-4b9b-9bd0-d5b66960f2f2)
86. [Slack](https://styles.refero.design/style/e26cb9b0-f876-41ff-9f24-fd67a6b9776c)
87. [Ditto](https://styles.refero.design/style/e9001d5a-504d-47ed-aef0-d0d35fa86418)
88. [Titan](https://styles.refero.design/style/964b9215-396b-492c-abec-7bd778d7b1c9)
89. [Lamborghini](https://styles.refero.design/style/c9c5be5a-aaa1-4338-9681-8378d2e24fbd)
90. [OFF+BRAND.](https://styles.refero.design/style/6b667ffc-5158-4000-9252-3a107d5161ee)
91. [Cal.com](https://styles.refero.design/style/5d7aa503-8cfa-49a4-bd3b-0c2f0f075c70)
92. [monday.com](https://styles.refero.design/style/77ee57e9-9f8e-4ec1-93f7-cc1c4b84307a)
93. [Scheduling](https://styles.refero.design/style/7ad5549e-9baa-4fda-ac43-79d568a86b98)
94. [Portal](https://styles.refero.design/style/b9aeb945-2f6e-4557-9115-e3ff3a8f8dc8)
95. [Slush](https://styles.refero.design/style/8b6b547f-a357-4f1b-9842-4579c62dd42b)
96. [Base44](https://styles.refero.design/style/e869e214-f672-4ac3-bfc2-bd25de7b003b)
97. [Customer.io](https://styles.refero.design/style/abbaa70a-5fe2-44a9-9c5f-272e68c450c3)
98. [Officevibe](https://styles.refero.design/style/ced1c98f-d489-48f7-a01f-1fa59a07b706)
99. [Revolut](https://styles.refero.design/style/a3161c3c-26d4-425b-aaa3-4fc3f06b77ee)
100. [099 SUPPLY](https://styles.refero.design/style/e4a7b5f3-f393-4f6d-b4a5-ecf874024bed)
