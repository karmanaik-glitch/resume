'use client';

import React, { MouseEvent, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- SPATIAL CARD COMPONENT ---
const SpatialCard = ({ project, index }: { project: any, index: number }) => {
  // FIXED: Using HTMLAnchorElement since this is a clickable link wrapper (<motion.a>)
  const ref = useRef<HTMLAnchorElement>(null);
  
  // Track mouse position relative to the card's center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply friction and tension for that heavy, premium feel
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map the mouse position to rotation angles (max 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // FIXED: MouseEvent explicitly types to HTMLAnchorElement
  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    // Snap back to zero on leave
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col h-full bg-surface border border-white/10 rounded-xl p-8 cursor-pointer transition-colors duration-500 hover:border-clinicalCyan/40 group"
    >
      {/* Dynamic Glare Effect */}
      <motion.div
        className="absolute inset-0 z-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])}, ${project.glowColor}, transparent 60%)`
        }}
      />

      {/* Card Content (Pushed forward in 3D space) */}
      <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
        
        <div className="flex justify-between items-start mb-12">
          <span className="font-serif text-6xl text-white/5 font-light leading-none select-none">
            {project.number}
          </span>
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm border" style={{ color: project.accentHex, borderColor: project.accentHex + '40', backgroundColor: project.accentHex + '10' }}>
            {project.badge}
          </span>
        </div>

        <h3 className="font-serif text-3xl text-ice mb-4 leading-tight">{project.title}</h3>
        <p className="text-sm text-iceDim leading-relaxed mb-8 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag: string, i: number) => (
            <span key={i} className="font-mono text-[9px] tracking-widest text-iceDim/70 border border-white/5 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-white/20 transition-colors">
          <span className="font-mono text-[10px] tracking-widest uppercase text-iceDim group-hover:text-clinicalCyan transition-colors">
            View Live Project
          </span>
          <ArrowUpRight className="text-iceDim group-hover:text-clinicalCyan group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" size={18} />
        </div>
      </div>
    </motion.a>
  );
};

// --- MAIN GRID COMPONENT ---
export default function ProjectsGrid() {
  const projects = [
    {
      number: "01",
      badge: "CDM · Risk Analytics",
      title: "RBQM Dashboard",
      description: "A Risk-Based Quality Management tool for clinical trial monitoring. Surfaces site-level risk signals, tracks Key Risk Indicators, and enables data-driven oversight.",
      tags: ["Risk Indicators", "Site Monitoring", "KRI Tracking"],
      link: "https://rbqm.vercel.app/",
      accentHex: "#00D4FF", // clinicalCyan
      glowColor: "rgba(0, 212, 255, 0.08)"
    },
    {
      number: "02",
      badge: "Simulation · EdTech",
      title: "Clinical Pharmacy Simulator",
      description: "An interactive training platform for clinical pharmacy scenarios — prescription review, drug interaction detection, and pharmaceutical care decision-making.",
      tags: ["Rx Review", "Drug Interactions", "Pharma Training"],
      link: "https://clinical-pharmacy-simulator.vercel.app/",
      accentHex: "#00E5A0", // emerald
      glowColor: "rgba(0, 229, 160, 0.08)"
    },
    {
      number: "03",
      badge: "AI · Healthcare",
      title: "PharmAI",
      description: "An AI-powered pharmaceutical intelligence tool at the intersection of healthcare data and machine learning — demonstrating applied data preprocessing.",
      tags: ["Machine Learning", "Python", "Decision Support"],
      link: "https://karmanaik-glitch.github.io/test/",
      accentHex: "#C8A96E", // clinicalGold
      glowColor: "rgba(200, 169, 110, 0.08)"
    }
  ];

  return (
    <section className="w-full py-24 relative z-10" id="projects">
      <div className="flex items-end gap-6 mb-16">
        <span className="font-mono text-sm text-clinicalGold pb-1">02</span>
        <h2 className="text-4xl md:text-5xl font-serif text-ice tracking-tight leading-none">
          Innovation & Engineering
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-clinicalGold/40 to-transparent mb-2"></div>
      </div>

      {/* Perspective wrapper is crucial for the 3D effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
        {projects.map((proj, idx) => (
          <SpatialCard key={idx} project={proj} index={idx} />
        ))}
      </div>
    </section>
  );
}