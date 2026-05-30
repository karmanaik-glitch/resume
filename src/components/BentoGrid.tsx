'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, LineChart } from 'lucide-react';

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
    className={`relative overflow-hidden rounded-2xl bg-surface border border-white/5 p-8 transition-colors duration-500 hover:border-clinicalCyan/30 group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-clinicalCyan/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </motion.div>
);

const Tag = ({ text, color = "cyan" }: { text: string, color?: "cyan" | "gold" | "white" }) => {
  const colorMap = { cyan: "text-clinicalCyan bg-clinicalCyan/10 border-clinicalCyan/20", gold: "text-clinicalGold bg-clinicalGold/10 border-clinicalGold/20", white: "text-iceDim bg-white/5 border-white/10" };
  return <span className={`px-3 py-1.5 rounded-md border text-[10px] font-mono tracking-widest uppercase ${colorMap[color]}`}>{text}</span>;
};

export default function BentoGrid() {
  return (
    <section className="w-full py-24 relative z-10" id="skills">
      <div className="flex items-end gap-6 mb-16">
        <span className="font-mono text-sm text-clinicalGold pb-1">01</span>
        <h2 className="text-4xl md:text-5xl font-serif text-ice tracking-tight leading-none">Competencies</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-clinicalGold/40 to-transparent mb-2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(280px,auto)]">
        <BentoCard className="md:col-span-2" delay={0.1}>
          <div className="mb-6 inline-flex p-3 rounded-lg bg-clinicalCyan/10 text-clinicalCyan"><Activity size={24} strokeWidth={1.5} /></div>
          <h3 className="text-2xl font-serif mb-3 text-ice">Patient Care & Clinical Trials</h3>
          <p className="text-sm text-iceDim leading-relaxed mb-8 flex-1">Grounded in frontline healthcare. Expertise in ward rounds, systematic prescription reviews, medication audits, and pharmaceutical care planning.</p>
          <div className="flex flex-wrap gap-2"><Tag text="GCP Certified" color="cyan" /><Tag text="ECG Interpretation" color="cyan" /><Tag text="Rx Review" color="white" /><Tag text="Counselling" color="white" /></div>
        </BentoCard>
        <BentoCard className="md:col-span-2 lg:col-span-2" delay={0.2}>
          <div className="mb-6 inline-flex p-3 rounded-lg bg-clinicalGold/10 text-clinicalGold"><Database size={24} strokeWidth={1.5} /></div>
          <h3 className="text-2xl font-serif mb-3 text-ice">Data Architecture</h3>
          <p className="text-sm text-iceDim leading-relaxed mb-8 flex-1">Bridging raw clinical inputs with regulatory standards. Proficient in protocol development, CRF design, and structuring clinical data.</p>
          <div className="flex flex-wrap gap-2"><Tag text="CDISC" color="gold" /><Tag text="CDASH" color="gold" /><Tag text="SDTM / ADaM" color="gold" /><Tag text="CRF Design" color="white" /></div>
        </BentoCard>
        <BentoCard className="md:col-span-1 lg:col-span-2 bg-[#0B0D18]" delay={0.3}>
          <div className="mb-6 inline-flex p-3 rounded-lg bg-emerald-500/10 text-emerald-400"><LineChart size={24} strokeWidth={1.5} /></div>
          <h3 className="text-2xl font-serif mb-4 text-ice">Technical Stack</h3>
          <div className="font-mono text-xs leading-loose text-iceDim bg-void/50 p-4 rounded-lg border border-white/5 mb-6 flex-1">
            <div><span className="text-emerald-400">import</span> <span className="text-clinicalGold">pandas</span> as pd</div>
            <div><span className="text-emerald-400">import</span> <span className="text-clinicalGold">numpy</span> as np</div>
            <div className="mt-2"><span className="text-clinicalCyan">SELECT</span> * <span className="text-clinicalCyan">FROM</span> trials</div>
            <div className="text-iceDim/50 mt-2"># Power BI · Tableau</div>
          </div>
          <div className="flex flex-wrap gap-2"><Tag text="Python" color="white" /><Tag text="SQL" color="white" /><Tag text="Power BI" color="white" /></div>
        </BentoCard>
        <BentoCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-center" delay={0.4}>
           <div className="grid grid-cols-2 gap-8 w-full h-full">
              <div className="flex flex-col justify-center border-r border-white/5 pr-4">
                <span className="text-5xl font-serif font-light text-ice mb-2">80.5<span className="text-clinicalCyan text-3xl">%</span></span>
                <span className="text-xs text-iceDim">Top academic score<br/>4th Year Pharm.D</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-5xl font-serif font-light text-ice mb-2">3<span className="text-clinicalGold text-3xl">×</span></span>
                <span className="text-xs text-iceDim">National poster presentations</span>
              </div>
           </div>
        </BentoCard>
      </div>
    </section>
  );
}