'use client';

import React, { useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

// --- CUSTOM LINKEDIN SVG (Since Lucide removed brand icons) ---
const LinkedinIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const MagneticButton = ({ children, href, className }: { children: React.ReactNode, href: string, className?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  };

  return (
    <motion.a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: springX, y: springY }}
      className={`relative flex items-center justify-center gap-3 px-8 py-5 rounded-full border border-white/10 bg-surface/50 text-iceDim hover:text-ice hover:border-clinicalCyan/40 hover:bg-white/5 transition-colors duration-300 group ${className}`}
    >
      <motion.div style={{ x: useTransform(springX, (v) => v * 0.5), y: useTransform(springY, (v) => v * 0.5) }} className="flex items-center gap-3 w-full justify-center pointer-events-none">{children}</motion.div>
    </motion.a>
  );
};

export default function ContactFooter() {
  return (
    <footer className="w-full relative z-10 flex flex-col items-center justify-center pt-32 pb-12" id="contact">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-mono text-[10px] tracking-[0.2em] uppercase text-clinicalGold mb-8">Available for opportunities</motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-serif text-center text-ice mb-6 tracking-tight leading-tight max-w-3xl">Let's build something <br /><span className="italic text-clinicalCyan">meaningful.</span></motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-iceDim text-center max-w-lg mb-16">Open to Clinical Data Management, Trial Operations, and Healthcare AI roles. Bridging the gap between frontline pharmacy and backend data architecture.</motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4 mb-32">
        
        <MagneticButton href="mailto:karmnaik@gmail.com">
          <Mail size={18} className="group-hover:text-clinicalCyan transition-colors" />
          <span className="font-mono text-xs tracking-widest">karmnaik@gmail.com</span>
        </MagneticButton>
        
        <MagneticButton href="tel:+919099638123">
          <Phone size={18} className="group-hover:text-clinicalGold transition-colors" />
          <span className="font-mono text-xs tracking-widest">+91 9099638123</span>
        </MagneticButton>
        
        <MagneticButton href="https://linkedin.com/in/karma-naik-702980223">
          <LinkedinIcon size={18} className="group-hover:text-[#0A66C2] transition-colors" />
          <span className="font-mono text-xs tracking-widest uppercase">LinkedIn</span>
          <ArrowUpRight size={14} className="ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </MagneticButton>

      </motion.div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }} className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-iceDim/40 font-mono text-[9px] tracking-widest uppercase">
        <span>© 2026 Karma Naik</span><span className="mt-2 md:mt-0">Pharm.D · Ahmedabad, Gujarat</span>
      </motion.div>
    </footer>
  );
}