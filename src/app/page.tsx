'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// ══════════════ ANIMATION VARIANTS (STRICT TYPESCRIPT) ══════════════
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ══════════════ MAIN PAGE COMPONENT ══════════════
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
      bullets: ["Recorded patient profiles, medication histories, and clinical data", "Attended ward rounds and performed prescription reviews", "Developed individualized pharmaceutical care plans", "Counselled patients on medication use and drug interactions"],
      meta: [{ label: "Setting", val: "Government tertiary care hospital" }, { label: "Key Skills", val: "Clinical documentation, Rx review, ECG" }]
    },
    {
      title: "Academic Research", org: "KBIPER, Gandhinagar", period: "2025 – 2026",
      bullets: ["Designed and conducted a KAP study on oral hygiene products", "Managed data collection, documentation, and statistical analysis", "Presented findings as a poster at NIPICON 2026"],
      meta: [{ label: "Study Type", val: "Cross-sectional KAP survey" }, { label: "Output", val: "Poster presentation · NIPICON 2026" }]
    }
  ];

  return (
    <main className="bg-[#03040A] text-[#E8EEF7] min-h-screen font-sans selection:bg-[#00D4FF] selection:text-black">
      
      {/* GLOBAL NOISE & SCROLLBAR */}
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #03040A; }
        ::-webkit-scrollbar-thumb { background: #8C7040; }
        html, body { overflow-x: hidden; }
        .noise-overlay { position: fixed; inset: 0; z-index: 9997; pointer-events: none; opacity: 0.02; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E"); }
      `}} />
      <div className="noise-overlay" />

      {/* CUSTOM CURSOR */}
      <motion.div className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#00D4FF] rounded-full pointer-events-none z-[9999] mix-blend-screen hidden md:block" animate={{ x: mousePosition.x - 3, y: mousePosition.y - 3 }} transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }} />
      <motion.div className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] mix-blend-screen hidden md:flex items-center justify-center" animate={{ x: mousePosition.x - (isHovering ? 28 : 18), y: mousePosition.y - (isHovering ? 28 : 18), width: isHovering ? 56 : 36, height: isHovering ? 56 : 36, borderColor: isHovering ? 'rgba(200,169,110,0.6)' : 'rgba(0,212,255,0.4)', backgroundColor: isHovering ? 'rgba(200,169,110,0.04)' : 'transparent' }} transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }} />

      {/* NAVIGATION */}
      <nav className="fixed top-7 right-9 z-[200] flex items-center gap-1 p-1.5 border border-white/10 rounded-full bg-[#060810]/75 backdrop-blur-md">
        {['Skills', 'Experience', 'Projects'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="font-mono text-[10px] tracking-widest uppercase text-white/50 px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">{item}</a>
        ))}
      </nav>

      {/* 1. CLEAN STATIC HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center px-6 md:px-[8vw]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.05)_0%,_transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C8A96E]" />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C8A96E]">Pharm.D · CDM · Healthcare AI</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-serif text-6xl md:text-[112px] font-light leading-[0.92] tracking-tight text-[#E8EEF7] mb-4">
              Karma<br/>
              <span className="italic bg-clip-text text-transparent bg-gradient-to-br from-[#00D4FF] to-[#7AEAFF]">Naik</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-mono text-xs md:text-sm tracking-[0.12em] uppercase text-[#00D4FF] mb-8">
              Clinical Data Management & Healthcare Intelligence
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-[15px] leading-[1.8] text-white/50 max-w-[480px] mb-11">
              Bridging pharmaceutical expertise with data architecture — transforming patient-level clinical observations into rigorous, trial-ready insights.
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

      {/* 2. SKILLS BENTO GRID */}
      <section id="skills" className="px-6 md:px-[8vw] py-[120px] bg-[#060810] relative z-10 w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-x-6 items-end mb-[72px]">
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#C8A96E] pb-1 col-start-1 row-start-1">01</span>
          <h2 className="font-serif text-4xl md:text-[66px] font-light tracking-tight text-[#E8EEF7] leading-none col-start-1 row-start-1">Competencies</h2>
          <div className="h-px bg-gradient-to-r from-[#C8A96E]/40 to-transparent mt-2 col-start-2 row-start-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="md:col-span-4 bg-[#161927] border border-white/5 p-7 rounded hover:border-white/10 hover:-translate-y-1 transition-all">
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#C8A96E] mb-3.5 flex items-center gap-2"><div className="w-4 h-px bg-[#C8A96E]"/> Clinical</div>
            <h3 className="font-serif text-[26px] text-[#E8EEF7] leading-[1.1] mb-2.5">Patient Care</h3>
            <p className="text-[13px] text-white/50 leading-[1.7] mb-4">Ward rounds, prescription reviews, medication audits & pharmaceutical care planning.</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[10px] px-2.5 py-1 border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] rounded-sm">GCP Certified</span>
              <span className="font-mono text-[10px] px-2.5 py-1 border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] rounded-sm">ECG</span>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="md:col-span-4 bg-[#161927] border border-white/5 p-7 rounded hover:border-white/10 hover:-translate-y-1 transition-all">
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#C8A96E] mb-3.5 flex items-center gap-2"><div className="w-4 h-px bg-[#C8A96E]"/> Research & CDM</div>
            <h3 className="font-serif text-[26px] text-[#E8EEF7] leading-[1.1] mb-2.5">Data Architecture</h3>
            <p className="text-[13px] text-white/50 leading-[1.7] mb-4">Protocol development, CRF design, statistical analysis & clinical data standards.</p>
            <div className="flex flex-wrap gap-1.5">
              {['CDISC', 'CDASH', 'SDTM'].map(tag => (
                <span key={tag} className="font-mono text-[10px] px-2.5 py-1 border border-[#C8A96E]/25 bg-[#C8A96E]/5 text-[#C8A96E] rounded-sm">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="md:col-span-4 bg-[#0B0D18] border border-white/5 p-7 rounded hover:border-white/10 hover:-translate-y-1 transition-all">
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#00E5A0] mb-3.5">── Technical</div>
            <div className="font-mono text-[11.5px] leading-loose mt-2">
              <div><span className="text-[#00D4FF]">import</span> <span className="text-[#E8C99A]">pandas</span> <span className="text-white/25">as pd</span></div>
              <div><span className="text-[#00D4FF]">import</span> <span className="text-[#E8C99A]">numpy</span> <span className="text-white/25">as np</span></div>
              <div><span className="text-[#00D4FF]">SELECT</span> * <span className="text-white/25">FROM</span> <span className="text-[#00E5A0]">trials</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. EXPERIENCE TABS */}
      <section id="experience" className="px-6 md:px-[8vw] py-[120px] bg-[#0B0D18] w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-x-6 items-end mb-[72px]">
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#C8A96E] pb-1 col-start-1 row-start-1">02</span>
          <h2 className="font-serif text-4xl md:text-[66px] font-light tracking-tight text-[#E8EEF7] leading-none col-start-1 row-start-1">Experience</h2>
          <div className="h-px bg-gradient-to-r from-[#C8A96E]/40 to-transparent mt-2 col-start-2 row-start-2" />
        </motion.div>

        <div className="flex flex-wrap gap-4 md:gap-0 border-b border-white/5 mb-12">
          {["Phase I · Clinical", "Phase II · Research"].map((phase, idx) => (
            <button key={idx} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={() => setActivePhase(idx)} className={`relative flex flex-col gap-1 pb-5 pr-8 text-left transition-colors ${activePhase === idx ? 'text-[#E8EEF7]' : 'text-white/30 hover:text-white/70'}`}>
              <span className={`font-mono text-[9px] tracking-[0.12em] uppercase ${activePhase === idx ? 'text-[#C8A96E]' : 'text-white/20'}`}>{phase}</span>
              <span className="font-serif text-lg">{experiences[idx].org.split(',')[0]}</span>
              {activePhase === idx && <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-8 h-px bg-[#C8A96E]" />}
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
                  <div key={i} className="bg-[#161927] border border-white/5 rounded p-5">
                    <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#C8A96E] mb-2">{m.label}</div>
                    <div className="text-[13px] text-white/50 leading-[1.6]">{m.val}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. PROJECTS GRID */}
      <section id="projects" className="px-6 md:px-[8vw] py-[120px] bg-[#03040A] w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-x-6 items-end mb-[72px]">
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#C8A96E] pb-1 col-start-1 row-start-1">03</span>
          <h2 className="font-serif text-4xl md:text-[66px] font-light tracking-tight text-[#E8EEF7] leading-none col-start-1 row-start-1">Projects</h2>
          <div className="h-px bg-gradient-to-r from-[#C8A96E]/40 to-transparent mt-2 col-start-2 row-start-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { num: "01", badge: "CDM · Risk Analytics", title: "RBQM Dashboard", color: "#00D4FF", tags: ["Risk Indicators", "KRI Tracking"] },
            { num: "02", badge: "Simulation · EdTech", title: "Clinical Simulator", color: "#00E5A0", tags: ["Rx Review", "Patient Scenarios"] },
            { num: "03", badge: "AI · Healthcare", title: "PharmAI", color: "#C8A96E", tags: ["Machine Learning", "Decision Support"] }
          ].map((proj, idx) => (
            <motion.a key={idx} href="#" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group block relative bg-[#161927] border border-white/5 rounded p-8 hover:border-white/10 hover:-translate-y-2 transition-all duration-500">
              <div className="font-serif text-[80px] font-light leading-none mb-5 text-white/5 transition-opacity group-hover:text-white/10">{proj.num}</div>
              
              {/* Using safe inline styles to prevent Tailwind compilation bugs */}
              <div 
                className="font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm border inline-block mb-5"
                style={{ color: proj.color, borderColor: `${proj.color}40`, backgroundColor: `${proj.color}0D` }}
              >
                {proj.badge}
              </div>
              
              <h3 className="font-serif text-[28px] text-[#E8EEF7] leading-[1.1] mb-3.5">{proj.title}</h3>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {proj.tags.map(tag => <span key={tag} className="font-mono text-[9px] tracking-[0.05em] text-white/20 border border-white/5 px-2 py-1 rounded-sm">{tag}</span>)}
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/50 group-hover:text-[#00D4FF] transition-colors">View Live</span>
                <span className="text-white/20 group-hover:text-[#00D4FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">↗</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="px-6 md:px-[8vw] py-[120px] bg-[#03040A] flex flex-col items-center text-center border-t border-white/5">
        <h2 className="font-serif text-5xl md:text-[88px] font-light text-[#E8EEF7] leading-[1.05] tracking-tight mb-5">Let's build something<br/><em className="italic text-[#00D4FF]">meaningful.</em></h2>
        <a href="mailto:karmnaik@gmail.com" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/50 border border-white/10 px-6 py-3.5 rounded-sm hover:text-white hover:bg-white/5 transition-all mt-8">Get in Touch</a>
      </footer>
    </main>
  );
}
