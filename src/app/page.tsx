import React from 'react';

export default function Home() {
  return (
    // Pure dark background with custom selection colors
    <main className="bg-[#0a0a0a] text-white min-h-screen selection:bg-[#00D4FF] selection:text-black">
      
      {/* 1. MINIMALIST HERO SECTION */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-20 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          Your Name Here
        </h1>
        <h2 className="text-2xl md:text-4xl text-gray-400 font-light max-w-3xl leading-snug">
          Bridging the gap between <span className="text-[#00D4FF]">clinical pharmacy</span> and robust <span className="text-[#C8A96E]">data engineering</span>.
        </h2>
        
        <div className="mt-12 flex gap-4">
          <a href="#experience" className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors">
            View Experience
          </a>
          <a href="mailto:your.email@example.com" className="px-8 py-3 border border-gray-700 text-white font-medium rounded-full hover:border-gray-500 transition-colors">
            Get in Touch
          </a>
        </div>
      </section>

      {/* 2. EXPERIENCE SECTION */}
      <section id="experience" className="px-6 md:px-20 py-24 max-w-6xl mx-auto border-t border-gray-900">
        <h3 className="text-sm tracking-[0.3em] text-gray-500 uppercase mb-16">
          Professional Experience
        </h3>
        
        <div className="space-y-20">
          {/* Role 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 hover:group">
            <div className="md:col-span-1 text-gray-500 text-sm mt-1">
              2024 — Present
            </div>
            <div className="md:col-span-3">
              <h4 className="text-2xl text-white font-medium mb-1">Clinical Data Manager</h4>
              <p className="text-[#00D4FF] text-sm tracking-wide mb-4">CURRENT COMPANY INC.</p>
              <p className="text-gray-400 leading-relaxed max-w-2xl">
                Engineered and maintained robust data pipelines for Phase II/III clinical trials. Reconciled complex datasets to ensure pristine data integrity and strict regulatory compliance across multiple international sites.
              </p>
            </div>
          </div>

          {/* Role 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12">
            <div className="md:col-span-1 text-gray-500 text-sm mt-1">
              2021 — 2024
            </div>
            <div className="md:col-span-3">
              <h4 className="text-2xl text-white font-medium mb-1">Data Analyst</h4>
              <p className="text-[#C8A96E] text-sm tracking-wide mb-4">PREVIOUS COMPANY LLC</p>
              <p className="text-gray-400 leading-relaxed max-w-2xl">
                Developed custom analytics dashboards and automated reporting workflows, reducing manual data processing time by 40% while improving overall accuracy in cross-functional reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOOTER */}
      <footer className="px-6 md:px-20 py-12 border-t border-gray-900 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Resume</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
