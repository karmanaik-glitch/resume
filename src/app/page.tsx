'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// ══════════════ 1. ULTRA-SMOOTH ANIMATION VARIANTS ══════════════
// Using spring physics for a premium, buttery-smooth float effect
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 40, damping: 15, mass: 1 } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

// ══════════════ 2. GLOBAL MOVING BACKGROUND GRADIENT ══════════════
const MovingGradient = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ x: [0, 50, 0, -50, 0], y: [0, 30, -30, 0, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[#00D4FF] opacity-[0.05]"
        style={{ filter: 'blur(120px)' }}
      />
      <motion.div
        animate={{ x: [0, -60, 0, 40, 0], y: [0, -40, 40, 0, 0], scale: [1, 1.2, 0.8, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#C8A96E] opacity-[0.03]"
        style={{ filter: 'blur(140px)' }}
      />
      <motion.div
        animate={{ x: [0, 40, 0, -40, 0], y: [0, 50, 0, -50, 0], scale: [1, 1.15, 0.85, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[10%] w-[55vw] h-[55vw] rounded-full bg-[#00D4FF] opacity-[0.04]"
        style={{ filter: 'blur(150px)' }}
      />
    </div>
  );
};

// ══════════════ 3. MAIN PAGE COMPONENT ══════════════
export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  const experiences = [
    {
      title: "Clinical Training", org: "GMERS Civil Hospital", period: "2023 – Present",
      bullets: ["Recorded patient profiles, medication histories, and clinical data during hospital training rounds", "Attended ward rounds and performed systematic prescription reviews and medication audits", "Developed individualized pharmaceutical care plans", "Counselled patients on medication use and potential drug interactions"],
      meta: [{ label: "Setting", val: "Government tertiary care hospital" }, { label: "Key Skills", val: "Clinical documentation, Rx review, ECG interpretation" }]
    },
    {
      title: "Academic Research", org: "KBIPER, Gandhinagar", period: "2025 – 2026",
      bullets: ["Designed and conducted a KAP study on oral hygiene products among community pharmacy customers", "Managed data collection, clinical documentation, and statistical analysis end-to-end", "Prepared comprehensive research report with literature review and inferential statistics"],
      meta: [{ label: "Study Type", val: "Cross-sectional KAP survey" }, { label: "Output", val: "Poster presentation · NIPICON 2026" }]
    },
    {
      title: "Volunteering & Outreach", org: "ISPOR, WDC & Primary School", period: "2025 – 2026",
      bullets: ["Assisted in registration, documentation, and participant flow for Women's Cancer Screening Camp", "Supported clinical data recording and quality checks during the camp", "Conducted basic health screening and participant interaction at community-level camps"],
      meta: [{ label: "Focus", val: "Community outreach & clinical screening" }, { label: "Locations", val: "Randheja, Kadi & Gandhinagar" }]
    }
  ];

  return (
    <main className="relative bg-[#03040A] text-[#E8EEF7] min-h-screen font-sans selection:bg-[#00D4FF] selection:text-black">
      
      {/* ════ GLOBAL BACKGROUNDS & CURSOR OVERRIDE ════ */}
      <MovingGradient />
      
      <style dangerouslySetInnerHTML={{__html: `
        /* Strictly remove default cursor everywhere */
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #03040A; }
        ::-webkit-scrollbar-thumb { background: #8C7040; }
        html, body { overflow-x: hidden; scroll-behavior: smooth; }
        .noise-overlay { position: fixed; inset: 0; z-index: 9997; pointer-events: none; opacity: 0.02; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E"); }
      `}} />
      <div className="noise-overlay" />

      {/* ════ CUSTOM CURSOR ════ */}
      <motion.div className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#00D4FF] rounded-full pointer-events-none z-[9999] mix-blend-screen hidden md:block" animate={{ x: mousePosition.x - 3, y: mousePosition.y - 3 }} transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }} />
      <motion.div className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] mix-blend-screen hidden md:flex items-center justify-center" animate={{ x: mousePosition.x - (isHovering ? 28 : 18), y: mousePosition.y - (isHovering ? 28 : 18), width: isHovering ? 56 : 36, height: isHovering ? 56 : 36, borderColor: isHovering ? 'rgba(200,169,110,0.6)' : 'rgba(0,212,255,0.4)', backgroundColor: isHovering ? 'rgba(200,169,110,0.04)' : 'transparent' }} transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }} />

      {/* ════ FLOATING NAVIGATION ════ */}
      <nav className="fixed top-7 right-9 z-[200] flex items-center gap-1 p-1.5 border border-white/10 rounded-full bg-[#060810]/75 backdrop-blur-md">
        {['Skills', 'Experience', 'Projects', 'Education'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="font-mono text-[10px] tracking-widest uppercase text-white/50 px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">{item}</a>
        ))}
      </nav>

      {/* ════ HERO SECTION ════ */}
      <section id="home" className="relative min-h-screen flex items-center px-6 md:px-[8vw] overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="col-start-1">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C8A96E]" />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8A96E]">Pharm.D · CDM · Healthcare AI</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-serif text-6xl md:text-[112px] font-light leading-[0.92] tracking-tight text-[#E8EEF7] mb-4">
              Karma<br/>
              <span className="italic bg-clip-text text-transparent bg-gradient-to-br from-[#00D4FF] to-[#7AEAFF]">Naik</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-mono text-xs md:text-sm tracking-[0.12em] uppercase text-[#00D4FF] mb-8">
              Clinical Data Management & Trial Operations
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-[15px] leading-[1.8] text-white/50 max-w-[500px] mb-11">
              Pharm.D student with hands-on experience in clinical training, patient care, and research. Certified in Good Clinical Practice (GCP) and actively pursuing data analytics and Clinical Data Management (CDM) to bridge pharmaceutical care with clinical research.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a href="#projects" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#03040A] bg-[#00D4FF] px-8 py-3.5 rounded-sm hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,212,255,0.25)] transition-all">
                View Projects
              </a>
              <a href="#contact" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/50 border border-white/10 px-8 py-3.5 rounded-sm hover:text-white hover:border-white/30 transition-all">
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════ SKILLS BENTO GRID ════ */}
      <section id="skills" className="px-6 md:px-[8vw] py-[100px] relative z-10 w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-x-6 items-end mb-[72px]">
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#C8A96E] pb-1 col-start-1 row-start-1">01</span>
          <h2 className="font-serif text-4xl md:text-[66px] font-light tracking-tight text-[#E8EEF7] leading-none col-start-1 row-start-1">Competencies</h2>
          <div className="h-px bg-gradient-to-r from-[#C8A96E]/40 to-transparent mt-2 col-start-2 row-start-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Clinical Skills */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="md:col-span-5 bg-[#07090E]/80 backdrop-blur-md border border-white/5 p-7 rounded hover:border-white/10 hover:-translate-y-1 transition-all">
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#C8A96E] mb-3.5 flex items-center gap-2"><div className="w-4 h-px bg-[#C8A96E]"/> Clinical Care</div>
            <h3 className="font-serif text-[26px] text-[#E8EEF7] leading-[1.1] mb-4">Patient Interaction</h3>
            <div className="flex flex-wrap gap-1.5">
              {['GCP Certified', 'ECG Interpretation', 'Medication History', 'Rx Review', 'Pharma Care Planning', 'Basic Screening'].map(tag => (
                <span key={tag} className="font-mono text-[10px] px-2.5 py-1 border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] rounded-sm">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Research Skills */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="md:col-span-7 bg-[#07090E]/80 backdrop-blur-md border border-white/5 p-7 rounded hover:border-white/10 hover:-translate-y-1 transition-all">
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#C8A96E] mb-3.5 flex items-center gap-2"><div className="w-4 h-px bg-[#C8A96E]"/> Research & CDM</div>
            <h3 className="font-serif text-[26px] text-[#E8EEF7] leading-[1.1] mb-4">Study Architecture</h3>
            <div className="flex flex-wrap gap-1.5">
              {['Study Design', 'Protocol Development', 'CRF Design', 'Data Collection', 'Data Cleaning & Validation', 'Descriptive & Inferential Stats', 'Scientific Writing'].map(tag => (
                <span key={tag} className="font-mono text-[10px] px-2.5 py-1 border border-[#C8A96E]/25 bg-[#C8A96E]/5 text-[#C8A96E] rounded-sm">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="md:col-span-6 bg-[#05060A]/80 backdrop-blur-md border border-white/5 p-7 rounded hover:border-white/10 hover:-translate-y-1 transition-all">
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#00E5A0] mb-3.5 flex items-center gap-2"><div className="w-4 h-px bg-[#00E5A0]"/> Technical</div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['Python (Pandas, NumPy, Matplotlib)', 'SQL', 'Tableau', 'Power BI', 'MS Excel'].map(tag => (
                <span key={tag} className="font-mono text-[10px] px-2.5 py-1 border border-[#00E5A0]/25 bg-[#00E5A0]/5 text-[#00E5A0] rounded-sm">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills & Hobbies */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="md:col-span-6 bg-[#05060A]/80 backdrop-blur-md border border-white/5 p-7 rounded hover:border-white/10 hover:-translate-y-1 transition-all">
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/50 mb-3.5 flex items-center gap-2"><div className="w-4 h-px bg-white/30"/> Interpersonal & Interests</div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['Project Management', 'Team Coordination', 'AI/ML Exploration', 'Financial Markets', 'Sports'].map(tag => (
                <span key={tag} className="font-mono text-[10px] px-2.5 py-1 border border-white/10 bg-white/5 text-white/50 rounded-sm">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ EXPERIENCE TABS ════ */}
      <section id="experience" className="px-6 md:px-[8vw] py-[100px] relative z-10 w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-x-6 items-end mb-[72px]">
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#C8A96E] pb-1 col-start-1 row-start-1">02</span>
          <h2 className="font-serif text-4xl md:text-[66px] font-light tracking-tight text-[#E8EEF7] leading-none col-start-1 row-start-1">Experience</h2>
          <div className="h-px bg-gradient-to-r from-[#C8A96E]/40 to-transparent mt-2 col-start-2 row-start-2" />
        </motion.div>

        <div className="flex flex-wrap gap-4 md:gap-0 border-b border-white/5 mb-12">
          {["Phase I · Clinical", "Phase II · Research", "Phase III · Outreach"].map((phase, idx) => (
            <button key={idx} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={() => setActivePhase(idx)} className={`relative flex flex-col gap-1 pb-5 pr-8 text-left transition-colors ${activePhase === idx ? 'text-[#E8EEF7]' : 'text-white/30 hover:text-white/70'}`}>
              <span className={`font-mono text-[9px] tracking-[0.12em] uppercase ${activePhase === idx ? 'text-[#C8A96E]' : 'text-white/20'}`}>{phase}</span>
              <span className="font-serif text-lg">{experiences[idx].org.split(',')[0]}</span>
              {activePhase === idx && <motion.div layoutId="activeTab" transition={{ type: "spring", stiffness: 50, damping: 15 }} className="absolute bottom-[-1px] left-0 right-8 h-px bg-[#C8A96E]" />}
            </button>
          ))}
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div key={activePhase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 items-start">
              <div>
                <h3 className="font-serif text-[40px] font-light text-[#E8EEF7] leading-[1.1] mb-2">{experiences[activePhase].title}</h3>
                <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#00D4FF] mb-1.5">{experiences[activePhase].org}</div>
                <div className="font-mono text-[10px] tracking-[0.08em] text-white/20 mb-8">{experiences[activePhase].period}</div>
                <ul className="flex flex-col gap-3.5">
                  {experiences[activePhase].bullets.map((bullet, i) => (
                    <li key={i} className="text-[14px] text-white/50 leading-[1.7] pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-[#C8A96E] before:text-[12px]">{bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                {experiences[activePhase].meta.map((m, i) => (
                  <div key={i} className="bg-[#07090E]/80 backdrop-blur-md border border-white/5 rounded p-5">
                    <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#C8A96E] mb-2">{m.label}</div>
                    <div className="text-[13px] text-white/50 leading-[1.6]">{m.val}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════ PROJECTS GRID (RESTORED WITH LINKS) ════ */}
      <section id="projects" className="px-6 md:px-[8vw] py-[100px] relative z-10 w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-x-6 items-end mb-[72px]">
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#C8A96E] pb-1 col-start-1 row-start-1">03</span>
          <h2 className="font-serif text-4xl md:text-[66px] font-light tracking-tight text-[#E8EEF7] leading-none col-start-1 row-start-1">Projects</h2>
          <div className="h-px bg-gradient-to-r from-[#C8A96E]/40 to-transparent mt-2 col-start-2 row-start-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              num: "01", badge: "CDM · Risk Analytics", title: "RBQM Dashboard", color: "#00D4FF", 
              desc: "A Risk-Based Quality Management tool for clinical trial monitoring. Surfaces site-level risk signals, tracks Key Risk Indicators, and enables data-driven oversight.",
              tags: ["Risk Indicators", "Site Monitoring", "KRI Tracking"], link: "https://rbqm.vercel.app/" 
            },
            { 
              num: "02", badge: "Simulation · EdTech", title: "Clinical Simulator", color: "#00E5A0", 
              desc: "An interactive training platform for clinical pharmacy scenarios — prescription review, drug interaction detection, and pharmaceutical care decision-making.",
              tags: ["Rx Review", "Patient Scenarios", "Pharma Training"], link: "https://clinical-pharmacy-simulator.vercel.app/" 
            },
            { 
              num: "03", badge: "AI · Healthcare", title: "PharmAI", color: "#C8A96E", 
              desc: "An AI-powered pharmaceutical intelligence tool at the intersection of healthcare data and machine learning — demonstrating applied data preprocessing and model building.",
              tags: ["Machine Learning", "Python · Pandas", "Clinical AI"], link: "https://karmanaik-glitch.github.io/test/" 
            }
          ].map((proj, idx) => (
            <motion.a 
              key={idx} href={proj.link} target="_blank" rel="noopener noreferrer" 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} 
              className="group block relative bg-[#07090E]/80 backdrop-blur-md border border-white/5 rounded p-8 hover:border-white/10 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="font-serif text-[80px] font-light leading-none mb-5 text-white/5 transition-opacity group-hover:text-white/10">{proj.num}</div>
              
              <div className="font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm border inline-block mb-5" style={{ color: proj.color, borderColor: `${proj.color}40`, backgroundColor: `${proj.color}0D` }}>
                {proj.badge}
              </div>
              
              <h3 className="font-serif text-[28px] text-[#E8EEF7] leading-[1.1] mb-3.5">{proj.title}</h3>
              <p className="text-[13px] text-white/50 leading-[1.7] mb-6">{proj.desc}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-7">
                {proj.tags.map(tag => <span key={tag} className="font-mono text-[9px] tracking-[0.05em] text-white/20 border border-white/5 px-2 py-1 rounded-sm">{tag}</span>)}
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/50 group-hover:text-[#00D4FF] transition-colors">View Live Project</span>
                <span className="text-white/20 group-hover:text-[#00D4FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">↗</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ════ EDUCATION & CERTIFICATIONS ════ */}
      <section id="education" className="px-6 md:px-[8vw] py-[100px] relative z-10 w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-x-6 items-end mb-[72px]">
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#C8A96E] pb-1 col-start-1 row-start-1">04</span>
          <h2 className="font-serif text-4xl md:text-[66px] font-light tracking-tight text-[#E8EEF7] leading-none col-start-1 row-start-1">Education & Certs</h2>
          <div className="h-px bg-gradient-to-r from-[#C8A96E]/40 to-transparent mt-2 col-start-2 row-start-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education Box */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#07090E]/80 backdrop-blur-md border border-white/5 rounded p-9">
            <h3 className="font-serif text-[36px] font-light text-[#E8EEF7] leading-[1.1] mb-2">Doctor of Pharmacy<br/><em className="italic text-[#00D4FF]">Pharm.D</em></h3>
            <p className="text-[13px] text-white/50 mb-1">K.B. Institute of Pharmaceutical Education and Research (KBIPER)</p>
            <p className="font-mono text-[10px] tracking-[0.08em] text-white/20 mb-9">2022 – 2027 · Gandhinagar, Gujarat</p>
            
            <div className="flex flex-col gap-3 mb-8">
              {[{ label: "Yr 1", pct: 75.00 }, { label: "Yr 2", pct: 75.44 }, { label: "Yr 3", pct: 80.18 }, { label: "Yr 4", pct: 80.50 }].map((yr, i) => (
                <div key={i} className="flex items-center gap-3.5">
                  <span className="font-mono text-[10px] tracking-[0.06em] text-white/20 w-11">{yr.label}</span>
                  <div className="flex-1 h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${yr.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.5, type: "spring" }} className="h-full bg-gradient-to-r from-[#8C7040] to-[#C8A96E]" />
                  </div>
                  <span className="font-mono text-[11px] text-[#C8A96E] w-12 text-right">{yr.pct}%</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[13px] text-white/50">HSC Science — A B School</span>
                <span className="font-mono text-[11px] text-[#00D4FF]">84.85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-white/50">SSC — SGM Shiroiya Sr. Sec.</span>
                <span className="font-mono text-[11px] text-[#00D4FF]">85.60%</span>
              </div>
            </div>
          </motion.div>

          {/* Certifications Box */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-3">
            {[
              { name: "Data Analyst Bootcamp", sub: "Python, SQL, Tableau, Excel, Power BI", status: "Ongoing", color: "#C8A96E" },
              { name: "Good Clinical Practice", sub: "ICMR & NDCT Rules", status: "2025", color: "#00D4FF" },
              { name: "Research Methodology", sub: "Certification", status: "2025", color: "#00D4FF" },
              { name: "ECG Interpretation", sub: "Certification", status: "2023", color: "#00E5A0" }
            ].map((cert, i) => (
              <div key={i} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="bg-[#05060A]/80 backdrop-blur-md border border-white/5 p-5 rounded hover:border-white/10 hover:translate-x-1 transition-all flex items-center justify-between">
                <div>
                  <div className="text-[14px] text-[#E8EEF7] mb-1">{cert.name}</div>
                  <div className="font-mono text-[9px] tracking-[0.08em] text-white/30">{cert.sub}</div>
                </div>
                <div className="font-mono text-[9px] px-2.5 py-1 border rounded-sm" style={{ color: cert.color, borderColor: `${cert.color}40`, backgroundColor: `${cert.color}0D` }}>
                  {cert.status}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ CONFERENCES & PUBLICATIONS ════ */}
      <section className="px-6 md:px-[8vw] py-[100px] relative z-10 w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-x-6 items-end mb-[72px]">
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#C8A96E] pb-1 col-start-1 row-start-1">05</span>
          <h2 className="font-serif text-4xl md:text-[66px] font-light tracking-tight text-[#E8EEF7] leading-none col-start-1 row-start-1">Conferences</h2>
          <div className="h-px bg-gradient-to-r from-[#C8A96E]/40 to-transparent mt-2 col-start-2 row-start-2" />
        </motion.div>

        <div className="flex flex-col bg-[#07090E]/80 backdrop-blur-md border border-white/5 rounded p-8">
          {[
            { year: "2026", title: "Knowledge, Attitude, Perception and Practices Towards Oral Hygiene Products...", event: "NIPICON, Nirma University, Ahmedabad", type: "Poster" },
            { year: "2025", title: "Antimicrobial Resistance: A Global Health Challenge", event: "CPCON, Manipal", type: "Poster" },
            { year: "2025", title: "Evaluation of Safety and Clinical Information in Package Inserts of Anti-Cancer Medicines", event: "DST Sponsored National Seminar, ITM SLS, Vadodara", type: "Poster" },
            { year: "2025", title: "National Pharmacy Conference Attendee", event: "KBICON Conference, KBIPER, Gandhinagar", type: "Conference" }
          ].map((conf, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`grid grid-cols-[50px_1fr_auto] gap-6 items-start py-6 ${i !== 3 ? 'border-b border-white/5' : ''}`}>
              <div className="font-mono text-[11px] text-[#C8A96E] pt-1">{conf.year}</div>
              <div>
                <div className="text-[14px] text-[#E8EEF7] mb-1.5">{conf.title}</div>
                <div className="font-mono text-[10px] text-white/40">{conf.event}</div>
              </div>
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-[#00D4FF] bg-[#00D4FF]/10 px-2 py-1 rounded-sm">{conf.type}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ EXTRA-CURRICULAR & REFERENCES ════ */}
      <section className="px-6 md:px-[8vw] py-[100px] relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="font-serif text-[28px] text-[#E8EEF7] mb-8 border-b border-white/5 pb-4">Achievements & Extras</h3>
            <ul className="flex flex-col gap-5">
              <li className="text-[13px] text-white/50 relative pl-5 before:content-['—'] before:absolute before:left-0 before:text-[#C8A96E] before:text-[12px]">
                Attended 5-day Leadership Development Programme - "Sarva Netrutva" (2022)
              </li>
              <li className="text-[13px] text-white/50 relative pl-5 before:content-['—'] before:absolute before:left-0 before:text-[#C8A96E] before:text-[12px]">
                Volunteered as LOC Member - Apocalypse Cultural Event (2022)
              </li>
              <li className="text-[13px] text-white/50 relative pl-5 before:content-['—'] before:absolute before:left-0 before:text-[#00D4FF] before:text-[12px]">
                Silver Medalist - Cricket Tournament (College Level) | 2024 & 2026
              </li>
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="font-serif text-[28px] text-[#E8EEF7] mb-8 border-b border-white/5 pb-4">References</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-[#05060A]/80 backdrop-blur-md border border-white/5 p-5 rounded">
                <div className="text-[14px] text-[#E8EEF7]">Dr. Vinit Movaliya</div>
                <div className="font-mono text-[10px] text-white/40 mb-3">Assistant Professor, Dept. of Pharmacognosy<br/>KBIPER, Gandhinagar</div>
                <div className="font-mono text-[10px] text-[#00D4FF]">vinit.movaliya@kbiper.ac.in | +91 9913343734</div>
              </div>
              <div className="bg-[#05060A]/80 backdrop-blur-md border border-white/5 p-5 rounded">
                <div className="text-[14px] text-[#E8EEF7]">Dr. Jinal Chaudhary</div>
                <div className="font-mono text-[10px] text-white/40 mb-3">Assistant Professor, Dept. of Pharmacology<br/>KBIPER, Gandhinagar</div>
                <div className="font-mono text-[10px] text-[#00D4FF]">jinal.chaudhary@kbiper.ac.in | +91 9265095604</div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* ════ FOOTER WITH ICONS ════ */}
      <footer id="contact" className="px-6 md:px-[8vw] py-[120px] relative z-10 flex flex-col items-center text-center border-t border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8A96E] mb-5">Available for opportunities</div>
          <h2 className="font-serif text-5xl md:text-[88px] font-light text-[#E8EEF7] leading-[1.05] tracking-tight mb-8">Let's build something<br/><em className="italic text-[#00D4FF]">meaningful.</em></h2>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="mailto:karmnaik@gmail.com" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-white/50 border border-white/10 px-6 py-4 rounded-sm hover:text-white hover:border-white/30 hover:bg-white/5 transition-all backdrop-blur-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              karmnaik@gmail.com
            </a>
            
            <a href="tel:+919099638123" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-white/50 border border-white/10 px-6 py-4 rounded-sm hover:text-white hover:border-white/30 hover:bg-white/5 transition-all backdrop-blur-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              +91 9099638123
            </a>
            
            <a href="https://linkedin.com/in/karma-naik" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-white/50 border border-white/10 px-6 py-4 rounded-sm hover:text-white hover:border-white/30 hover:bg-white/5 transition-all backdrop-blur-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          </div>
          
          <div className="mt-24 font-mono text-[10px] tracking-[0.08em] text-white/20">
            © 2026 Karma Naik · Pharm.D (Student) · Ahmedabad, Gujarat
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
