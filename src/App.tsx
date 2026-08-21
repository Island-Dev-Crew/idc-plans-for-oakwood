import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown, ArrowUpRight, BadgeCheck, BookOpen, BrainCircuit, BriefcaseBusiness,
  Building2, Check, ChevronRight, CircleAlert, Cloud, Code2, Cpu, Database,
  ExternalLink, Eye, FileCheck2, Fingerprint, Gauge, GraduationCap,
  Hammer, HeartHandshake, Landmark, Layers3, Link2, LockKeyhole, Menu, Microscope,
  Network, Orbit, PanelTop, Radar, Rocket, Scale, Server, ShieldCheck, Sparkles,
  SquareTerminal, TestTube2, Users, Workflow, X, Zap
} from 'lucide-react'

type Claim = 'Verified public fact' | 'IDC documented evidence' | 'Planning estimate' | 'Proposed target'

type ProofValues = {
  artifact: number
  evidence: number
  safety: number
  fluency: number
  impact: number
  collaboration: number
}

const nav = [
  ['benchmark', 'Benchmark'], ['assets', 'What exists'], ['model', '2× model'],
  ['lab', '10-seat lab'], ['curriculum', 'Curriculum'], ['proof', 'Proof Ledger'],
  ['roadmap', 'Roadmap'], ['evidence', 'Evidence']
]

const aamuScores = [
  ['Formal academic depth', 19, 20], ['Institutional commitment', 15, 15],
  ['Research infrastructure', 13, 15], ['Industry ecosystem', 15, 15],
  ['Production portfolio', 8, 15], ['Governance', 8, 10], ['Physical / edge breadth', 8, 10]
]

const idcScores = [
  ['Academic depth', 12, 20], ['Implementation specificity', 15, 15],
  ['Production portfolio', 14, 15], ['Infrastructure relevance', 14, 15],
  ['Responsible AI', 8, 10], ['Employer signaling', 9, 15], ['Institutional ecosystem', 6, 10]
]

const studios = [
  { n:'01', icon: SquareTerminal, title:'AI-Augmented Builder', desc:'Computer-use agents, system design, testing, deployment, observability and maintainable software.', output:'Production app + engineering evidence packet' },
  { n:'02', icon: Database, title:'Knowledge Systems', desc:'Retrieval, RAG evaluation, document intelligence, institutional search and source-grounded answers.', output:'Auditable knowledge system + eval report' },
  { n:'03', icon: Server, title:'Local Model Operations', desc:'Quantization, inference serving, memory planning, throughput, privacy and energy/cost trade-offs.', output:'Locally served model + benchmark card' },
  { n:'04', icon: Sparkles, title:'Multimodal Media Studio', desc:'Image, audio and video systems with rights, provenance, accessibility and editorial control.', output:'Campaign or learning artifact + provenance log' },
  { n:'05', icon: Orbit, title:'Physical & Edge AI', desc:'Robotics, sensors, edge inference and 3D-printed enclosures for real-world constraints.', output:'Working device + safety/test record' },
  { n:'06', icon: ShieldCheck, title:'AI Security Lab', desc:'Prompt injection, data leakage, identity, model/system red-team and incident response.', output:'Threat model + adversarial test suite' },
  { n:'07', icon: Microscope, title:'Applied Research Studio', desc:'Reproducible experiments, dataset/model cards, literature synthesis and publication workflows.', output:'Poster, paper or reproducible experiment' },
  { n:'08', icon: BriefcaseBusiness, title:'Venture & Community Deployment', desc:'Customer discovery, procurement, maintenance, accessibility and measured community value.', output:'Deployed service + impact evidence' }
]

const sources = [
  { id:'01', title:'AAMU Undergraduate Bulletin 2026–2027', detail:'Official 125-credit B.S. in Artificial Intelligence, curriculum and course descriptions.', url:'https://www.aamu.edu/academics/catalogs/_documents/undergraduate-bulletins/undergraduate-bulletin-2026-2027.pdf', type:'Verified public fact' as Claim },
  { id:'02', title:'AAMU named AWS–MLU regional lead', detail:'One of five institutions; faculty development, AWS curriculum, cloud resources and student pathways.', url:'https://www.aamu.edu/about/inside-aamu/news/designation-follows-aamu-hosting-national-artificial-intelligence-summit.html', type:'Verified public fact' as Claim },
  { id:'03', title:'AAMU AI/ML & Cybersecurity Center', detail:'AI/ML, threat intelligence, edge AI, data science, defense, energy, assistive tech, LLMs and VLMs.', url:'https://www.aamu.edu/research-economic-development/aamu-rise/ai-cyber.html', type:'Verified public fact' as Claim },
  { id:'04', title:'AAMU + Sandia AI Cage', detail:'Autonomy and unmanned-systems research infrastructure with funded research relationships.', url:'https://www.aamu.edu/about/inside-aamu/news/aamu-students-will-conduct-artificial-intelligence-ai-research.html', type:'Verified public fact' as Claim },
  { id:'05', title:'IDC Oakwood AI Studio + Engineering Lab', detail:'May 26 walkthrough, 71 resource cards / 70 unique image URLs, room/power/network assessment, June 2026 proposal and budget.', url:'https://oakwood-ai-hub.vercel.app/ai-lab-idc/', type:'IDC documented evidence' as Claim },
  { id:'06', title:'Oakwood AI Lab — final strategy', detail:'10-seat production-lab strategy, architecture, investment tiers and implementation framework.', url:'https://oakwood-ai-hub.vercel.app/ai-lab-final/', type:'IDC documented evidence' as Claim },
  { id:'07', title:'OU Campus Companion — enhanced', detail:'Deployed application and repository artifacts used as the first Proof Ledger case.', url:'https://ou-campus-companion-murex.vercel.app', type:'IDC documented evidence' as Claim },
  { id:'08', title:'Original Oakwood pathway vision', detail:'The nearly year-old Gamma presentation that initiated the broader enhancement/infusion concept.', url:'https://oakwood-universitys-path-9dqzx1y.gamma.site/', type:'IDC documented evidence' as Claim }
]

function ClaimTag({ children }: { children: React.ReactNode }) {
  const text = String(children)
  const cls = text.startsWith('Verified') ? 'verified' : text.startsWith('IDC') ? 'documented' : text.startsWith('Planning') ? 'estimate' : 'target'
  return <span className={`claim ${cls}`}>{children}</span>
}

function SectionHead({ index, eyebrow, title, intro }: { index:string, eyebrow:string, title:string, intro:string }) {
  return <header className="section-head reveal">
    <div className="chapter-index">{index}</div>
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-intro">{intro}</p>
    </div>
  </header>
}

function ScorePanel({ name, score, confidence, items, tone }: { name:string, score:number, confidence:string, items:(string|number)[][], tone:'maroon'|'gold' }) {
  return <article className={`score-panel ${tone} reveal`}>
    <div className="score-top">
      <div><p className="micro">PUBLIC PROGRAM ASSESSMENT</p><h3>{name}</h3></div>
      <div className="score-number"><span>{score}</span><small>/100</small></div>
    </div>
    <div className="score-bars">
      {items.map(([label,val,max]) => <div className="score-row" key={String(label)}>
        <div className="score-label"><span>{label}</span><b>{val}/{max}</b></div>
        <div className="bar"><i style={{width:`${Number(val)/Number(max)*100}%`}} /></div>
      </div>)}
    </div>
    <div className="confidence"><Gauge size={16}/><span>Assessment confidence</span><b>{confidence}</b></div>
  </article>
}

function LabMap() {
  const [active, setActive] = useState('Shared local inference')
  const zones = [
    ['Maker seats ×6','Build, test and run local models'], ['Specialist seats ×2','Media/3D + security/evaluation'],
    ['Faculty console','Orchestration and reproducibility'], ['Adaptive/demo seat','Accessible work + employer demos'],
    ['Shared local inference','Memory-first model serving'], ['Edge & fabrication','Robotics, sensors, soldering, 3D print'],
    ['Proof wall','Live artifacts, evals and outcomes'], ['Evidence vault','Provenance, backup and access control']
  ]
  return <div className="lab-interactive reveal">
    <div className="lab-stage" role="img" aria-label="Interactive diagram of the proposed 10-seat AI production and proof lab">
      <div className="signal-line" />
      <div className="seat-grid">
        {[1,2,3,4,5,6].map(n=><button key={n} onClick={()=>setActive('Maker seats ×6')} className={active==='Maker seats ×6'?'active':''}><Cpu/><span>M{n}</span></button>)}
        <button onClick={()=>setActive('Specialist seats ×2')} className={active==='Specialist seats ×2'?'special active':'special'}><Sparkles/><span>MEDIA</span></button>
        <button onClick={()=>setActive('Specialist seats ×2')} className={active==='Specialist seats ×2'?'special active':'special'}><ShieldCheck/><span>SEC</span></button>
        <button onClick={()=>setActive('Faculty console')} className={active==='Faculty console'?'faculty active':'faculty'}><PanelTop/><span>FACULTY</span></button>
        <button onClick={()=>setActive('Adaptive/demo seat')} className={active==='Adaptive/demo seat'?'demo active':'demo'}><Eye/><span>DEMO</span></button>
      </div>
      <button className={`core-node ${active==='Shared local inference'?'active':''}`} onClick={()=>setActive('Shared local inference')}><Server/><span>LOCAL<br/>INFERENCE</span></button>
      <button className={`edge-node ${active==='Edge & fabrication'?'active':''}`} onClick={()=>setActive('Edge & fabrication')}><Hammer/><span>EDGE + FAB</span></button>
      <button className={`wall-node ${active==='Proof wall'?'active':''}`} onClick={()=>setActive('Proof wall')}><Radar/><span>PROOF WALL</span></button>
      <button className={`vault-node ${active==='Evidence vault'?'active':''}`} onClick={()=>setActive('Evidence vault')}><LockKeyhole/><span>EVIDENCE VAULT</span></button>
    </div>
    <div className="zone-list">
      {zones.map(([name,desc])=><button key={name} onClick={()=>setActive(name)} className={active===name?'active':''}><span>{name}</span><small>{desc}</small><ChevronRight size={16}/></button>)}
    </div>
  </div>
}

function ProofCalculator() {
  const [v, setV] = useState<ProofValues>({artifact:20,evidence:14,safety:10,fluency:12,impact:8,collaboration:8})
  const rows: [keyof ProofValues,string,number][] = [
    ['artifact','Shipped artifact',25], ['evidence','Evidence completeness',20], ['safety','Reliability & safety',15],
    ['fluency','AI fluency',15], ['impact','User / research impact',15], ['collaboration','Collaboration & reflection',10]
  ]
  const raw = Object.values(v).reduce((a,b)=>a+b,0)
  const noArtifact = v.artifact < 8
  const noEvidence = v.evidence < 6
  const score = Math.min(raw, noArtifact ? 60 : 100, noEvidence ? 55 : 100)
  const grade = score>=90?'Exceptional proof':score>=80?'Strong proof':score>=70?'Credible proof':score>=60?'Developing proof':'Insufficient evidence'
  return <div className="proof-calculator reveal">
    <div className="proof-controls">
      {rows.map(([key,label,max])=><label key={key}>
        <span>{label}<b>{v[key]}/{max}</b></span>
        <input aria-label={label} type="range" min="0" max={max} value={v[key]} onChange={e=>setV({...v,[key]:Number(e.target.value)})}/>
      </label>)}
    </div>
    <div className="proof-result">
      <div className="proof-ring" style={{'--proof':`${score*3.6}deg`} as React.CSSProperties}><div><strong>{score}</strong><span>/100</span></div></div>
      <p className="micro">BODY-OF-WORK CONFIDENCE</p><h3>{grade}</h3>
      <p>Credentials become believable when a recruiter can move from the claim to the artifact, then to the test and contribution trail.</p>
      {(noArtifact||noEvidence)&&<div className="cap-alert"><CircleAlert size={16}/>Anti-gaming cap applied: {noArtifact?'no reproducible shipped artifact.':'evidence packet is incomplete.'}</div>}
    </div>
  </div>
}

function MotionCursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; el.dataset.active = 'true' }
    const leave = () => { el.dataset.active = 'false' }
    const tick = () => {
      x += (tx - x) * .16; y += (ty - y) * .16
      el.style.transform = `translate3d(${x}px,${y}px,0)`
      raf = requestAnimationFrame(tick)
    }
    addEventListener('pointermove', move, { passive:true }); document.addEventListener('mouseleave', leave); tick()
    return () => { removeEventListener('pointermove', move); document.removeEventListener('mouseleave', leave); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className="motion-cursor" aria-hidden="true"><i/><span/></div>
}

function ProofConstellation() {
  const wrapRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const labels = ['IDEA','BUILD','VERIFY','OPPORTUNITY','LOCAL','EDGE','GOVERN','RESEARCH']
    const orbit = [[.57,.36],[.69,.22],[.82,.36],[.8,.64],[.3,.72],[.54,.77],[.61,.52],[.45,.56]]
    const system = [[.16,.64],[.43,.64],[.68,.64],[.9,.64],[.39,.41],[.6,.84],[.79,.39],[.59,.37]]
    let w=0,h=0,dpr=1,progress=reduce?1:0,target=progress,px=.5,py=.5,raf=0,visible=true
    const resize=()=>{
      const r=canvas.getBoundingClientRect(); dpr=Math.min(devicePixelRatio||1,2); w=r.width; h=r.height
      canvas.width=Math.round(w*dpr); canvas.height=Math.round(h*dpr); ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    const pointer=(e:PointerEvent)=>{const r=wrap.getBoundingClientRect();px=(e.clientX-r.left)/r.width;py=(e.clientY-r.top)/r.height}
    const scroll=()=>{const r=wrap.getBoundingClientRect();target=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)));wrap.style.setProperty('--constellation-progress',String(target))}
    const lerp=(a:number,b:number,t:number)=>a+(b-a)*t
    const draw=()=>{
      raf=0
      progress += (target-progress)*(reduce?1:.075)
      ctx.clearRect(0,0,w,h)
      const cx=w/2+(px-.5)*14, cy=h/2+(py-.5)*10
      const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(w,h)*.58)
      glow.addColorStop(0,'rgba(30,95,150,.22)');glow.addColorStop(.5,'rgba(17,58,98,.08)');glow.addColorStop(1,'rgba(7,21,34,0)')
      ctx.fillStyle=glow;ctx.fillRect(0,0,w,h)
      ctx.strokeStyle='rgba(227,181,72,.12)';ctx.lineWidth=1
      ;[.15,.28,.42].forEach(r=>{ctx.beginPath();ctx.arc(cx,cy,Math.min(w,h)*r,0,Math.PI*2);ctx.stroke()})
      const mobile=w<600
      const pts=orbit.map((p,i)=>{const nx=lerp(p[0],system[i][0],progress),ny=lerp(p[1],system[i][1],progress);return[nx*w,(mobile?.43+ny*.5:ny)*h]})
      const links=[[0,1],[1,2],[2,3],[4,1],[5,2],[6,2],[7,1],[7,2]]
      links.forEach(([a,b],i)=>{
        const active=Math.max(0,Math.min(1,progress*1.4-i*.035))
        const g=ctx.createLinearGradient(pts[a][0],pts[a][1],pts[b][0],pts[b][1]);g.addColorStop(0,`rgba(227,181,72,${.18+.55*active})`);g.addColorStop(1,`rgba(30,95,150,${.2+.45*active})`)
        ctx.strokeStyle=g;ctx.lineWidth=i<3?2:1;ctx.beginPath();ctx.moveTo(pts[a][0],pts[a][1]);ctx.lineTo(pts[b][0],pts[b][1]);ctx.stroke()
      })
      pts.forEach(([x,y],i)=>{
        const main=i<4, pulse=reduce?0:(Math.sin(performance.now()/700+i)+1)*.5
        ctx.fillStyle=main?'#e3b548':'#1e5f96';ctx.beginPath();ctx.arc(x,y,(main?7:5)+pulse*2,0,Math.PI*2);ctx.fill()
        ctx.strokeStyle=main?'rgba(227,181,72,.35)':'rgba(86,157,213,.3)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,(main?17:13)+pulse*4,0,Math.PI*2);ctx.stroke()
        const labelAlpha=reduce?1:Math.min(1,Math.abs(progress-.5)*3.2)
        ctx.globalAlpha=labelAlpha;ctx.fillStyle=main?'#f7e5ae':'#b9d9ef';ctx.font=`500 ${main?11:9}px DM Mono, monospace`;ctx.textAlign='center';ctx.fillText(labels[i],x,y+(main?34:27));ctx.globalAlpha=1
      })
      if(!reduce&&visible)raf=requestAnimationFrame(draw)
    }
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!raf&&!reduce)draw()},{rootMargin:'100px'})
    observer.observe(wrap)
    resize();scroll();addEventListener('resize',resize);addEventListener('scroll',scroll,{passive:true});wrap.addEventListener('pointermove',pointer,{passive:true});draw()
    return()=>{removeEventListener('resize',resize);removeEventListener('scroll',scroll);wrap.removeEventListener('pointermove',pointer);observer.disconnect();cancelAnimationFrame(raf)}
  },[])
  return <section ref={wrapRef} className="constellation" aria-labelledby="constellation-title">
    <div className="constellation-sticky">
      <canvas ref={canvasRef} aria-hidden="true"/>
      <div className="constellation-copy">
        <p className="eyebrow">THE SYSTEM COMES ALIVE</p>
        <h2 id="constellation-title">From scattered capability to a visible <em>proof network.</em></h2>
        <p>Scroll to reorganize Oakwood’s assets into one operating path. Every connection must end in work that can be inspected.</p>
      </div>
      <div className="constellation-phases" aria-hidden="true"><span>CAPABILITY</span><span>COORDINATION</span><span>PROOF</span></div>
      <p className="sr-only">A visual model connects idea, build, verification and opportunity with local AI, edge systems, governance and research.</p>
    </div>
  </section>
}

export default function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  const [activeSection,setActiveSection] = useState('benchmark')
  const [progress,setProgress] = useState(0)
  const year = useMemo(()=>new Date().getFullYear(),[])

  useEffect(()=>{
    document.documentElement.classList.add('motion-ready')
    const update=()=>{
      const max=document.documentElement.scrollHeight-innerHeight
      const pct=max>0?scrollY/max*100:0
      setProgress(pct)
      document.documentElement.style.setProperty('--page-progress',String(pct/100))
      document.documentElement.style.setProperty('--hero-scroll',String(Math.min(1,scrollY/Math.max(1,innerHeight))))
      let current='benchmark'
      document.querySelectorAll<HTMLElement>('section[id]').forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.42) current=s.id})
      setActiveSection(current)
    }
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('shown')}),{threshold:.12})
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el))
    addEventListener('scroll',update,{passive:true});update()
    return()=>{removeEventListener('scroll',update);io.disconnect();document.documentElement.classList.remove('motion-ready')}
  },[])

  return <>
    <MotionCursor/>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="progress" style={{width:`${progress}%`}} />
    <header className="topbar">
      <a className="brand" href="#top" aria-label="IDC × OAKWOOD home"><img src="./assets/idc-mark.png" alt=""/><span>IDC <i>×</i> OAKWOOD</span></a>
      <nav aria-label="Primary navigation">
        {nav.slice(0,5).map(([id,label])=><a className={activeSection===id?'active':''} key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <a className="evidence-link" href="#evidence">Evidence index <FileCheck2 size={15}/></a>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen?<X/>:<Menu/>}</button>
    </header>
    {menuOpen&&<div className="mobile-menu">{nav.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}</a>)}</div>}

    <main id="main">
      <section className="hero" id="top">
        <div className="hero-photo"><img fetchPriority="high" decoding="async" src="./assets/concept-lab-hero.webp" alt="Concept rendering of an Oakwood AI production studio"/><span><Sparkles size={14}/> Concept rendering · proposed future state</span></div>
        <div className="hero-grain" />
        <div className="hero-copy">
          <div className="hero-meta"><span>IDC PLANS FOR OAKWOOD</span><span>AUGUST 2026</span><span>IMMERSIVE SYSTEM · MOTION PASS</span></div>
          <h1>The race was never to announce <em>AI</em> first.</h1>
          <p className="hero-thesis">It is to turn AI into <strong>proof</strong>—work students can ship, defend, and carry into opportunity.</p>
          <div className="hero-actions"><a className="button primary" href="#benchmark">Read the benchmark <ArrowDown size={18}/></a><a className="button ghost" href="#model">See the 2× model <ArrowUpRight size={18}/></a></div>
        </div>
        <div className="hero-ledger"><div><b>86</b><span>AAMU public program</span></div><div><b>78</b><span>Current IDC blueprint</span></div><div><b>01</b><span>Oakwood opening</span></div></div>
      </section>

      <section className="reality paper" id="reality">
        <SectionHead index="00" eyebrow="THE AUGUST 2026 RESET" title="The technology changed. The institutional question did not." intro="AI is no longer one chat window or one GPU. The opportunity is an operating system that moves students across cloud, local, edge, research, security and public proof." />
        <div className="reality-grid">
          {[
            [Workflow,'Agentic systems','Software now observes, plans, uses tools and completes multi-step computer work—requiring oversight, testing and traceability.'],
            [Server,'Local + open models','High-memory desktop systems make private inference, adaptation and evaluation practical inside a teaching lab.'],
            [Eye,'Multimodal creation','Text, image, audio, video and spatial workflows now converge into one production environment.'],
            [Orbit,'Physical AI','Robotics and edge systems force models to meet latency, safety, sensor and energy constraints.'],
            [Scale,'Evaluation + governance','Capability without provenance, privacy, red-teaming and human accountability is an institutional liability.'],
            [Fingerprint,'Proof over credentials','Employers need trustworthy evidence of what a candidate built, how it was tested and what changed for a user.']
          ].map(([Icon,title,desc])=>{const C=Icon as typeof Workflow;return <article className="reality-item reveal" key={String(title)}><C/><h3>{String(title)}</h3><p>{String(desc)}</p></article>})}
        </div>
      </section>

      <ProofConstellation/>

      <section className="benchmark" id="benchmark">
        <SectionHead index="01" eyebrow="A LAYER-AWARE BENCHMARK" title="AAMU institutionalized. IDC operationalized." intro="AAMU is a degree and research ecosystem. IDC’s Oakwood work is an implementation and production blueprint. The comparison is most useful when it respects that difference." />
        <div className="correction reveal"><CircleAlert/><div><b>Evidence correction</b><p>AAMU is not proven to be the first HBCU ever to offer AI programming. What the official evidence does establish is substantial: a published 125-credit B.S. in Artificial Intelligence for 2026–2027, an existing AI concentration, an AI Cage, a research center, university AI policy and AWS–MLU regional-lead status.</p></div><ClaimTag>Verified public fact</ClaimTag></div>
        <div className="score-grid"><ScorePanel name="Alabama A&M" score={86} confidence="0.90" items={aamuScores} tone="maroon"/><ScorePanel name="IDC × Oakwood — current" score={78} confidence="0.84" items={idcScores} tone="gold"/></div>
        <div className="benchmark-insight reveal"><p className="micro">THE STRATEGIC INTERPRETATION</p><blockquote>AAMU’s moat is institutional depth. Oakwood’s opening is a smaller, faster system that makes student capability <em>visible and trusted</em>.</blockquote></div>
        <div className="curriculum-strip reveal">
          <div className="strip-head"><GraduationCap/><div><p className="micro">AAMU · 125 CREDIT HOURS</p><h3>Published AI major spine</h3></div></div>
          <div className="year-columns">
            <div><span>YEAR 1</span><p>Calculus I–II · ethics · computing · Python II · composition</p></div>
            <div><span>YEAR 2</span><p>Physics I–II · programming · Java · discrete structures · data structures</p></div>
            <div><span>YEAR 3</span><p>Linear algebra · AI conceptions · graphics · systems · robotics · cognitive psychology</p></div>
            <div><span>YEAR 4</span><p>ML · AI · deep learning · RL · NLP · speech · HPC · two-part capstone</p></div>
          </div>
          <a href={sources[0].url} target="_blank" rel="noreferrer">Open official bulletin <ExternalLink size={15}/></a>
        </div>
      </section>

      <section className="assets paper" id="assets">
        <SectionHead index="02" eyebrow="THE BODY OF WORK ALREADY EXISTS" title="Oakwood is not starting from zero." intro="The opportunity is to compile the vision, room evidence, curriculum, infrastructure and shipped software into one institutional system—not another isolated presentation." />
        <div className="asset-mosaic">
          <article className="asset feature reveal"><img loading="lazy" decoding="async" src="./assets/evidence-power-data.webp" alt="Verified Oakwood room power and data condition"/><div className="asset-overlay"><ClaimTag>IDC documented evidence</ClaimTag><h3>70 unique on-site images</h3><p>May 26, 2026 walkthrough of Rooms 409, 407, 305/310, MDF, power, data, HVAC, windows and reusable assets. The public resource page contains 71 cards; one image URL is duplicated.</p></div></article>
          <article className="asset reveal"><img loading="lazy" decoding="async" src="./assets/evidence-benches.webp" alt="Reusable blue engineering benches at Oakwood"/><div><span className="micro">REUSE BEFORE REPLACE</span><h3>Engineering benches</h3></div></article>
          <article className="asset reveal"><img loading="lazy" decoding="async" src="./assets/evidence-printers.webp" alt="Existing 3D printers at Oakwood"/><div><span className="micro">EXISTING CAPACITY</span><h3>Fabrication foothold</h3></div></article>
          <article className="asset dark reveal"><div className="big-mark">Γ</div><div><span className="micro">VISION · 2025</span><h3>Oakwood’s Path</h3><p>The original Gamma narrative established the institution-wide infusion theme.</p><a href={sources[7].url} target="_blank" rel="noreferrer">Open original <ArrowUpRight/></a></div></article>
          <article className="asset dark reveal"><div className="big-mark"><Cpu/></div><div><span className="micro">IMPLEMENTATION · 2026</span><h3>AI Lab IDC</h3><p>Room-grounded build, funding firewall, budget, contractor lanes and execution sequence.</p><a href={sources[4].url} target="_blank" rel="noreferrer">Open lab hub <ArrowUpRight/></a></div></article>
        </div>
        <div className="campus-case reveal">
          <div className="case-copy"><p className="eyebrow">FIRST PROOF LEDGER CASE</p><h3>Campus Companion</h3><p>The CS Club’s 12-student build was a meaningful initiative. IDC’s enhancement shows what happens when that initiative is paired with AI-assisted engineering, accessibility, reliability, richer content and a production closeout discipline.</p><div className="case-rule"><HeartHandshake/><span>The lesson is not “AI replaced the students.” It is “AI mentorship increased what the team could finish, verify and show.”</span></div><a className="text-link" href="https://ou-campus-showcase.vercel.app" target="_blank" rel="noreferrer">View comparison evidence <ArrowUpRight/></a></div>
          <div className="case-stats"><div><b>51</b><span>buildings documented</span></div><div><b>60</b><span>live department entries</span></div><div><b>94</b><span>accessibility attributes</span></div><div><b>27</b><span>recorded iterations</span></div></div>
        </div>
      </section>

      <section className="model" id="model">
        <SectionHead index="03" eyebrow="THE 2× IMPROVEMENT" title="Foundations. Studio. Proof." intro="Not twice the hardware. Twice the conversion from coursework into trusted opportunity." />
        <div className="three-lanes reveal">
          <article><span>01</span><BookOpen/><h3>Foundations</h3><p>Mathematics, systems, algorithms, ML, security and responsible-AI rigor that can survive beyond the tool of the month.</p><ul><li>Calculus · linear algebra · probability</li><li>Data structures · systems · networks</li><li>ML · NLP · vision · robotics</li><li>Policy · privacy · accessibility</li></ul></article>
          <article className="accent"><span>02</span><Rocket/><h3>Studio</h3><p>Every semester closes on a deployed application, reproducible experiment, physical system or community service.</p><ul><li>Cloud + local + edge workflows</li><li>Cross-disciplinary problem sponsors</li><li>Employer and user review</li><li>Maintenance after demo day</li></ul></article>
          <article><span>03</span><BadgeCheck/><h3>Proof</h3><p>A durable evidence trail turns each artifact into a credible signal for employers, graduate programs and funders.</p><ul><li>Repository · release · live demo</li><li>Evals · tests · threat model</li><li>Data/model/provenance cards</li><li>Contribution and impact record</li></ul></article>
        </div>
        <div className="signal-path reveal" aria-label="Idea to opportunity proof path"><span><BrainCircuit/>IDEA</span><i/><span><Code2/>BUILD</span><i/><span><TestTube2/>VERIFY</span><i/><span><BriefcaseBusiness/>OPPORTUNITY</span></div>
      </section>

      <section className="lab paper" id="lab">
        <SectionHead index="04" eyebrow="THE PHYSICAL OPERATING SYSTEM" title="A 10-seat lab designed around work—not brands." intro="Vendor-neutral by principle: procure memory, support, throughput, reliability and curriculum fit. Validate Oakwood’s actual workloads before scaling one architecture." />
        <LabMap/>
        <div className="gates reveal">
          <div className="gates-title"><LockKeyhole/><div><p className="micro">NON-NEGOTIABLE PROCUREMENT GATES</p><h3>Infrastructure before spectacle.</h3></div></div>
          <ol><li><b>Electrical.</b> Licensed load study and FPE-panel decision before compute is energized.</li><li><b>Network.</b> Campus IT approval for identity, VLANs, logging, switching and remote management.</li><li><b>Environment.</b> Cooling, acoustics, egress and accessibility review against measured rooms.</li><li><b>Funding.</b> Separate equipment from facility labor; obtain sealed trade quotes.</li><li><b>Bake-off.</b> Test candidate systems on real local-model, media, edge and student workloads.</li><li><b>Ownership.</b> Sign annual sustainment, lab-owner and student-assistant plans before purchase.</li></ol>
        </div>
        <div className="concept-gallery reveal"><figure><img loading="lazy" decoding="async" src="./assets/concept-floorplan.webp" alt="Concept floor plan for the proposed AI lab"/><figcaption><ClaimTag>Proposed target</ClaimTag> Concept floor plan—not a measured construction document.</figcaption></figure><figure><img loading="lazy" decoding="async" src="./assets/concept-hardware-wall.webp" alt="Concept hardware wall for the proposed AI lab"/><figcaption><ClaimTag>Proposed target</ClaimTag> Hardware-wall visualization; final brands follow bake-off and campus standards.</figcaption></figure></div>
      </section>

      <section className="curriculum" id="curriculum">
        <SectionHead index="05" eyebrow="THE STUDIO CURRICULUM" title="Eight studios. Eight finished products." intro="A four-year AI/CS foundation can adopt these as rotating studios, minors, certificates or capstone overlays. Each terminates in evidence, not attendance." />
        <div className="studio-list">{studios.map(({n,icon:Icon,title,desc,output})=><article className="studio reveal" key={n}><span className="studio-num">{n}</span><Icon/><div><h3>{title}</h3><p>{desc}</p></div><aside><small>PROOF OUTPUT</small><b>{output}</b></aside></article>)}</div>
        <div className="ethics-spine reveal"><Scale/><div><p className="eyebrow">OAKWOOD’S DISTINCTIVE LENS</p><h3>Responsible AI becomes operational—not ornamental.</h3><p>The Adventist formation layer can connect human dignity, stewardship, truthfulness, service, rest and accountability to concrete controls: consent, provenance, access, evaluation, human review and incident response. John Lennox’s <em>2084 and the AI Revolution</em> can remain one seminar voice, not the whole governance framework.</p></div></div>
      </section>

      <section className="proof paper" id="proof">
        <SectionHead index="06" eyebrow="THE EMPLOYER SIGNAL" title="A transcript says what was studied. The Proof Ledger shows what survived contact with reality." intro="A 100-point body-of-work confidence score makes claims inspectable—while anti-gaming caps prevent polish from outrunning evidence." />
        <ProofCalculator/>
        <div className="portability reveal"><div><Link2/><h3>LinkedIn is a destination—not the source of truth.</h3><p>The ledger can generate a public credential page for Featured, an Open Badge / verifiable record, concise skill statements and an employer evidence packet.</p></div><div className="boundary"><CircleAlert/><p><b>Boundary:</b> this does not claim LinkedIn currently permits a custom candidate-ranking algorithm or open scoring API. Direct integration requires supported credential surfaces or a formal partner API.</p></div></div>
        <div className="ledger-fields reveal">
          {['Live artifact','Tagged release','Tests + evals','Architecture record','Model / data card','Threat model','Accessibility check','Contribution trail','User impact','Mentor attestation'].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span><Check/><b>{x}</b></div>)}
        </div>
      </section>

      <section className="roadmap" id="roadmap">
        <SectionHead index="07" eyebrow="FROM PROPOSAL TO PROOF" title="One year. Four gates. No theater." intro="Success is measured in verified artifacts, resolved risks, student opportunity and repeatable institutional capacity—not equipment delivery alone." />
        <div className="roadmap-line reveal">
          {[
            ['0–30','Govern','Charter · room validation · workload bake-off · curriculum council · employer circle'],
            ['31–90','Commission','Facility work · network/security baseline · hardware · faculty training · proof templates'],
            ['SEM 1','Pilot','10–15 students · Campus Companion reference case · four shipped products · public review'],
            ['SEM 2','Expand','Cross-disciplinary studio · local + physical AI · employer reviews · credential pilot'],
            ['DAY 365','Publish','Outcomes report · artifact quality · defects closed · interviews · adoption · research']
          ].map(([time,title,desc],i)=><article key={time}><span>{time}</span><div className="road-dot">{i+1}</div><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
        <div className="decision-room reveal"><div><p className="eyebrow">THE NEXT MEETING NEEDS THREE DECISIONS</p><h2>Turn the window into a mandate.</h2></div><ol><li><b>Academic home</b><span>Degree overlay, certificate, minor or pilot studio?</span></li><li><b>Funding lane</b><span>Equipment, facility and sustainment sources—separated cleanly.</span></li><li><b>Owner + date</b><span>Named lab owner, pilot cohort and first public demo deadline.</span></li></ol></div>
      </section>

      <section className="evidence paper" id="evidence">
        <SectionHead index="08" eyebrow="SOURCE & CLAIM LEDGER" title="Confidence comes from showing the seams." intro="Public facts, IDC evidence, estimates and proposed targets are intentionally separated. Open the sources; challenge the interpretation." />
        <div className="source-list">{sources.map(s=><a className="source reveal" href={s.url} target="_blank" rel="noreferrer" key={s.id}><span>{s.id}</span><div><ClaimTag>{s.type}</ClaimTag><h3>{s.title}</h3><p>{s.detail}</p></div><ExternalLink/></a>)}</div>
        <div className="evidence-note reveal"><FileCheck2/><div><h3>What the grade does—and does not—claim</h3><p>It grades public evidence available on August 21, 2026. It cannot independently verify classroom delivery quality, unpublished faculty capacity, student enrollment, procurement approval or outcomes that have not matured. IDC impact targets remain proposed until cohorts and employer results are measured.</p></div></div>
      </section>
    </main>

    <footer><div className="footer-brand"><img src="./assets/idc-mark.png" alt="Island Development Crew mark"/><div><b>Island Development Crew</b><span>AI systems · product evidence · institutional transformation</span></div></div><div className="footer-meta"><span>Prepared for Oakwood University exploration</span><span>August 21, 2026</span><span>© {year} IDC</span></div><a href="#top" aria-label="Back to top">Back to top <Zap size={16}/></a></footer>
  </>
}
