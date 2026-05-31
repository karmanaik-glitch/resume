import React from 'react';
import MatrixSlide from '@/components/MatrixSlide';

export default function Home() {
  return (
    // The main container forces a dark background and prevents horizontal scrolling issues
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-[#00D4FF] selection:text-black">
      
      {/* 1. HERO SECTION: The Framer Motion Matrix Assembly */}
      <MatrixSlide />

      {/* 2. ABOUT SECTION */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 max-w-5xl mx-auto">
        <h3 className="text-xs md:text-sm tracking-[0.3em] text-[#00D4FF] uppercase mb-8">
          The Intersection
        </h3>
        <p className="text-2xl md:text-4xl text-gray-400 font-light leading-relaxed text-center">
          I bridge the gap between <span className="text-white font-medium">clinical pharmacy</span> and <span className="text-white font-medium">data engineering</span>. 
          My focus is on architecting scalable pipelines that turn complex clinical trial data into precise, actionable intelligence.
        </p>
      </section>

      {/* 3. EXPERIENCE SECTION */}
      <section className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
        <h3 className="text-xs md:text-sm tracking-[0.3em] text-[#C8A96E] uppercase mb-12 border-b border-gray-800 pb-4">
          Professional Experience
        </h3>
        
        <div className="space-y-16">
          {/* Experience Block 1 */}
          <div className="relative border-l border-gray-800 pl-8 hover:border-[#00D4FF] transition-colors duration-500">
            {/* Tiny dot on the timeline */}
            <div className="absolute w-3 h-3 bg-[#0a0a0a] border border-[#00D4FF] rounded-full -left-[6.5px] top-2"></div>
            
            <h4 className="text-2xl text-white font-medium">Clinical Data Manager</h4>
            <p className="text-[#00D4FF] mt-2 text-sm tracking-wide">YOUR COMPANY NAME <span className="text-gray-600 mx-2">|</span> 2024 - Present</p>
            <p className="text-gray-400 mt-5 leading-relaxed max-w-2xl">
              Engineered and maintained robust data pipelines for Phase II/III clinical trials. Reconciled complex datasets to ensure pristine data integrity and regulatory compliance.
            </p>
          </div>

          {/* Experience Block 2 */}
          <div className="relative border-l border-gray-800 pl-8 hover:border-[#C8A96E] transition-colors duration-500">
            <div className="absolute w-3 h-3 bg-[#0a0a0a] border border-[#C8A96E] rounded-full -left-[6.5px] top-2"></div>
            
            <h4 className="text-2xl text-white font-medium">Data Analyst / Researcher</h4>
            <p className="text-[#C8A96E] mt-2 text-sm tracking-wide">PREVIOUS COMPANY <span className="text-gray-600 mx-2">|</span> 2021 - 2024</p>
            <p className="text-gray-400 mt-5 leading-relaxed max-w-2xl">
              Developed custom analytics dashboards and automated reporting workflows, reducing manual data processing time by 40%.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="border-t border-gray-900 py-12 mt-24">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#00D4FF] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#00D4FF] transition-colors">GitHub</a>
            <a href="mailto:your.email@example.com" className="hover:text-[#00D4FF] transition-colors">Email</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
