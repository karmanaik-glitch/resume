'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MatrixSlide from '../components/MatrixSlide';
import BentoGrid from '../components/BentoGrid';
import ProjectsGrid from '../components/ProjectsGrid';
import EducationTimeline from '../components/EducationTimeline';
import ContactFooter from '../components/ContactFooter';

export default function PremiumResume() {
  return (
    <main className="relative min-h-screen w-full bg-void font-sans text-ice overflow-x-hidden">
      
      {/* 1. THE NEW SCROLL-DRIVEN MATRIX ANIMATION */}
      {/* This sits at the very top and assembles the text as the user starts scrolling */}
      <MatrixSlide />

      {/* 2. YOUR ORIGINAL FOREGROUND CONTENT LAYER */}
      {/* (I removed pointer-events-none since the 3D canvas is gone, ensuring your buttons work perfectly) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* YOUR ORIGINAL HERO SECTION */}
        {/* I adjusted the height so it flows naturally right after the Matrix animation finishes */}
        <section className="flex flex-col justify-center w-full md:w-1/2 mt-12 mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-clinicalGold"></div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-clinicalGold">Pharm.D · CDM · Healthcare AI</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight mb-4">
              Karma <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-clinicalCyan to-blue-400">Naik</span>
            </h1>
            
            <p className="font-mono text-xs tracking-widest uppercase text-iceDim mb-8">Clinical Data Management & Healthcare Intelligence</p>
            <p className="max-w-xl text-iceDim leading-relaxed text-sm md:text-base mb-10">Bridging pharmaceutical expertise with data architecture — transforming patient-level clinical observations into rigorous, trial-ready insights.</p>

            <div className="flex gap-6">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-clinicalCyan text-void font-mono text-xs tracking-widest uppercase hover:bg-white transition-colors duration-300">
                View Projects
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 border border-white/10 text-ice font-mono text-xs tracking-widest uppercase hover:border-white/30 transition-colors duration-300">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </section>

        {/* YOUR ORIGINAL COMPONENT STACK */}
        <div className="flex flex-col gap-12">
          <BentoGrid />
          <ProjectsGrid />
          <EducationTimeline />
          <ContactFooter />
        </div>

      </div>
    </main>
  );
}
