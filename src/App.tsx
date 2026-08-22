import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown, ArrowUpRight, BadgeCheck, BookOpen, BrainCircuit, BriefcaseBusiness,
  Building2, Check, ChevronRight, CircleAlert, Cloud, Code2, Cpu, Database,
  ExternalLink, Eye, FileCheck2, Fingerprint, Gauge, GraduationCap,
  Hammer, HeartHandshake, Landmark, Layers3, Link2, LockKeyhole, Menu, Microscope,
  Network, Orbit, PanelTop, Radar, Rocket, Scale, Search, Server, ShieldCheck, Sparkles,
  SquareTerminal, TestTube2, Users, Workflow, X, Zap
} from 'lucide-react'

type Claim = 'Verified public fact' | 'Oakwood verified public fact' | 'Oakwood official marketing claim' | 'IDC documented evidence' | 'Curriculum inference' | 'Catalog conflict / clarification required' | 'Unverified / needs confirmation' | 'Planning estimate' | 'Proposed target'
type ClaimKind = 'verified' | 'oakwood' | 'marketing' | 'documented' | 'inference' | 'conflict' | 'unknown' | 'estimate' | 'target'

const claimKindByLabel: Record<Claim, ClaimKind> = {
  'Verified public fact':'verified',
  'Oakwood verified public fact':'oakwood',
  'Oakwood official marketing claim':'marketing',
  'IDC documented evidence':'documented',
  'Curriculum inference':'inference',
  'Catalog conflict / clarification required':'conflict',
  'Unverified / needs confirmation':'unknown',
  'Planning estimate':'estimate',
  'Proposed target':'target'
}

type ProofValues = {
  artifact: number
  evidence: number
  safety: number
  fluency: number
  impact: number
  collaboration: number
}

const nav = [
  ['benchmark', 'Evidence map'], ['foundation', 'Oakwood base'], ['assets', 'Field proof'], ['model', '2× model'],
  ['lab', '10-seat lab'], ['curriculum', 'Curriculum'], ['proof', 'Proof Ledger'],
  ['roadmap', 'Roadmap'], ['evidence', 'Evidence']
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
  { id:'05', title:'Oakwood 2025–2027 Undergraduate & Graduate Bulletin', detail:'Official 522-page catalog governing the 2026–27 academic year and publishing current degrees, requirements and courses.', url:'https://catalog.oakwood.edu/sites/default/files/pdf/pdf_generator/20252027-undergraduate-and-graduate-bulletin.pdf?1756418115=', type:'Oakwood verified public fact' as Claim },
  { id:'06', title:'Oakwood B.S. in Computer Science', detail:'Official degree with algorithms, systems, mathematics and research. The bulletin presents conflicting 120- and 121-hour curriculum totals; registrar clarification is required.', url:'https://catalog.oakwood.edu/computer-science/bachelor-of-science/bachelor-of-science-in-computer-science-0', type:'Catalog conflict / clarification required' as Claim },
  { id:'07', title:'Oakwood B.S. in Management Information Systems', detail:'Official 120-credit degree spanning programming, networks, databases, information security, project management and business.', url:'https://catalog.oakwood.edu/business-and-information-systems/bachelor-of-science/bachelor-of-science-in-management-information', type:'Oakwood verified public fact' as Claim },
  { id:'08', title:'Oakwood Applied Mathematics pathways', detail:'Official quantitative foundation with Computer Science and Quantitative Science concentrations.', url:'https://catalog.oakwood.edu/mathematics/associate-of-science/bachelor-of-science-in-applied-mathematics', type:'Oakwood verified public fact' as Claim },
  { id:'09', title:'Oakwood adult B.S. in Information Technology', detail:'Official 120-credit adult/continuing-education degree requiring prior IT coursework or experience.', url:'https://catalog.oakwood.edu/adult-and-continuing-education/bachelor-of-science/bachelor-of-science-in-information-technology', type:'Oakwood verified public fact' as Claim },
  { id:'10', title:'IDC Oakwood AI Studio + Engineering Lab', detail:'May 26 walkthrough, 71 resource cards / 70 unique image URLs, room/power/network assessment, June 2026 proposal and budget.', url:'https://oakwood-ai-hub.vercel.app/ai-lab-idc/', type:'IDC documented evidence' as Claim },
  { id:'11', title:'Oakwood AI Lab — final strategy', detail:'10-seat production-lab strategy, architecture, investment tiers and implementation framework.', url:'https://oakwood-ai-hub.vercel.app/ai-lab-final/', type:'IDC documented evidence' as Claim },
  { id:'12', title:'OU Campus Companion — enhanced', detail:'Deployed application and repository artifacts used as the first Proof Ledger case.', url:'https://ou-campus-companion-murex.vercel.app', type:'IDC documented evidence' as Claim },
  { id:'13', title:'Original Oakwood pathway vision', detail:'The nearly year-old Gamma presentation that initiated the broader enhancement/infusion concept.', url:'https://oakwood-universitys-path-9dqzx1y.gamma.site/', type:'IDC documented evidence' as Claim },
  { id:'14', title:'Oakwood B.A. in Computer Networks', detail:'Official 120-credit program covering programming, systems, networks, algorithms, statistics, selected topics and research.', url:'https://catalog.oakwood.edu/computer-science/bachelor-of-arts/bachelor-of-arts-in-computer-networks', type:'Oakwood verified public fact' as Claim },
  { id:'15', title:'Oakwood Computer Science minor', detail:'Official 18-credit minor built from programming, data structures, logic design, programming languages and CS electives.', url:'https://catalog.oakwood.edu/computer-science/minor/minor-in-computer-science', type:'Oakwood verified public fact' as Claim },
  { id:'16', title:'Oakwood technology-program page', detail:'Official marketing mentions AI, cybersecurity, cloud computing and modern labs. This is a first-party marketing claim—not evidence of an approved AI program or named AI lab.', url:'https://oakwood.edu/computer-science-computer-networks-information-technology/', type:'Oakwood official marketing claim' as Claim }
]

function ClaimTag({ kind, children }: { kind: ClaimKind, children: React.ReactNode }) {
  return <span className={`claim ${kind}`} data-claim-kind={kind}>{children}</span>
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


function LabMap() {
  const [active, setActive] = useState('Shared local inference')
  const zones = [
    ['Maker seats ×6','Build, test and run local models'], ['Specialist seats ×2','Media/3D + security/evaluation'],
    ['Faculty console','Orchestration and reproducibility'], ['Adaptive/demo seat','Accessible work + employer demos'],
    ['Shared local inference','Memory-first model serving'], ['Edge & fabrication','Robotics, sensors, soldering, 3D print'],
    ['Proof wall','Live artifacts, evals and outcomes'], ['Evidence vault','Provenance, backup and access control']
  ]
  const select=(name:string)=>setActive(name)
  return <div className="lab-interactive reveal">
    <div className="lab-stage" data-route={active} aria-label="Interactive diagram of the proposed 10-seat AI production and proof lab">
      <div key={active} className="signal-line" aria-hidden="true" />
      <div className="seat-grid">
        {[1,2,3,4,5,6].map(n=><button key={n} aria-pressed={active==='Maker seats ×6'} onClick={()=>select('Maker seats ×6')} className={active==='Maker seats ×6'?'active':''}><Cpu/><span>M{n}</span></button>)}
        <button aria-pressed={active==='Specialist seats ×2'} onClick={()=>select('Specialist seats ×2')} className={active==='Specialist seats ×2'?'special active':'special'}><Sparkles/><span>MEDIA</span></button>
        <button aria-pressed={active==='Specialist seats ×2'} onClick={()=>select('Specialist seats ×2')} className={active==='Specialist seats ×2'?'special active':'special'}><ShieldCheck/><span>SEC</span></button>
        <button aria-pressed={active==='Faculty console'} onClick={()=>select('Faculty console')} className={active==='Faculty console'?'faculty active':'faculty'}><PanelTop/><span>FACULTY</span></button>
        <button aria-pressed={active==='Adaptive/demo seat'} onClick={()=>select('Adaptive/demo seat')} className={active==='Adaptive/demo seat'?'demo active':'demo'}><Eye/><span>DEMO</span></button>
      </div>
      <button aria-pressed={active==='Shared local inference'} className={`core-node ${active==='Shared local inference'?'active':''}`} onClick={()=>select('Shared local inference')}><Server/><span>LOCAL<br/>INFERENCE</span></button>
      <button aria-pressed={active==='Edge & fabrication'} className={`edge-node ${active==='Edge & fabrication'?'active':''}`} onClick={()=>select('Edge & fabrication')}><Hammer/><span>EDGE + FAB</span></button>
      <button aria-pressed={active==='Proof wall'} className={`wall-node ${active==='Proof wall'?'active':''}`} onClick={()=>select('Proof wall')}><Radar/><span>PROOF WALL</span></button>
      <button aria-pressed={active==='Evidence vault'} className={`vault-node ${active==='Evidence vault'?'active':''}`} onClick={()=>select('Evidence vault')}><LockKeyhole/><span>EVIDENCE VAULT</span></button>
    </div>
    <div className="zone-list">
      <p className="route-readout" aria-live="polite">ROUTE: {active} → LOCAL INFERENCE → PROOF WALL → EVIDENCE VAULT</p>
      {zones.map(([name,desc])=><button key={name} aria-pressed={active===name} onClick={()=>select(name)} className={active===name?'active':''}><span>{name}</span><small>{desc}</small><ChevronRight size={16}/></button>)}
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

type FoundationCluster = {
  id:string
  title:string
  degree:string
  pages:string
  verified:string[]
  bridge:string
  gap:string
  url:string
  flag?:string
}

const foundationClusters: FoundationCluster[] = [
  {
    id:'CS', title:'Computer science', degree:'B.S. · bulletin conflict: 120 / 121 hours', pages:'PDF 177–180',
    verified:['Data structures','Algorithms','Operating systems','Programming languages','Computer architecture','18-credit CS minor'],
    bridge:'A strong software-and-systems spine for AI study.',
    gap:'No named AI or machine-learning course appears in the current bulletin. Oakwood must also clarify which of two overlapping B.S. curriculum totals controls.',
    flag:'Official-source conflict: one bulletin presentation totals 120 hours; another totals 121.',
    url:'https://catalog.oakwood.edu/computer-science/bachelor-of-science/bachelor-of-science-in-computer-science-0'
  },
  {
    id:'NET', title:'Computer networks', degree:'B.A. · 120 credits', pages:'PDF 175–176',
    verified:['C++ programming','Data structures','Operating systems','Computer networks','Advanced networking','Selected topics + research'],
    bridge:'A verified infrastructure spine for secure, networked and edge AI systems.',
    gap:'It is not an AI-systems track today; distributed AI, model serving and AI security would require explicit curriculum work.',
    url:'https://catalog.oakwood.edu/computer-science/bachelor-of-arts/bachelor-of-arts-in-computer-networks'
  },
  {
    id:'MATH', title:'Applied mathematics', degree:'B.S. pathways · official metadata needs clarification', pages:'PDF 163–174',
    verified:['Calculus I–III','Linear algebra','Probability + statistics','Numerical analysis','Differential equations','Quantitative science'],
    bridge:'The mathematical substrate required for serious model work already exists.',
    gap:'AI-specific mathematical applications, model evaluation and data-science sequencing remain curriculum work.',
    flag:'Catalog metadata labels the B.S. page as “Associate of Science”; the program title and requirements describe a bachelor’s program.',
    url:'https://catalog.oakwood.edu/mathematics/associate-of-science/bachelor-of-science-in-applied-mathematics'
  },
  {
    id:'MIS', title:'Information systems', degree:'B.S. · 120 credits', pages:'PDF 211–213',
    verified:['Database management','Information security','Business programming','Networks','Systems analysis','Project management'],
    bridge:'A governance, deployment and organizational-operations lane is already teachable.',
    gap:'Model governance, AI risk, data governance and production evaluation are not named as current courses.',
    url:'https://catalog.oakwood.edu/business-and-information-systems/bachelor-of-science/bachelor-of-science-in-management-information'
  },
  {
    id:'IT', title:'Information technology', degree:'Adult B.S. · 120 credits', pages:'PDF 287–288',
    verified:['Algorithms','Programming','Networks','Modern databases','Information security','Resource management'],
    bridge:'An adult/upskilling route could connect institutional AI capacity to working professionals.',
    gap:'The program requires prior IT preparation and is not evidence of an undergraduate AI major.',
    url:'https://catalog.oakwood.edu/adult-and-continuing-education/bachelor-of-science/bachelor-of-science-in-information-technology'
  }
]

function EvidenceMap() {
  const lanes = [
    {mark:'A', title:'AAMU', tag:'Verified public fact' as Claim, kind:'verified' as ClaimKind, lead:'Published AI program', text:'125-credit B.S. in Artificial Intelligence plus research center, AI Cage and AWS–MLU role.', status:'INSTITUTIONALIZED'},
    {mark:'O', title:'Oakwood', tag:'Oakwood verified public fact' as Claim, kind:'oakwood' as ClaimKind, lead:'Computational foundation', text:'Computer Science, Computer Networks, Applied Mathematics, MIS and adult IT—real academic material, but no named AI pathway in the current bulletin.', status:'FOUNDATION'},
    {mark:'I', title:'IDC × Oakwood', tag:'IDC documented evidence' as Claim, kind:'documented' as ClaimKind, lead:'Implementation blueprint', text:'Room audit, reusable assets, lab strategy, curriculum studios, Campus Companion and proof-ledger system.', status:'DOCUMENTED'},
    {mark:'?', title:'The opening', tag:'Curriculum inference' as Claim, kind:'inference' as ClaimKind, lead:'Recompose + extend', text:'A proposed AI degree, concentration, minor or studio overlay still requires faculty design, governance, accreditation review and ownership.', status:'UNDECIDED'}
  ]
  return <div className="evidence-map reveal">
    {lanes.map((lane,i)=><article key={lane.title} className={`evidence-lane lane-${i}`}>
      <div className="lane-mark">{lane.mark}</div><ClaimTag kind={lane.kind}>{lane.tag}</ClaimTag>
      <p className="lane-status">{lane.status}</p><h3>{lane.title}</h3><strong>{lane.lead}</strong><p>{lane.text}</p>
    </article>)}
  </div>
}

function FoundationInstrument() {
  const [active,setActive]=useState(0)
  const item=foundationClusters[active]
  return <div className="foundation-instrument reveal">
    <div className="bulletin-scan">
      <div className="scan-head"><Search/><span>OFFICIAL BULLETIN QUERY</span><b>2025—2027</b></div>
      <div className="scan-number"><strong>522</strong><span>pages examined</span></div>
      <div className="scan-absence">
        {['ARTIFICIAL INTELLIGENCE','MACHINE LEARNING','DATA SCIENCE','CYBERSECURITY'].map(term=><div key={term}><span>{term}</span><b>0 exact matches</b></div>)}
      </div>
      <p>Absence from the bulletin is not proof that no internal exploration exists. It is proof that no named program or course under these exact terms is published there.</p>
    </div>
    <div className="foundation-console">
      <div className="cluster-tabs" role="tablist" aria-label="Verified Oakwood academic foundations">
        {foundationClusters.map((x,i)=><button role="tab" aria-selected={active===i} key={x.id} onClick={()=>setActive(i)}><span>{x.id}</span><b>{x.title}</b></button>)}
      </div>
      <div className="cluster-readout" role="tabpanel" aria-live="polite">
        <div className="readout-meta"><ClaimTag kind="oakwood">Oakwood verified public fact</ClaimTag><span>{item.pages}</span></div>
        <h3>{item.title}</h3><p className="degree-line">{item.degree}</p>
        {item.flag&&<div className="catalog-flag"><ClaimTag kind="conflict">Catalog conflict / clarification required</ClaimTag><p>{item.flag}</p></div>}
        <div className="course-chips">{item.verified.map(x=><span key={x}>{x}</span>)}</div>
        <div className="bridge-gap"><div><small>WHAT THIS CAN SUPPORT</small><p>{item.bridge}</p></div><div><small>WHAT IS STILL MISSING</small><p>{item.gap}</p></div></div>
        <a href={item.url} target="_blank" rel="noreferrer">Inspect official degree <ExternalLink size={15}/></a>
      </div>
    </div>
  </div>
}

function ProofTrace() {
  const wrapRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const labels = ['ROOM 409','POWER / DATA','REUSE','STUDIO','LOCAL','VERIFY','EVIDENCE VAULT','OPPORTUNITY']
    const field = [[.58,.3],[.77,.28],[.63,.53],[.82,.54],[.47,.76],[.63,.78],[.79,.75],[.91,.75]]
    const commissioned = [[.42,.38],[.59,.38],[.76,.38],[.42,.67],[.57,.67],[.7,.67],[.83,.67],[.94,.67]]
    const mobileField = [[.24,.645],[.5,.625],[.76,.655],[.58,.72],[.38,.78],[.58,.835],[.42,.885],[.62,.91]]
    const mobileCommissioned = [[.2,.64],[.5,.64],[.8,.64],[.5,.71],[.5,.77],[.5,.825],[.5,.875],[.5,.91]]
    const links = [[0,1],[1,3],[2,3],[3,4],[4,5],[5,6],[6,7]]
    let w=0,h=0,dpr=1,progress=reduce?1:0,target=progress,raf=0
    const lerp=(a:number,b:number,t:number)=>a+(b-a)*t
    const resize=()=>{
      const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height
      canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);schedule()
    }
    const scroll=()=>{
      const r=wrap.getBoundingClientRect();target=reduce?1:Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)))
      wrap.style.setProperty('--constellation-progress',String(target));schedule()
    }
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(draw)}
    const draw=()=>{
      raf=0;progress=reduce?1:lerp(progress,target,.12)
      if(Math.abs(progress-target)<.001)progress=target
      ctx.clearRect(0,0,w,h)
      const mobile=w<600
      const from=mobile?mobileField:field,to=mobile?mobileCommissioned:commissioned
      const pts=from.map((p,i)=>[lerp(p[0],to[i][0],progress)*w,lerp(p[1],to[i][1],progress)*h])
      ctx.strokeStyle='rgba(112,149,176,.1)';ctx.lineWidth=1
      const grid=mobile?32:48
      for(let y=70;y<h;y+=grid){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
      for(let x=0;x<w;x+=grid){ctx.beginPath();ctx.moveTo(x,70);ctx.lineTo(x,h);ctx.stroke()}
      links.forEach(([a,b],i)=>{
        const [x1,y1]=pts[a],[x2,y2]=pts[b],mx=lerp(x1,x2,.48)
        ctx.setLineDash([7,8]);ctx.lineDashOffset=-progress*60
        ctx.strokeStyle='rgba(92,134,164,.26)';ctx.lineWidth=1
        ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(mx,y1);ctx.lineTo(mx,y2);ctx.lineTo(x2,y2);ctx.stroke()
        const active=Math.max(0,Math.min(1,progress*1.55-i*.08))
        ctx.setLineDash([]);ctx.strokeStyle=`rgba(227,181,72,${active*.88})`;ctx.lineWidth=2
        ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(mx,y1);ctx.lineTo(mx,y2);ctx.lineTo(x2,y2);ctx.stroke()
      })
      pts.forEach(([x,y],i)=>{
        const main=i>=3,wid=mobile?Math.min(104,Math.max(main?72:58,labels[i].length*5.1)):(main?116:104),hei=mobile?30:36
        ctx.fillStyle=main?'rgba(10,37,57,.96)':'rgba(16,49,71,.92)';ctx.strokeStyle=main?'#e3b548':'#3d82b2';ctx.lineWidth=1.5
        ctx.fillRect(x-wid/2,y-hei/2,wid,hei);ctx.strokeRect(x-wid/2,y-hei/2,wid,hei)
        ctx.fillStyle=main?'#f7e5ae':'#b9d9ef';ctx.font=`500 ${mobile?7:9}px DM Mono, monospace`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(labels[i],x,y)
      })
      if(progress!==target)schedule()
    }
    resize();scroll();addEventListener('resize',resize);addEventListener('scroll',scroll,{passive:true})
    return()=>{removeEventListener('resize',resize);removeEventListener('scroll',scroll);cancelAnimationFrame(raf)}
  },[])
  return <section ref={wrapRef} className="constellation trace-system" aria-labelledby="constellation-title">
    <div className="constellation-sticky">
      <canvas ref={canvasRef} aria-hidden="true" data-mobile-first-node-y="0.625"/>
      <div className="constellation-copy">
        <p className="eyebrow">TRACE → COMMISSION → VERIFY</p>
        <h2 id="constellation-title">Trace the room. Commission the system. <em>Verify the proof.</em></h2>
        <p>Scroll to turn Oakwood’s documented room, power, reusable assets and student work into one inspectable production route.</p>
      </div>
      <div className="constellation-phases" aria-hidden="true"><span>FIELD EVIDENCE</span><span>COMMISSION</span><span>PROOF</span></div>
      <p className="sr-only">A room-plan trace connects Room 409, power and data, reusable assets, studio production, local inference, verification, the evidence vault and opportunity.</p>
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
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="progress" style={{width:`${progress}%`}} />
    <header className="topbar">
      <a className="brand" href="#top" aria-label="IDC × OAKWOOD home"><img src="./assets/idc-mark-64.webp" width="64" height="64" alt=""/><span>IDC <i>×</i> OAKWOOD</span></a>
      <nav aria-label="Primary navigation">
        {nav.slice(0,5).map(([id,label])=><a className={activeSection===id?'active':''} key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <a className="evidence-link" href="#evidence">Evidence index <FileCheck2 size={15}/></a>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen?<X/>:<Menu/>}</button>
    </header>
    {menuOpen&&<div className="mobile-menu">{nav.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}</a>)}</div>}

    <main id="main">
      <section className="hero" id="top">
        <div className="hero-photo"><img fetchPriority="high" decoding="async" src="./assets/concept-lab-hero-1280.webp" srcSet="./assets/concept-lab-hero-640.webp 640w, ./assets/concept-lab-hero-1280.webp 1280w" sizes="100vw" width="1376" height="768" alt="Concept rendering of an Oakwood AI production studio"/><span><Sparkles size={14}/> Concept rendering · proposed future state</span></div>
        <div className="hero-grain" />
        <div className="hero-copy">
          <div className="hero-meta"><span>IDC PLANS FOR OAKWOOD</span><span>AUGUST 2026</span><span>PUBLIC RECORD × FIELD EVIDENCE</span></div>
          <h1>The foundation is already here. <em>The AI degree is not.</em></h1>
          <p className="hero-thesis">Oakwood has verified computational depth. IDC has a documented implementation blueprint. The opening is to <strong>recompose, extend, approve and prove</strong>—without pretending the future already exists.</p>
          <div className="hero-actions"><a className="button primary" href="#foundation">Examine the foundation <ArrowDown size={18}/></a><a className="button ghost" href="#benchmark">See the evidence map <ArrowUpRight size={18}/></a></div>
        </div>
        <div className="hero-ledger"><div><b>522</b><span>official pages examined</span></div><div><b>05</b><span>verified degree foundations</span></div><div><b>00</b><span>named AI pathways</span></div></div>
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

      <ProofTrace/>

      <section className="benchmark" id="benchmark">
        <SectionHead index="01" eyebrow="FOUR LANES · NO CATEGORY ERROR" title="Public program. Public foundation. Documented blueprint. Unfinished opening." intro="The fairest comparison does not force unlike evidence into one score. It shows what each body of evidence actually proves—and where institutional decisions still begin." />
        <div className="correction reveal"><CircleAlert/><div><b>Evidence correction</b><p>AAMU publishes an AI degree and ecosystem. Oakwood publishes a substantial computational foundation, but the current 2025–2027 bulletin contains no named AI pathway. IDC documents a proposed route from that foundation to a production-and-proof system; it does not document Oakwood adoption.</p></div><ClaimTag kind="oakwood">Oakwood verified public fact</ClaimTag></div>
        <EvidenceMap/>
        <div className="benchmark-insight reveal"><p className="micro">THE STRATEGIC INTERPRETATION</p><blockquote>Oakwood is not starting from zero. It is starting from <em>distributed strength</em> that has not yet been assembled into an AI claim.</blockquote></div>
        <div className="curriculum-strip reveal">
          <div className="strip-head"><GraduationCap/><div><p className="micro">AAMU · 125 CREDIT HOURS</p><h3>What an institutionalized AI major looks like</h3></div></div>
          <div className="year-columns">
            <div><span>YEAR 1</span><p>Calculus I–II · ethics · computing · Python II · composition</p></div>
            <div><span>YEAR 2</span><p>Physics I–II · programming · Java · discrete structures · data structures</p></div>
            <div><span>YEAR 3</span><p>Linear algebra · AI conceptions · graphics · systems · robotics · cognitive psychology</p></div>
            <div><span>YEAR 4</span><p>ML · AI · deep learning · RL · NLP · speech · HPC · two-part capstone</p></div>
          </div>
          <a href={sources[0].url} target="_blank" rel="noreferrer">Open official AAMU bulletin <ExternalLink size={15}/></a>
        </div>
      </section>

      <section className="foundation paper" id="foundation">
        <SectionHead index="02" eyebrow="THE PUBLIC RECORD, EXAMINED" title="The building blocks are real. The composition is still a decision." intro="The official Oakwood bulletin shows enough computer science, mathematics, information systems and technology to make an AI pathway plausible. It does not make that pathway official, complete or accredited." />
        <FoundationInstrument/>
        <div className="foundation-signals reveal">
          <article>
            <ClaimTag kind="marketing">Oakwood official marketing claim</ClaimTag>
            <h3>Oakwood publicly names AI among emerging technologies.</h3>
            <p>Its official technology-program page mentions AI, cybersecurity, cloud computing and “modern labs.” That is meaningful first-party language, but it does not establish an approved AI program, named AI lab, budget, curriculum or launch date.</p>
            <a href="https://oakwood.edu/computer-science-computer-networks-information-technology/" target="_blank" rel="noreferrer">Inspect Oakwood statement <ExternalLink size={15}/></a>
          </article>
          <article>
            <ClaimTag kind="oakwood">Oakwood verified public fact</ClaimTag>
            <h3>Published facilities provide a real baseline—not proof of AI compute.</h3>
            <p>The bulletin identifies four computer labs in McKee, Mathematics and Computer Science labs in Cooper, and more than 40 networked library computers. GPU capacity, dedicated AI workstations, cloud agreements and a named AI studio remain unverified.</p>
            <a href={sources[4].url} target="_blank" rel="noreferrer">Inspect bulletin pages 9 and 84 <ExternalLink size={15}/></a>
          </article>
        </div>
        <div className="recomposition reveal">
          <div><ClaimTag kind="inference">Curriculum inference</ClaimTag><h3>Reuse the verified spine.</h3><p>Preserve algorithms, systems, programming, linear algebra, probability, numerical analysis, databases, networks, security, business and research.</p></div>
          <div className="recompose-arrow"><span>RECOMPOSE</span><ChevronRight/></div>
          <div><ClaimTag kind="target">Proposed target</ClaimTag><h3>Add the named AI layer.</h3><p>AI foundations, machine learning, deep learning, data engineering, NLP, vision, evaluation, responsible AI, local/edge operations and a two-stage proof capstone.</p></div>
        </div>
        <div className="unknown-banner reveal"><CircleAlert/><div><ClaimTag kind="unknown">Unverified / needs confirmation</ClaimTag><p>The chair’s stated vision, reported lab/studio funding, faculty AI capacity, governance status and launch intent remain outside the retrieved public record. They should be presented as questions for Oakwood—not facts about Oakwood.</p></div></div>
      </section>

      <section className="assets paper" id="assets">
        <SectionHead index="03" eyebrow="THE FIELD RECORD" title="The proposal has touched the room." intro="The public bulletin proves academic foundation. IDC’s field record proves that the implementation thinking moved into rooms, power, data, reusable equipment and shipped software. Neither proves institutional adoption." />
        <div className="asset-mosaic">
          <article className="asset feature reveal"><img loading="lazy" decoding="async" src="./assets/evidence-power-data.webp" alt="Verified Oakwood room power and data condition"/><div className="asset-overlay"><ClaimTag kind="documented">IDC documented evidence</ClaimTag><h3>70 unique on-site images</h3><p>May 26, 2026 walkthrough of Rooms 409, 407, 305/310, MDF, power, data, HVAC, windows and reusable assets. The public resource page contains 71 cards; one image URL is duplicated.</p></div></article>
          <article className="asset reveal"><img loading="lazy" decoding="async" src="./assets/evidence-benches.webp" alt="Reusable blue engineering benches at Oakwood"/><div><span className="micro">REUSE BEFORE REPLACE</span><h3>Engineering benches</h3></div></article>
          <article className="asset reveal"><img loading="lazy" decoding="async" src="./assets/evidence-printers.webp" alt="Existing 3D printers at Oakwood"/><div><span className="micro">EXISTING CAPACITY</span><h3>Fabrication foothold</h3></div></article>
          <article className="asset dark reveal"><div className="big-mark">Γ</div><div><span className="micro">VISION · 2025</span><h3>Oakwood’s Path</h3><p>The original Gamma narrative established the institution-wide infusion theme.</p><a href={sources[12].url} target="_blank" rel="noreferrer">Open original <ArrowUpRight/></a></div></article>
          <article className="asset dark reveal"><div className="big-mark"><Cpu/></div><div><span className="micro">IMPLEMENTATION · 2026</span><h3>AI Lab IDC</h3><p>Room-grounded build, funding firewall, budget, contractor lanes and execution sequence.</p><a href={sources[9].url} target="_blank" rel="noreferrer">Open lab hub <ArrowUpRight/></a></div></article>
        </div>
        <div className="campus-case reveal">
          <div className="case-copy"><p className="eyebrow">FIRST PROOF LEDGER CASE</p><h3>Campus Companion</h3><p>The CS Club’s 12-student build was a meaningful initiative. IDC’s enhancement shows what happens when that initiative is paired with AI-assisted engineering, accessibility, reliability, richer content and a production closeout discipline.</p><div className="case-rule"><HeartHandshake/><span>The lesson is not “AI replaced the students.” It is “AI mentorship increased what the team could finish, verify and show.”</span></div><a className="text-link" href="https://ou-campus-showcase.vercel.app" target="_blank" rel="noreferrer">View comparison evidence <ArrowUpRight/></a></div>
          <div className="case-stats"><div><b>51</b><span>buildings documented</span></div><div><b>60</b><span>live department entries</span></div><div><b>94</b><span>accessibility attributes</span></div><div><b>27</b><span>recorded iterations</span></div></div>
        </div>
      </section>

      <section className="model" id="model">
        <SectionHead index="04" eyebrow="THE 2× IMPROVEMENT" title="Foundations. Studio. Proof." intro="Not twice the hardware. Twice the conversion from coursework into trusted opportunity." />
        <div className="three-lanes reveal">
          <article><span>01</span><BookOpen/><h3>Foundations</h3><p>Mathematics, systems, algorithms, ML, security and responsible-AI rigor that can survive beyond the tool of the month.</p><ul><li>Calculus · linear algebra · probability</li><li>Data structures · systems · networks</li><li>ML · NLP · vision · robotics</li><li>Policy · privacy · accessibility</li></ul></article>
          <article className="accent"><span>02</span><Rocket/><h3>Studio</h3><p>Every semester closes on a deployed application, reproducible experiment, physical system or community service.</p><ul><li>Cloud + local + edge workflows</li><li>Cross-disciplinary problem sponsors</li><li>Employer and user review</li><li>Maintenance after demo day</li></ul></article>
          <article><span>03</span><BadgeCheck/><h3>Proof</h3><p>A durable evidence trail turns each artifact into a credible signal for employers, graduate programs and funders.</p><ul><li>Repository · release · live demo</li><li>Evals · tests · threat model</li><li>Data/model/provenance cards</li><li>Contribution and impact record</li></ul></article>
        </div>
        <div className="signal-path reveal" aria-label="Idea to opportunity proof path"><span><BrainCircuit/>IDEA</span><i/><span><Code2/>BUILD</span><i/><span><TestTube2/>VERIFY</span><i/><span><BriefcaseBusiness/>OPPORTUNITY</span></div>
      </section>

      <section className="lab paper" id="lab">
        <SectionHead index="05" eyebrow="THE PHYSICAL OPERATING SYSTEM" title="A 10-seat lab designed around work—not brands." intro="Vendor-neutral by principle: procure memory, support, throughput, reliability and curriculum fit. Validate Oakwood’s actual workloads before scaling one architecture." />
        <LabMap/>
        <div className="gates reveal">
          <div className="gates-title"><LockKeyhole/><div><p className="micro">NON-NEGOTIABLE PROCUREMENT GATES</p><h3>Infrastructure before spectacle.</h3></div></div>
          <ol><li><b>Electrical.</b> Licensed load study and FPE-panel decision before compute is energized.</li><li><b>Network.</b> Campus IT approval for identity, VLANs, logging, switching and remote management.</li><li><b>Environment.</b> Cooling, acoustics, egress and accessibility review against measured rooms.</li><li><b>Funding.</b> Separate equipment from facility labor; obtain sealed trade quotes.</li><li><b>Bake-off.</b> Test candidate systems on real local-model, media, edge and student workloads.</li><li><b>Ownership.</b> Sign annual sustainment, lab-owner and student-assistant plans before purchase.</li></ol>
        </div>
        <div className="concept-gallery reveal"><figure><img loading="lazy" decoding="async" src="./assets/concept-floorplan.webp" alt="Concept floor plan for the proposed AI lab"/><figcaption><ClaimTag kind="target">Proposed target</ClaimTag> Concept floor plan—not a measured construction document.</figcaption></figure><figure><img loading="lazy" decoding="async" src="./assets/concept-hardware-wall.webp" alt="Concept hardware wall for the proposed AI lab"/><figcaption><ClaimTag kind="target">Proposed target</ClaimTag> Hardware-wall visualization; final brands follow bake-off and campus standards.</figcaption></figure></div>
      </section>

      <section className="curriculum" id="curriculum">
        <SectionHead index="06" eyebrow="THE STUDIO CURRICULUM" title="Eight studios. Eight finished products." intro="A four-year AI/CS foundation can adopt these as rotating studios, minors, certificates or capstone overlays. Each terminates in evidence, not attendance." />
        <div className="studio-list">{studios.map(({n,icon:Icon,title,desc,output})=><article className="studio reveal" key={n}><span className="studio-num">{n}</span><Icon/><div><h3>{title}</h3><p>{desc}</p></div><aside><small>PROOF OUTPUT</small><b>{output}</b></aside></article>)}</div>
        <div className="ethics-spine reveal"><Scale/><div><p className="eyebrow">OAKWOOD’S DISTINCTIVE LENS</p><h3>Responsible AI becomes operational—not ornamental.</h3><p>The Adventist formation layer can connect human dignity, stewardship, truthfulness, service, rest and accountability to concrete controls: consent, provenance, access, evaluation, human review and incident response. John Lennox’s <em>2084 and the AI Revolution</em> can remain one seminar voice, not the whole governance framework.</p></div></div>
      </section>

      <section className="proof paper" id="proof">
        <SectionHead index="07" eyebrow="THE EMPLOYER SIGNAL" title="A transcript says what was studied. The Proof Ledger shows what survived contact with reality." intro="A 100-point body-of-work confidence score makes claims inspectable—while anti-gaming caps prevent polish from outrunning evidence." />
        <ProofCalculator/>
        <div className="portability reveal"><div><Link2/><h3>LinkedIn is a destination—not the source of truth.</h3><p>The ledger can generate a public credential page for Featured, an Open Badge / verifiable record, concise skill statements and an employer evidence packet.</p></div><div className="boundary"><CircleAlert/><p><b>Boundary:</b> this does not claim LinkedIn currently permits a custom candidate-ranking algorithm or open scoring API. Direct integration requires supported credential surfaces or a formal partner API.</p></div></div>
        <div className="ledger-fields reveal">
          {['Live artifact','Tagged release','Tests + evals','Architecture record','Model / data card','Threat model','Accessibility check','Contribution trail','User impact','Mentor attestation'].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span><Check/><b>{x}</b></div>)}
        </div>
      </section>

      <section className="roadmap" id="roadmap">
        <SectionHead index="08" eyebrow="FROM PROPOSAL TO PROOF" title="One year. Four gates. No theater." intro="Success is measured in verified artifacts, resolved risks, student opportunity and repeatable institutional capacity—not equipment delivery alone." />
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
        <SectionHead index="09" eyebrow="SOURCE & CLAIM LEDGER" title="Confidence comes from showing the seams." intro="AAMU public facts, Oakwood public facts, IDC evidence, curriculum inferences, unknowns and proposed targets are intentionally separated. Open the sources; challenge the interpretation." />
        <div className="source-list">{sources.map(s=><a className="source reveal" href={s.url} target="_blank" rel="noreferrer" key={s.id}><span>{s.id}</span><div><ClaimTag kind={claimKindByLabel[s.type]}>{s.type}</ClaimTag><h3>{s.title}</h3><p>{s.detail}</p></div><ExternalLink/></a>)}</div>
        <div className="evidence-note reveal"><FileCheck2/><div><h3>What this record does—and does not—claim</h3><p>It maps public and documented evidence available on August 22, 2026. It cannot independently verify classroom delivery quality, unpublished faculty capacity, student enrollment, internal funding, curriculum approval, procurement approval or outcomes that have not matured. IDC proposals remain proposals until Oakwood adopts and measures them.</p></div></div>
      </section>
    </main>

    <footer><div className="footer-brand"><img src="./assets/idc-mark-64.webp" width="64" height="64" alt="Island Development Crew mark"/><div><b>Island Development Crew</b><span>AI systems · product evidence · institutional transformation</span></div></div><div className="footer-meta"><span>Prepared for Oakwood University exploration</span><span>August 22, 2026</span><span>© {year} IDC</span></div><a href="#top" aria-label="Back to top">Back to top <Zap size={16}/></a></footer>
  </>
}
