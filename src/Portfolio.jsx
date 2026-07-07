import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import {
  Book, Mail, Linkedin, Github, FileText, Coffee,
  Circle, Users, Award, Briefcase, Code, ChevronDown,
  Play, Pause, Volume2, VolumeX, ExternalLink, ArrowRight
} from 'lucide-react';

/* ─── THEME TOKENS ─────────────────────────────────────────────── */
const C = {
  paper:    '#F5F0E8',
  paperDim: '#EDE7D9',
  ink:      '#1C1A16',
  inkSoft:  '#3D3830',
  sage:     '#6B8F71',
  sageDim:  '#A8C5AD',
  matcha:   '#4A7C59',
  dust:     '#C4A882',
  dustDim:  '#D9C4A3',
  blush:    '#C9938A',
  mist:     '#8BA5A8',
  gold:     '#B8860B',
};

/* ─── CURSOR ────────────────────────────────────────────────────── */
const CustomCursor = () => {
  const cursorRef  = useRef(null);
  const trailRef   = useRef(null);
  const pos        = useRef({ x: 0, y: 0 });
  const trail      = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);
    let raf;
    const loop = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.12;
      trail.current.y += (pos.current.y - trail.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 16}px, ${trail.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position:'fixed',top:0,left:0,width:10,height:10,borderRadius:'50%',
        background:C.matcha,pointerEvents:'none',zIndex:9999,mixBlendMode:'multiply',
        transition:'opacity .3s',
      }}/>
      <div ref={trailRef} style={{
        position:'fixed',top:0,left:0,width:32,height:32,borderRadius:'50%',
        border:`1.5px solid ${C.sage}`,pointerEvents:'none',zIndex:9998,opacity:0.5,
        transition:'opacity .3s',
      }}/>
    </>
  );
};

/* ─── CONSTELLATION CANVAS ──────────────────────────────────────── */
const ConstellationCanvas = () => {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -999, y: -999 });
  const dotsRef   = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    dotsRef.current = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r:  Math.random() * 2 + 1,
    }));

    const moveMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', moveMouse);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const dots = dotsRef.current;

      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(107,143,113,${(1 - dist/130) * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        const mdx = dots[i].x - mouse.current.x;
        const mdy = dots[i].y - mouse.current.y;
        const md  = Math.sqrt(mdx*mdx + mdy*mdy);
        if (md < 110) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = `rgba(74,124,89,${(1 - md/110) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(107,143,113,0.45)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', moveMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position:'fixed', top:0, left:0, width:'100%', height:'100%',
      pointerEvents:'none', zIndex:0, opacity:0.7,
    }}/>
  );
};

/* ─── SCROLL REVEAL ─────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref    = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ─── MUSIC PLAYER ──────────────────────────────────────────────── */
const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(false);
  const [pulse,   setPulse]   = useState(false);
  const audioRef  = useRef(null);

  const SRC = 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0ef108ef7.mp3';

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop   = true;
    a.volume = 0.22;
    audioRef.current = a;
    return () => { a.pause(); a.src = ''; };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (!playing) { setPulse(false); return; }
    const id = setInterval(() => setPulse(p => !p), 1400);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div style={{
      position:'fixed', bottom:28, right:28, zIndex:200,
      display:'flex', flexDirection:'column', alignItems:'center', gap:8,
    }}>
      {playing && (
        <>
          <div style={{
            position:'absolute', width:58, height:58, borderRadius:'50%',
            border:`1px solid ${C.sage}`, opacity: pulse ? 0 : 0.5,
            transform: pulse ? 'scale(1.9)' : 'scale(1)',
            transition:'all 1.4s ease', pointerEvents:'none',
          }}/>
          <div style={{
            position:'absolute', width:58, height:58, borderRadius:'50%',
            border:`1px solid ${C.sageDim}`, opacity: pulse ? 0 : 0.3,
            transform: pulse ? 'scale(2.6)' : 'scale(1)',
            transition:'all 1.8s ease', pointerEvents:'none',
          }}/>
        </>
      )}
      <button
        onClick={() => setPlaying(p => !p)}
        title={playing ? 'Pause ambient music' : 'Play ambient music'}
        style={{
          width:50, height:50, borderRadius:'50%',
          background: playing ? C.matcha : 'rgba(245,240,232,0.9)',
          border:`1.5px solid ${playing ? C.matcha : C.sageDim}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'none', backdropFilter:'blur(8px)',
          boxShadow: playing ? `0 0 20px ${C.sage}55` : '0 2px 12px rgba(0,0,0,0.08)',
          transition:'all 0.4s ease',
        }}
      >
        {playing
          ? <Pause size={18} color="#fff"/>
          : <Play  size={18} color={C.matcha}/>
        }
      </button>
      {playing && (
        <button
          onClick={() => setMuted(m => !m)}
          style={{
            width:30, height:30, borderRadius:'50%',
            background:'rgba(245,240,232,0.85)',
            border:`1px solid ${C.sageDim}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'none', backdropFilter:'blur(8px)',
            transition:'all 0.3s ease',
          }}
        >
          {muted ? <VolumeX size={12} color={C.inkSoft}/> : <Volume2 size={12} color={C.matcha}/>}
        </button>
      )}
      <span style={{
        fontSize:9, color: playing ? C.matcha : C.dust, letterSpacing:1,
        fontFamily:'serif', transition:'color 0.4s',
        textAlign:'center', lineHeight:1.4,
      }}>
        {playing ? '♪ ambient' : 'sound'}
      </span>
    </div>
  );
};

/* ─── DOT CHAPTER MARKER ────────────────────────────────────────── */
const ChapterMark = ({ n, label }) => (
  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:32 }}>
    <div style={{
      width:36, height:36, borderRadius:'50%',
      border:`1.5px solid ${C.sage}`,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:11, color:C.matcha, fontFamily:'serif', letterSpacing:1,
    }}>
      {n.toString().padStart(2,'0')}
    </div>
    <div style={{ height:1, width:40, background:`linear-gradient(to right, ${C.sage}, transparent)` }}/>
    <span style={{ fontFamily:'serif', fontSize:13, color:C.dust, letterSpacing:2, textTransform:'uppercase' }}>
      {label}
    </span>
  </div>
);

/* ─── TAG PILL ──────────────────────────────────────────────────── */
const Tag = ({ children }) => (
  <span style={{
    display:'inline-block', padding:'3px 11px', borderRadius:20,
    background:`${C.sage}18`, border:`1px solid ${C.sage}30`,
    fontSize:11, color:C.matcha, letterSpacing:0.5, fontFamily:'sans-serif',
  }}>
    {children}
  </span>
);

/* ─── GLASS CARD ────────────────────────────────────────────────── */
const GlassCard = ({ children, style = {}, hover = true }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background:'rgba(245,240,232,0.65)',
        backdropFilter:'blur(16px)',
        WebkitBackdropFilter:'blur(16px)',
        border:`1px solid rgba(184,134,11,0.12)`,
        borderRadius:20,
        boxShadow: hov
          ? `0 20px 60px rgba(107,143,113,0.15), 0 2px 8px rgba(0,0,0,0.04)`
          : `0 4px 24px rgba(0,0,0,0.05)`,
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition:'all 0.4s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ─── PROGRESS BAR ──────────────────────────────────────────────── */
const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div style={{
      position:'fixed', top:0, left:0, right:0, height:2, zIndex:1000,
      background:'transparent',
    }}>
      <div style={{
        height:'100%', width:`${pct}%`,
        background:`linear-gradient(to right, ${C.sage}, ${C.matcha})`,
        transition:'width 0.1s linear',
      }}/>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN PORTFOLIO
═══════════════════════════════════════════════════════════════════ */
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [navOpen, setNavOpen] = useState(false);
  const [dotCount, setDotCount] = useState(1);
  const heroRef = useRef(null);
  const [heroParallax, setHeroParallax] = useState(0);

  useEffect(() => {
    const ids = ['home','about','education','experience','projects','books','contact'];
    const h = () => {
      const y = window.scrollY + 140;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= y) { setActiveSection(ids[i]); break; }
      }
    };
    window.addEventListener('scroll', h);
    h();
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const h = () => setHeroParallax(window.scrollY * 0.35);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const h = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      setDotCount(Math.min(7, Math.floor(pct * 7) + 1));
    };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navItems = [
    ['home','Home'],['about','About'],['education','Education'],
    ['experience','Experience'],['projects','Projects'],['books','Books'],['contact','Contact'],
  ];

  const LINKS = {
    email:    'mailto:tammaingocphuong@gmail.com',
    resume:   '/resume.pdf',
    linkedin: 'https://www.linkedin.com/in/tammaingoc/',
    github:   'https://github.com/tammai1610',
  };

  const coursework = [
    'Big Data for AI & Analytics','Database Management & SQL',
    'Data Mining & Predictive Analytics','Data Visualization','Statistical Analysis in R',
  ];

  const projects = [
    {
      title: 'FinPulse Fraud Detection Pipeline',
      subtitle: 'Python · Apache Spark · HDFS · Docker',
      tech:['Python','Apache Spark','HDFS','Docker'],
      github: 'https://github.com/alazzawiusf/Data-Wranglers-Final-Project',
      scattered: '5 fraud datasets lived in silos, and the existing rule engine flagged 98.5% false positives. Analysts drowned in noise instead of catching real fraud.',
      connecting: 'Built a 4-job Spark batch transformation pipeline joining all 5 datasets into a 1.15M-row enriched fact table with 26 engineered features and 99,997 customer behavioral profiles.',
      clear: 'Surfaced fraud patterns across merchants, channels, and geography, and quantified $9.4M/year in recoverable analyst costs through z-score behavioral modeling.',
      proudDetail: 'Designed the pipeline as 4 independent Spark jobs. Each testable, each replayable. When something breaks, you know exactly which job to rerun.',
    },
  ];

  const books = [
    {
      title:'Die with Zero', author:'Bill Perkins', color:C.sage, rating:4,
      insight:'Be intentional with time and energy. Optimize for meaningful experiences, not just accumulating more.'
    },
    {
      title:'The Courage to be Disliked', author:'Kishimi & Koga', color:C.blush, rating:4,
      insight:'Separate what you can control from what you can\'t.'
    },
    {
      title:'Fundamentals of Data Engineering', author:'Reis & Housley', color:C.mist, rating:3,
      insight:'Understand data ecosystems holistically. Think about infrastructure strategically, not just technically.'
    },
    {
      title:'My Friends', author:'Fredrik Backman', color:C.dust, rating:4,
      insight:'A thoughtful lens on relationships, belonging, and what we owe the people who shape us.'
    },
    {
      title:'7 Habits of Highly Effective People', author:'Stephen Covey', color:C.matcha, rating:5,
      insight:'Shaped how I work and collaborate, and honestly, just how to be a better person.'
    },
    {
      title:'Supercommunicators', author:'Charles Duhigg', color:C.gold, rating:4,
      insight:'The best conversations aren\'t about being clever. They\'re about matching the kind of conversation the other person is trying to have.'
    },
    {
      title:'Invisible Child', author:'Andrea Elliott', color:C.blush, rating:0, currentlyReading:true,
      insight:'Currently reading.'
    },
  ];

  const experiences = [
    {
      role: 'Technical Program Manager Intern',
      org: 'Micron Technology · Boise, ID',
      period: 'May 2026 – Present',
      color: C.gold,
      bullets: [
        'Owned end-to-end delivery of a centralized AI agent (Microsoft Copilot Studio), standardizing product development meeting minutes for 20–30 PMOs across all 5 technologies, cutting active working time from 1.5 hours to 30 minutes per session.',
        'Architecting a 4-agent hierarchical AI system (Atlassian Rovo) for cross-PMO intelligence across 12+ semiconductor programs: PDT Summarizer, Cross-Program Synthesizer, adversarial QA Checker, and dual-mode chatbot.',
        'Drove adoption through 10 stakeholder interviews, workflow presentations to PMO leadership, and playbooks capturing what works vs. what doesn\'t; secured buy-in and shaped governance across 5 technologies.',
      ],
      lesson: 'Adoption is the real deliverable. If no one uses it, it doesn\'t exist.',
    },
    {
      role: 'Business Intelligence Developer',
      org: 'Judy Genshaft Honors College, USF',
      period: 'June 2024 – Present',
      color: C.matcha,
      bullets: [
        'Engineered a multi-layer ETL pipeline in Python (Polars) integrating 5 data sources across 100K+ students spanning 10 cohort years, implementing FTIC classification logic and data quality validation to generate longitudinal datasets.',
        'Automated cohort generation pipeline calculating 15 institutional metrics across student segments from ETL outputs, enabling on-demand 10-year trend analysis for accreditation reporting and strategy.',
        'Developed 15 Power BI dashboards analyzing 60K+ Honors student records using star schema models and DAX, partnering with 4 cross-functional teams and empowering 8 advisors to monitor caseloads and act on at-risk students independently.',
        'Validated data integrity by developing 15 SQL scripts (CTEs, window functions, joins) to cross-check DAX calculations, resolving 5 discrepancies before production deployment.',
        'Created 15 in-dashboard user guides and 15 technical documentation files on GitHub, reducing onboarding time by 2 weeks and enabling 30% increase in self-service adoption across IT and advisory teams.',
      ],
      lesson: 'Good documentation is how you look out for the people who come after you.',
    },
    {
      role: 'Business Intelligence Analyst Intern',
      org: 'VSP Vision',
      period: 'June 2025 – August 2025',
      color: C.sage,
      bullets: [
        'Automated expense reconciliation workflow consolidating 40 cost centers across 3 ERP systems using Power Query M Code and DAX, eliminating 20 hours/month of manual work.',
        'Analyzed 17K+ financial records in Excel to detect $2M in budget-to-actual variances (±15%), flagging cost deviations for leadership review and corrective action.',
        'Redesigned a 9-tab resource forecasting dashboard into 2 streamlined solutions serving 7 executives and 25 managers, reducing navigation complexity and surfacing the targeted KPIs each stakeholder tier needed for faster decisions.',
      ],
      lesson: 'The best dashboards say more with less. I aim for that.',
    },
    {
      role: 'Business Information Analyst Intern',
      org: 'Elevance Health',
      period: 'Summer 2023',
      color: C.dust,
      bullets: [
        'Resolved 10 reporting tickets processing 1.8M claim records through SQL stored procedures with complex joins and CTEs, restoring data accuracy for 15 claims operations stakeholders.',
        'Initiated cross-functional meetings to replace asynchronous ticket communications, reducing resolution time by 30%.',
        'Enhanced claims monitoring dashboard processing 100K+ daily records by optimizing DAX measures and date filtering logic, improving load time while maintaining 30/60/90-day rolling windows for executive risk assessment.',
      ],
      lesson: 'Sometimes the fastest fix is getting everyone in the same room.',
    },
  ];

  const navLink = (key) => ({
    fontSize:12, letterSpacing:1.5, textTransform:'uppercase',
    fontFamily:'serif',
    color: activeSection === key ? C.matcha : C.inkSoft,
    textDecoration:'none',
    borderBottom: activeSection === key ? `1px solid ${C.sage}` : '1px solid transparent',
    paddingBottom:2,
    transition:'all 0.3s ease',
    cursor:'none',
  });

  const SH = ({ children }) => (
    <h2 style={{
      fontFamily:'Georgia, serif', fontSize:'clamp(2rem,5vw,3.2rem)',
      color:C.ink, fontWeight:400, letterSpacing:-0.5,
      margin:0,
    }}>
      {children}
    </h2>
  );

  return (
    <div style={{
      minHeight:'100vh',
      background:`linear-gradient(135deg, ${C.paper} 0%, #EDE7D9 50%, #E8E0D0 100%)`,
      color:C.ink, cursor:'none', overflowX:'hidden',
      fontFamily:'"DM Sans", system-ui, sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
        * { cursor:none !important; box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${C.paperDim}; }
        ::-webkit-scrollbar-thumb { background:${C.sageDim}; border-radius:2px; }
        html { scroll-behavior:smooth; }
        ::selection { background:${C.sage}33; }

        @keyframes breathe {
          0%,100% { transform:scale(1); opacity:0.6; }
          50% { transform:scale(1.4); opacity:1; }
        }
        @keyframes floatY {
          0%,100% { transform:translateY(0); }
          50% { transform:translateY(-10px); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset:300; }
          to   { stroke-dashoffset:0; }
        }
        @keyframes spin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50% { opacity:0; }
        }
      `}</style>

      <CustomCursor />
      <ConstellationCanvas />
      <ScrollProgress />
      <MusicPlayer />

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav style={{
        position:'fixed', top:0, width:'100%', zIndex:500,
        background:'rgba(245,240,232,0.82)',
        backdropFilter:'blur(18px)',
        WebkitBackdropFilter:'blur(18px)',
        borderBottom:`1px solid rgba(107,143,113,0.12)`,
      }}>
        <div style={{
          maxWidth:1100, margin:'0 auto', padding:'0 32px',
          height:64, display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <a href="#home" style={{ textDecoration:'none', cursor:'none', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ display:'flex', gap:5 }}>
              {[...Array(7)].map((_,i) => (
                <div key={i} style={{
                  width: i < dotCount ? 6 : 4,
                  height: i < dotCount ? 6 : 4,
                  borderRadius:'50%',
                  background: i < dotCount ? C.matcha : C.sageDim,
                  transition:'all 0.4s ease',
                  marginTop: i < dotCount ? 0 : 1,
                }}/>
              ))}
            </div>
            <span style={{
              fontFamily:'Cormorant Garamond, Georgia, serif',
              fontSize:18, color:C.ink, letterSpacing:0.5,
            }}>
              Tam Mai
            </span>
          </a>

          <div style={{ display:'flex', gap:28, alignItems:'center' }}>
            {navItems.map(([k,l]) => (
              <a key={k} href={`#${k}`} style={navLink(k)}>{l}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section id="home" style={{
        minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', paddingTop:64, overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)',
          width:700, height:700, borderRadius:'50%',
          background:`radial-gradient(circle, ${C.sage}15 0%, transparent 70%)`,
          pointerEvents:'none',
        }}/>

        <div style={{
          textAlign:'center', position:'relative', zIndex:10,
          padding:'0 24px',
          transform:`translateY(${heroParallax * -0.4}px)`,
          transition:'transform 0.1s linear',
        }}>
          <div style={{
            marginBottom:40, display:'inline-block', position:'relative',
            animation:'fadeUp 1s ease 0.3s both',
          }}>
            <svg style={{
              position:'absolute', top:-16, left:-16, width:'calc(100% + 32px)', height:'calc(100% + 32px)',
              animation:'spin 18s linear infinite', opacity:0.3,
            }} viewBox="0 0 210 210">
              <circle cx="105" cy="105" r="100" fill="none" stroke={C.sage} strokeWidth="1"
                strokeDasharray="6 10"/>
            </svg>

            <div style={{
              width:160, height:160, borderRadius:'50%', overflow:'hidden',
              border:`3px solid rgba(107,143,113,0.4)`,
              boxShadow:`0 0 40px ${C.sage}30, 0 8px 32px rgba(0,0,0,0.1)`,
              position:'relative', zIndex:2,
            }}>
              <img
                src="/profile-photo.jpg"
                alt="Tam Mai"
                style={{ width:'100%', height:'100%', objectFit:'cover' }}
                onError={e => {
                  e.target.style.display='none';
                  e.target.parentElement.style.background = `linear-gradient(135deg,${C.sage}40,${C.dust}30)`;
                  e.target.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:serif;font-size:48px;color:${C.matcha}60">T</div>`;
                }}
              />
            </div>

            <div style={{
              position:'absolute', top:-6, right:-6, width:14, height:14,
              borderRadius:'50%', background:C.matcha, boxShadow:`0 0 8px ${C.matcha}60`,
            }}/>
            <div style={{
              position:'absolute', bottom:-4, left:-4, width:9, height:9,
              borderRadius:'50%', background:C.dust,
            }}/>
          </div>

          <h1 style={{
            fontFamily:'Cormorant Garamond, Georgia, serif',
            fontSize:'clamp(3.2rem,9vw,7rem)',
            fontWeight:300, letterSpacing:-2,
            color:C.ink, lineHeight:0.95, margin:'0 0 24px',
            animation:'fadeUp 1s ease 0.5s both',
          }}>
            Tam <em style={{ color:C.matcha, fontStyle:'italic' }}>Mai</em>
          </h1>

          <p style={{
            fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(1.1rem,3vw,1.6rem)',
            color:C.inkSoft, fontWeight:300, margin:'0 0 8px',
            animation:'fadeUp 1s ease 0.7s both',
          }}>
            Every person is a story. So is every dataset.
          </p>
          <p style={{
            fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(1.1rem,3vw,1.6rem)',
            color:C.sage, fontWeight:300, margin:'0 0 32px', fontStyle:'italic',
            animation:'fadeUp 1s ease 0.8s both',
          }}>
            I connect the dots in both.
          </p>

          <p style={{
            fontSize:12, color:C.dust, letterSpacing:3, textTransform:'uppercase',
            marginBottom:44, animation:'fadeUp 1s ease 0.9s both',
          }}>
            AI &amp; Business Analytics · University of South Florida · Aspiring Data &amp; Analytics Engineer · Home Chef and Baker
          </p>

          <div style={{
            display:'flex', gap:16, justifyContent:'center',
            animation:'fadeUp 1s ease 1s both',
          }}>
            <a href="#about" style={{
              padding:'12px 32px', borderRadius:40,
              background:C.matcha, color:'#fff',
              fontSize:12, letterSpacing:2, textTransform:'uppercase',
              textDecoration:'none', fontFamily:'serif',
              boxShadow:`0 8px 24px ${C.matcha}40`,
              transition:'all 0.3s ease', cursor:'none',
            }}
              onMouseEnter={e => e.target.style.transform='scale(1.05)'}
              onMouseLeave={e => e.target.style.transform='scale(1)'}
            >
              Read my story
            </a>
            <a href={LINKS.resume} style={{
              padding:'12px 32px', borderRadius:40,
              border:`1.5px solid ${C.sage}`,
              color:C.inkSoft, fontSize:12, letterSpacing:2, textTransform:'uppercase',
              textDecoration:'none', fontFamily:'serif',
              transition:'all 0.3s ease', cursor:'none',
            }}
              onMouseEnter={e => { e.target.style.background=C.sage; e.target.style.color='#fff'; }}
              onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.color=C.inkSoft; }}
            >
              Resume ↗
            </a>
          </div>

          <div style={{
            marginTop:64, display:'flex', flexDirection:'column',
            alignItems:'center', gap:8, opacity:0.5,
            animation:'floatY 2.5s ease-in-out infinite',
          }}>
            <span style={{ fontSize:10, letterSpacing:3, textTransform:'uppercase', color:C.inkSoft }}>scroll</span>
            <ChevronDown size={16} color={C.inkSoft}/>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════════════════════ */}
      <section id="about" style={{ padding:'120px 0', position:'relative' }}>
        <div style={{ maxWidth:980, margin:'0 auto', padding:'0 32px' }}>
          <Reveal>
            <ChapterMark n={1} label="The story so far" />
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
            <div>
              <Reveal delay={100}>
                <SH>About <em style={{ fontStyle:'italic', color:C.sage }}>Me</em></SH>
              </Reveal>

              <Reveal delay={200}>
                <GlassCard style={{ padding:36, marginTop:32 }}>
                  <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.25rem', lineHeight:1.8, color:C.inkSoft, margin:'0 0 20px', fontWeight:300 }}>
                    I notice things. Small things. The hour I focus best. The bus driver who smiles wider on Fridays. My mom cooks more when I&apos;m home. I&apos;ve carried this instinct my whole life without a name for it. Data didn&apos;t teach me to see patterns. It gave me language for what I was already doing.
                  </p>
                  <p style={{ fontSize:'0.92rem', lineHeight:1.9, color:C.inkSoft, margin:'0 0 20px' }}>
                    I&apos;m Tam Mai, a Business Analytics senior at USF. I want to build data systems that actually get used. The kind that help an academic advisor spot a struggling student early, help a product team stop guessing and start deciding, or even help me plan my own budget better. Technical enough to build it right. Human enough to know what it&apos;s for. And lately, thinking a lot about where AI ends and where a human needs to step back in.
                  </p>

                  <div style={{
                    borderLeft:`2px solid ${C.sage}60`,
                    paddingLeft:20, margin:'28px 0',
                  }}>
                    <p style={{
                      fontFamily:'Cormorant Garamond, serif', fontSize:'1.1rem',
                      fontStyle:'italic', color:C.matcha, margin:0, lineHeight:1.7,
                    }}>
                      &ldquo;Stillness is not the absence of storm. It&apos;s what you build inside it.&rdquo;
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            </div>

            <div>
              <Reveal delay={300}>
                <GlassCard style={{ padding:36, marginTop:80 }}>
                  <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.3rem', color:C.ink, marginBottom:28 }}>
                    How I got here
                  </h3>

                  {[
                    {
                      dot:C.matcha,
                      label:'First internship →',
                      text:'I stopped waiting for answers and started creating the right conversations. One 30-minute meeting replaced days of back-and-forth. That\'s when I understood. Being productive isn\'t about being busy. It\'s about knowing where the energy should go.'
                    },
                    {
                      dot:C.sage,
                      label:'Where I learned to stay curious →',
                      text:'Every project is a new set of dots. I build small, stay close to feedback, and let the problem teach me. Each one has shown me a different corner of the data world and made me want to understand more of it.'
                    },
                    {
                      dot:C.dust,
                      label:'Where I learned to see differently →',
                      text:'I don\'t think good ideas only come from working harder. Mine come from books, from cooking, from being outdoors. Different angles on how people and systems actually behave. I bring all of that into everything I build.'
                    },
                  ].map((item, i) => (
                    <Reveal key={i} delay={400 + i*120}>
                      <div style={{ display:'flex', gap:16, marginBottom:28 }}>
                        <div style={{ flexShrink:0, paddingTop:4 }}>
                          <div style={{
                            width:10, height:10, borderRadius:'50%', background:item.dot,
                            boxShadow:`0 0 8px ${item.dot}80`,
                            animation:'breathe 3s ease-in-out infinite',
                          }}/>
                          {i < 2 && (
                            <div style={{
                              width:1, height:42, background:`linear-gradient(to bottom, ${item.dot}60, transparent)`,
                              marginLeft:4.5, marginTop:4,
                            }}/>
                          )}
                        </div>
                        <div>
                          <p style={{ fontSize:11, color:item.dot, letterSpacing:2, textTransform:'uppercase', margin:'0 0 6px', fontFamily:'serif' }}>{item.label}</p>
                          <p style={{ fontSize:'0.87rem', color:C.inkSoft, lineHeight:1.7, margin:0 }}>{item.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </GlassCard>
              </Reveal>

              <Reveal delay={500}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginTop:20 }}>
                  {[
                    { title:'Languages', body:'SQL · Python · R · NumPy · Pandas · Polars' },
                    { title:'BI & Viz', body:'Power BI · Tableau · AWS QuickSight · Excel' },
                    { title:'Data Stack', body:'Databricks · Snowflake · dbt · AWS · Git' },
                  ].map((s,i) => (
                    <GlassCard key={i} style={{ padding:16 }}>
                      <p style={{ fontSize:10, color:C.dust, letterSpacing:2, textTransform:'uppercase', margin:'0 0 6px', fontFamily:'serif' }}>{s.title}</p>
                      <p style={{ fontSize:11, color:C.inkSoft, lineHeight:1.6, margin:0 }}>{s.body}</p>
                    </GlassCard>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          EDUCATION
      ════════════════════════════════════════════════════════════ */}
      <section id="education" style={{ padding:'120px 0', position:'relative' }}>
        <div style={{
          position:'absolute', inset:0,
          background:`linear-gradient(135deg, ${C.sage}06 0%, transparent 60%)`,
          pointerEvents:'none',
        }}/>
        <div style={{ maxWidth:980, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1 }}>
          <Reveal>
            <ChapterMark n={2} label="Education & Leadership" />
            <SH>Where I <em style={{ fontStyle:'italic', color:C.sage }}>grew</em></SH>
          </Reveal>

          <Reveal delay={150}>
            <GlassCard style={{ padding:40, marginTop:40 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16, marginBottom:24 }}>
                <div>
                  <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.7rem', color:C.ink, margin:'0 0 4px' }}>University of South Florida</h3>
                  <p style={{ color:C.matcha, fontSize:'1rem', margin:0 }}>B.S. in AI &amp; Business Analytics</p>
                </div>
                <div style={{ textAlign:'right' }}>
                  <p style={{ color:C.dust, fontSize:12, margin:'0 0 4px', letterSpacing:1 }}>Expected May 2027</p>
                  <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.4rem', color:C.ink, margin:0 }}>3.92 GPA</p>
                </div>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {coursework.map((c,i) => <Tag key={i}>{c}</Tag>)}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={250}>
            <h3 style={{
              fontFamily:'Cormorant Garamond, serif', fontSize:'1.4rem', color:C.ink,
              margin:'52px 0 20px', display:'flex', alignItems:'center', gap:10,
            }}>
              <span style={{ width:24, height:1, background:C.sage, display:'inline-block' }}/>
              Campus Involvement
            </h3>
          </Reveal>

          {[
            {
              role:'Community Chair',
              org:'Google Developer Group on Campus @ USF',
              period:'Jan 2025 – Present',
              color:C.matcha,
              bullets:[
                'Organized DevFest 2025 for 230 participants across 4 cross-functional teams, managing project timeline via GitHub Kanban and achieving 62% attendance growth.',
                'Directed HackUSF 2026 logistics for 350 participants across 6 workshops and 10 rooms, training 50 volunteers and improving operational efficiency by 45%.',
                'Owned HackUSF 2026 sponsor outreach with templates, training, and meetings, securing $8,000+ in prizes and improving conversion rate 8× (0.75% → 6%).',
              ],
              links:[
                { label:'devfesttampabay.com', href:'https://devfesttampabay.com' },
                { label:'hackusf.com', href:'https://hackusf.com' },
              ],
            },
            {
              role:'Professional Development Associate',
              org:'Investment Club at USF',
              period:'May 2024 – May 2025',
              color:C.sage,
              bullets:[
                'Analyzed 100+ attendees per event using Excel dashboards to identify top 5% frequent participants.',
                'Led 2 analysts to develop data-backed one-pagers on networking and technical finance interview strategies for 1,800+ members.',
              ],
            },
          ].map((item, i) => (
            <Reveal key={i} delay={300 + i * 150}>
              <GlassCard style={{ padding:36, marginBottom:20 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:16 }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:item.color }}/>
                      <h4 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.3rem', color:C.ink, margin:0 }}>{item.role}</h4>
                    </div>
                    <p style={{ color:item.color, fontSize:'0.88rem', margin:0, paddingLeft:18 }}>{item.org}</p>
                  </div>
                  <span style={{ fontSize:11, color:C.dust, letterSpacing:1 }}>{item.period}</span>
                </div>
                <ul style={{ paddingLeft:18, margin:'0 0 16px' }}>
                  {item.bullets.map((b,j) => (
                    <li key={j} style={{ fontSize:'0.88rem', color:C.inkSoft, lineHeight:1.7, marginBottom:8 }}>{b}</li>
                  ))}
                </ul>
                {item.links && (
                  <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                    {item.links.map((l,j) => (
                      <a key={j} href={l.href} target="_blank" rel="noreferrer"
                        style={{ fontSize:11, color:item.color, textDecoration:'none', letterSpacing:0.5,
                          display:'flex', alignItems:'center', gap:4, cursor:'none' }}>
                        <ExternalLink size={10}/> {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          EXPERIENCE
      ════════════════════════════════════════════════════════════ */}
      <section id="experience" style={{ padding:'120px 0' }}>
        <div style={{ maxWidth:980, margin:'0 auto', padding:'0 32px' }}>
          <Reveal>
            <ChapterMark n={3} label="Chapters" />
            <SH>My <em style={{ fontStyle:'italic', color:C.sage }}>experiences</em></SH>
          </Reveal>

          <div style={{ position:'relative', marginTop:52 }}>
            <div style={{
              position:'absolute', left:19, top:0, bottom:0,
              width:1, background:`linear-gradient(to bottom, ${C.sage}50, transparent)`,
              zIndex:0,
            }}/>

            {experiences.map((exp, i) => (
              <Reveal key={i} delay={i * 150}>
                <div style={{ display:'flex', gap:32, marginBottom:48, position:'relative', zIndex:1 }}>
                  <div style={{ flexShrink:0, paddingTop:24 }}>
                    <div style={{
                      width:40, height:40, borderRadius:'50%',
                      background:`${exp.color}20`,
                      border:`2px solid ${exp.color}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <div style={{ width:10, height:10, borderRadius:'50%', background:exp.color }}/>
                    </div>
                  </div>

                  <GlassCard style={{ padding:36, flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:20 }}>
                      <div>
                        <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.5rem', color:C.ink, margin:'0 0 4px' }}>{exp.role}</h3>
                        <p style={{ color:exp.color, fontSize:'0.9rem', margin:0 }}>{exp.org}</p>
                      </div>
                      <span style={{ fontSize:11, color:C.dust, letterSpacing:1 }}>{exp.period}</span>
                    </div>

                    <ul style={{ paddingLeft:16, margin:'0 0 20px' }}>
                      {exp.bullets.map((b,j) => (
                        <li key={j} style={{ fontSize:'0.88rem', color:C.inkSoft, lineHeight:1.8, marginBottom:10 }}>
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div style={{
                      display:'inline-flex', alignItems:'center', gap:8,
                      padding:'8px 16px', borderRadius:40,
                      background:`${exp.color}12`,
                      border:`1px solid ${exp.color}30`,
                    }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:exp.color }}/>
                      <span style={{ fontSize:11, color:exp.color, fontStyle:'italic', fontFamily:'Cormorant Garamond, serif' }}>
                        {exp.lesson}
                      </span>
                    </div>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PROJECTS — renamed to Featured project
      ════════════════════════════════════════════════════════════ */}
      <section id="projects" style={{ padding:'120px 0', position:'relative' }}>
        <div style={{
          position:'absolute', inset:0,
          background:`linear-gradient(135deg, ${C.paper} 0%, ${C.sage}08 100%)`,
          pointerEvents:'none',
        }}/>
        <div style={{ maxWidth:980, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1 }}>
          <Reveal>
            <ChapterMark n={4} label="Observations" />
            <SH>Featured <em style={{ fontStyle:'italic', color:C.sage }}>project</em></SH>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.1rem', color:C.dust, marginTop:8, fontStyle:'italic' }}>
              One project, told properly. A quiet, detail-oriented person noticing what others miss.
            </p>
          </Reveal>

          <div style={{ marginTop:52, display:'grid', gap:28 }}>
            {projects.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <GlassCard style={{ padding:40 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:28 }}>
                    <div>
                      <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.9rem', color:C.ink, margin:'0 0 4px' }}>{p.title}</h3>
                      <p style={{ color:C.dust, fontSize:'0.88rem', margin:0, letterSpacing:1 }}>{p.subtitle}</p>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:10 }}>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'flex-end' }}>
                        {p.tech.map((t,j) => <Tag key={j}>{t}</Tag>)}
                      </div>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer"
                          style={{
                            fontSize:11, color:C.matcha, textDecoration:'none',
                            letterSpacing:1, display:'flex', alignItems:'center', gap:6,
                            cursor:'none', fontFamily:'serif', textTransform:'uppercase',
                            padding:'6px 12px', borderRadius:20,
                            border:`1px solid ${C.matcha}40`,
                            transition:'all 0.3s ease',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.matcha; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.matcha; }}
                        >
                          <Github size={12}/> View on GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20 }}>
                    {[
                      { label:'Scattered Dots', text:p.scattered, color:C.dust, n:'●' },
                      { label:'Connecting Dots', text:p.connecting, color:C.sage, n:'●—●' },
                      { label:'Clear Picture', text:p.clear, color:C.matcha, n:'●●●' },
                    ].map((d,j) => (
                      <div key={j} style={{
                        padding:20,
                        background:`${d.color}0A`,
                        borderRadius:12,
                        borderTop:`2px solid ${d.color}40`,
                      }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                          <span style={{ fontSize:9, color:d.color, letterSpacing:2 }}>{d.n}</span>
                          <span style={{ fontSize:9, color:d.color, letterSpacing:2, textTransform:'uppercase', fontFamily:'serif' }}>{d.label}</span>
                        </div>
                        <p style={{ fontSize:'0.84rem', color:C.inkSoft, lineHeight:1.7, margin:0 }}>{d.text}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    marginTop:20, padding:'12px 16px',
                    background:`${C.matcha}08`, borderRadius:8,
                    border:`1px solid ${C.matcha}20`,
                    display:'flex', alignItems:'flex-start', gap:10,
                  }}>
                    <span style={{ fontSize:10, color:C.matcha, marginTop:1 }}>✦</span>
                    <div>
                      <span style={{ fontSize:9, color:C.matcha, letterSpacing:2, textTransform:'uppercase', fontFamily:'serif' }}>Detail I&apos;m proud of · </span>
                      <span style={{ fontSize:'0.82rem', color:C.inkSoft, fontStyle:'italic' }}>
                        {p.proudDetail}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          BOOKS
      ════════════════════════════════════════════════════════════ */}
      <section id="books" style={{ padding:'120px 0' }}>
        <div style={{ maxWidth:980, margin:'0 auto', padding:'0 32px' }}>
          <Reveal>
            <ChapterMark n={5} label="The reading corner" />
            <SH>What I&apos;m <em style={{ fontStyle:'italic', color:C.sage }}>reading</em></SH>
          </Reveal>

          <Reveal delay={150}>
            <div style={{
              padding:'24px 20px 8px',
              background:`${C.ink}08`,
              borderRadius:16,
              borderBottom:`4px solid ${C.dust}60`,
              marginTop:32, marginBottom:32,
              display:'flex', gap:8, alignItems:'flex-end', overflowX:'auto',
            }}>
              {books.map((b,i) => (
                <BookSpine key={i} book={b} i={i}/>
              ))}
            </div>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:20 }}>
            {books.map((b,i) => (
              <Reveal key={i} delay={i*80}>
                <GlassCard style={{ padding:28 }}>
                  <div style={{ display:'flex', gap:14, marginBottom:12 }}>
                    <div style={{
                      width:6, flexShrink:0, borderRadius:3,
                      background:`linear-gradient(to bottom, ${b.color}, ${b.color}60)`,
                      alignSelf:'stretch',
                    }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                        <h4 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.15rem', color:C.ink, margin:'0 0 3px' }}>{b.title}</h4>
                        {b.currentlyReading && (
                          <span style={{
                            fontSize:9, letterSpacing:1, textTransform:'uppercase',
                            padding:'2px 8px', borderRadius:20,
                            background:`${b.color}20`, color:b.color,
                            fontFamily:'serif',
                          }}>
                            reading now
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize:11, color:C.dust, margin:0, fontStyle:'italic' }}>{b.author}</p>
                    </div>
                  </div>
                  <p style={{ fontSize:'0.86rem', color:C.inkSoft, lineHeight:1.7, margin:0 }}>{b.insight}</p>
                  {b.rating > 0 && (
                    <div style={{ display:'flex', gap:4, marginTop:14 }}>
                      {[...Array(5)].map((_,j) => (
                        <div key={j} style={{
                          width:6, height:6, borderRadius:'50%',
                          background: j < b.rating ? b.color : `${b.color}30`,
                        }}/>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <GlassCard style={{ padding:40, marginTop:48 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                <Coffee size={20} color={C.matcha}/>
                <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.4rem', color:C.ink, margin:0 }}>Off the Clock</h3>
              </div>
              <p style={{ fontSize:'0.95rem', color:C.inkSoft, lineHeight:1.9, margin:0, maxWidth:640 }}>
                The sizzle from home. The relaxing vibe it gives. The feeling of knowing someone is waiting to try my food after being outside all day. That&apos;s what cooking is for me. Vietnamese cuisine, home cooking, discovering new flavors, and creating small moments around a shared table.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding:'120px 0 80px' }}>
        <div style={{ maxWidth:700, margin:'0 auto', padding:'0 32px', textAlign:'center' }}>
          <Reveal>
            <ChapterMark n={6} label="Let's add a dot" />
          </Reveal>

          <Reveal delay={100}>
            <svg width="200" height="60" style={{ margin:'0 auto 32px', display:'block' }}>
              <circle cx="30" cy="30" r="6" fill={C.sage} opacity="0.7"/>
              <circle cx="100" cy="30" r="4" fill={C.matcha} opacity="0.5"/>
              <circle cx="170" cy="30" r="6" fill={C.sage} opacity="0.7"/>
              <line x1="36" y1="30" x2="96" y2="30" stroke={C.sage} strokeWidth="1"
                strokeDasharray="4 4" opacity="0.5"
                style={{ animation:'drawLine 2s ease 0.5s both' }}/>
              <line x1="104" y1="30" x2="164" y2="30" stroke={C.sage} strokeWidth="1"
                strokeDasharray="4 4" opacity="0.5"
                style={{ animation:'drawLine 2s ease 1s both' }}/>
              <circle cx="100" cy="30" r="12" fill="none" stroke={C.matcha}
                strokeWidth="1" opacity="0.3"
                style={{ animation:'breathe 2s ease-in-out infinite' }}/>
            </svg>
          </Reveal>

          <Reveal delay={150}>
            <SH>Let&apos;s <em style={{ fontStyle:'italic', color:C.sage }}>connect</em></SH>
            <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.15rem', color:C.dust, marginTop:16, marginBottom:48, lineHeight:1.7 }}>
              I&apos;d love to connect and add another dot.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:40 }}>
              <a href={LINKS.email} style={{
                padding:'14px 36px', borderRadius:40,
                background:C.matcha, color:'#fff',
                fontSize:12, letterSpacing:2, textTransform:'uppercase',
                textDecoration:'none', fontFamily:'serif',
                boxShadow:`0 8px 24px ${C.matcha}35`,
                display:'flex', alignItems:'center', gap:8,
                transition:'all 0.3s ease', cursor:'none',
              }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
              >
                <Mail size={15}/> Email Me
              </a>
              <a href={LINKS.resume} style={{
                padding:'14px 36px', borderRadius:40,
                border:`1.5px solid ${C.sage}`,
                color:C.inkSoft, fontSize:12, letterSpacing:2, textTransform:'uppercase',
                textDecoration:'none', fontFamily:'serif',
                display:'flex', alignItems:'center', gap:8,
                transition:'all 0.3s ease', cursor:'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.background=C.sage; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=C.inkSoft; }}
              >
                <FileText size={15}/> Resume
              </a>
            </div>

            <div style={{ display:'flex', gap:24, justifyContent:'center' }}>
              {[
                { href:LINKS.linkedin, icon:<Linkedin size={20}/>, label:'LinkedIn' },
                { href:LINKS.github,   icon:<Github   size={20}/>, label:'GitHub' },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  title={label}
                  style={{
                    width:48, height:48, borderRadius:'50%',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    border:`1.5px solid ${C.sageDim}`,
                    color:C.inkSoft, textDecoration:'none',
                    transition:'all 0.3s ease', cursor:'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=C.matcha; e.currentTarget.style.color=C.matcha; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=C.sageDim; e.currentTarget.style.color=C.inkSoft; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

/* ─── BOOK SPINE ───────────────────────────────────────────────── */
const BookSpine = ({ book, i }) => {
  const [hov, setHov] = useState(false);
  const heights = [120, 140, 115, 135, 125, 130, 118];
  const widths  = [32, 28, 36, 30, 34, 31, 33];
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: widths[i % widths.length],
        height: heights[i % heights.length],
        borderRadius:'3px 2px 2px 3px',
        background: `linear-gradient(160deg, ${book.color}CC, ${book.color}88)`,
        display:'flex', alignItems:'center', justifyContent:'center',
        flexShrink:0,
        transform: hov ? 'translateY(-8px)' : 'translateY(0)',
        transition:'transform 0.3s ease',
        boxShadow: hov ? `2px 0 16px ${book.color}50` : '2px 0 6px rgba(0,0,0,0.1)',
        cursor:'none',
        position:'relative',
      }}
    >
      <span style={{
        writingMode:'vertical-rl', textOrientation:'mixed',
        fontSize:8, color:'rgba(255,255,255,0.85)', letterSpacing:2,
        textTransform:'uppercase', fontFamily:'serif',
        transform:'rotate(180deg)', padding:'4px 0',
        overflow:'hidden', maxHeight:'90%',
      }}>
        {book.title}
      </span>
      {hov && (
        <div style={{
          position:'absolute', bottom:'calc(100% + 8px)', left:'50%',
          transform:'translateX(-50%)',
          background:'rgba(28,26,22,0.88)',
          backdropFilter:'blur(8px)',
          borderRadius:8, padding:'8px 12px',
          whiteSpace:'nowrap', zIndex:10,
        }}>
          <p style={{ fontSize:11, color:'#fff', margin:0, fontFamily:'serif' }}>{book.title}</p>
          <p style={{ fontSize:9, color:book.color, margin:'2px 0 0', fontStyle:'italic' }}>{book.author}</p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;