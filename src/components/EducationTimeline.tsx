'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, Clock } from 'lucide-react';

const ScoreBar = ({ label, percentage, delay }: { label: string, percentage: number, delay: number }) => (
  <div className="flex items-center gap-4 mb-4 group">
    <span className="font-mono text-[10px] tracking-widest uppercase text-iceDim w-12 shrink-0 group-hover:text-clinicalCyan transition-colors">{label}</span>
    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden relative">
      <motion.div initial={{ width: 0 }} whileInView={{ width: `${percentage}%` }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }} className="absolute top-0 left-0 h-full bg-gradient-to-r from-clinicalGold/50 to-clinicalGold rounded-full" />
    </div>
    <span className="font-mono text-xs text-clinicalGold w-14 text-right shrink-0">{percentage}%</span>
  </div>
);

const CertCard = ({ title, sub, status, delay }: { title: string, sub: string, status: 'done' | 'wip', delay: number }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }} className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-white/5 hover:border-white/10 transition-colors group">
    <div className={`p-2 rounded-lg ${status === 'done' ? 'bg-clinicalCyan/10 text-clinicalCyan' : 'bg-clinicalGold/10 text-clinicalGold'}`}>{status === 'done' ? <CheckCircle2 size={18} /> : <Clock size={18} />}</div>
    <div className="flex-1">
      <h4 className="text-sm font-medium text-ice group-hover:text-white transition-colors">{title}</h4>
      <p className="font-mono text-[9px] tracking-widest text-iceDim uppercase mt-1">{sub}</p>
    </div>
    <span className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded border ${status === 'done' ? 'text-clinicalCyan border-clinicalCyan/20 bg-clinicalCyan/5' : 'text-clinicalGold border-clinicalGold/20 bg-clinicalGold/5'}`}>{status === 'done' ? 'Certified' : 'Ongoing'}</span>
  </motion.div>
);

export default function EducationTimeline() {
  return (
    <section className="w-full py-24 relative z-10" id="education">
      <div className="flex items-end gap-6 mb-16"><span className="font-mono text-sm text-clinicalGold pb-1">03</span><h2 className="text-4xl md:text-5xl font-serif text-ice tracking-tight leading-none">Education & Training</h2><div className="flex-1 h-px bg-gradient-to-r from-clinicalGold/40 to-transparent mb-2"></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-7 bg-surface border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col justify-between hover:border-clinicalCyan/20 transition-colors duration-500">
          <div>
            <div className="flex items-center gap-3 mb-6"><div className="p-3 rounded-lg bg-clinicalCyan/10 text-clinicalCyan inline-flex"><GraduationCap size={24} /></div><div><h3 className="font-serif text-3xl text-ice leading-tight">Doctor of Pharmacy</h3><span className="font-mono text-[10px] tracking-widest text-clinicalCyan uppercase">Pharm.D</span></div></div>
            <p className="text-sm text-iceDim mb-2">K.B. Institute of Pharmaceutical Education and Research</p>
            <p className="font-mono text-[10px] tracking-widest uppercase text-iceDim/60 mb-10">2022 – 2027 · Gandhinagar, Gujarat</p>
            <div className="mb-8">
              <h4 className="font-mono text-[10px] tracking-widest uppercase text-iceDim mb-6 flex items-center gap-2"><span className="w-4 h-px bg-white/20"></span> Academic Trajectory</h4>
              <div className="space-y-2"><ScoreBar label="Year 1" percentage={75.00} delay={0.2} /><ScoreBar label="Year 2" percentage={75.44} delay={0.3} /><ScoreBar label="Year 3" percentage={80.18} delay={0.4} /><ScoreBar label="Year 4" percentage={80.50} delay={0.5} /></div>
            </div>
          </div>
        </motion.div>
        <div className="lg:col-span-5 flex flex-col justify-start">
           <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8 px-2"><Award size={20} className="text-clinicalGold" /><h3 className="font-serif text-2xl text-ice">Specialized Certifications</h3></motion.div>
           <div className="flex flex-col gap-3">
             <CertCard title="Good Clinical Practice (GCP)" sub="ICMR & NDCT Rules · 2025" status="done" delay={0.2} />
             <CertCard title="Data Analyst Bootcamp" sub="Python · SQL · Tableau · Power BI" status="wip" delay={0.3} />
             <CertCard title="Research Methodology" sub="Clinical Protocol Design · 2025" status="done" delay={0.4} />
             <CertCard title="Advanced ECG Interpretation" sub="Cardiological Monitoring · 2023" status="done" delay={0.5} />
           </div>
        </div>
      </div>
    </section>
  );
}