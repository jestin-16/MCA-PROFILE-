import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp, 
  ArrowUpRight, 
  Globe, 
  Compass, 
  Heart, 
  Cpu, 
  Clock,
  Terminal,
  Layers,
  Sparkles,
  Database,
  Shield,
  Code2
} from 'lucide-react';
import { STUDENTS, PROJECTS, MEMORIES } from '../constants';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [hasCopied, setHasCopied] = useState(false);

  // Group and count of technical skills dynamically from cohort data
  const skillFrequency: { [key: string]: number } = {};
  STUDENTS.forEach(student => {
    student.techStack.forEach(skill => {
      skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
    });
  });

  // Extract top 5 cohort skills for analytical layout
  const aggregatedSkills = Object.entries(skillFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (STUDENTS.length === 0) return;
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % STUDENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home', code: '01' },
    { name: 'Directory', href: '#directory', code: '02' },
    { name: 'Memories', href: '#memories', code: '03' },
    { name: 'Projects', href: '#projects', code: '04' },
    { name: 'Wall', href: '#wall', code: '05' }
  ];

  const featuredStudent = STUDENTS[spotlightIndex] || STUDENTS[0];

  const handleCopyCoord = () => {
    navigator.clipboard.writeText('9.4981° N, 76.3311° E');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <footer className="relative z-10 pt-24 pb-12 overflow-hidden border-t border-amber-500/10 bg-[#040303]">
      {/* High-Contrast Technical Grid Pattern & Laser Sight Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.01)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_0%,#000_75%,transparent_100%)] pointer-events-none" />
      
      {/* Laser Guides in Corners */}
      <div className="absolute top-0 left-6 w-12 h-[1px] bg-amber-500/30" />
      <div className="absolute top-0 right-6 w-12 h-[1px] bg-amber-500/30" />
      <div className="absolute top-6 left-0 w-[1px] h-12 bg-amber-500/20" />
      <div className="absolute top-6 right-0 w-[1px] h-12 bg-amber-500/20" />

      {/* Cinematic Linear Glow Dividers */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/5 to-transparent blur-[110px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Typographic Display Block with Advanced Cybernetics */}
        <div className="relative mb-24 flex flex-col items-center justify-center select-none pt-4">
          <div className="absolute text-[9px] font-mono tracking-[0.43em] text-amber-500/40 uppercase mb-32 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-500/30 rotate-45" />
            <span>TRANSMISSION_LAYER</span>
            <span className="w-1.5 h-1.5 bg-amber-500/30 rotate-45" />
          </div>

          <motion.h2 
            initial={{ opacity: 0, letterSpacing: '0.1em', y: 15 }}
            whileInView={{ opacity: 1, letterSpacing: '0.28em', y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.5rem] sm:text-[4.5rem] md:text-[6.2rem] lg:text-[7.5rem] font-sans font-light text-center uppercase text-transparent bg-clip-text bg-gradient-to-b from-white select-none pointer-events-none tracking-[0.28em] pl-[0.28em] font-extrabold"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.06) 100%)',
              textShadow: '0 0 80px rgba(245,158,11,0.06)'
            }}
          >
            SYSTEM_CORE
          </motion.h2>
          
          <div className="absolute bottom-[-16px] flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.15 }}
               className="bg-[#0b0808] border border-amber-500/30 hover:border-amber-500/60 px-6 py-2.5 rounded-full flex items-center gap-4 shadow-[0_12px_30px_rgba(0,0,0,0.95)] transition-all duration-300 group"
             >
               <div className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
               </div>
               <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-500 font-bold group-hover:text-white transition-colors">
                 RMCA COHORT PLATFORM INDEX // '25 – '27
               </span>
               <div className="w-[1px] h-3 bg-amber-500/20" />
               <span className="font-mono text-[8.5px] text-white/50 tracking-wider">SECURE_SYNC</span>
             </motion.div>
          </div>
        </div>

        {/* Minimalist Dashboard Columns / Bento Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20 border-b border-amber-500/10">
          
          {/* Column A: Batch Terminal & Operational Status - custom rounded-[2rem] to match circular aesthetic */}
          <div className="lg:col-span-4 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.04] p-8 rounded-[2rem] flex flex-col justify-between group hover:border-amber-500/20 transition-all duration-500 relative">
            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center border-l border-b border-white/[0.03] text-white/10 group-hover:text-amber-500/20 group-hover:border-amber-500/15 transition-all duration-500 text-[10px] font-mono select-none rounded-tr-[1.9rem]">
              A1
            </div>

            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-11 h-11 border border-amber-500/10 rounded-full flex items-center justify-center text-amber-500 bg-[#0c0908] group-hover:bg-amber-500/10 group-hover:border-amber-500/50 transition-all duration-700 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                  <Cpu className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700 ease-out" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-sans tracking-widest text-[#f3f4f6] uppercase font-bold">RMCA CONTROL PANEL</span>
                  <span className="text-[8.5px] font-mono tracking-[0.25em] text-amber-500 uppercase mt-0.5 font-extrabold">NODE DIRECTORY</span>
                </div>
              </div>
              <p className="text-white/40 text-[11.5px] font-light leading-relaxed mb-6">
                An ultra-precision digital index cataloging user profile layers, technical credentials, real-time message broadcasts, and aggregated static assets for our computer science cohort.
              </p>
            </div>

            <div className="space-y-4 pt-6 mt-4 border-t border-white/[0.04]">
              {/* Telemetry Metrics Row - fully stylized rounded pills to match header widgets */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col bg-white/[0.01] border border-white/[0.03] p-3 px-5 rounded-full hover:border-amber-500/20 transition-colors">
                  <span className="text-[7.5px] font-mono uppercase tracking-widest text-white/30 flex items-center gap-1.5 font-bold justify-center">
                    <Clock className="w-3 h-3 text-amber-500/80" />
                    SYSTEM TIME
                  </span>
                  <span className="text-[12.5px] font-mono text-white mt-1 font-bold tracking-wider [text-shadow:0_0_8px_rgba(255,255,255,0.1)] text-center">
                    {time || '00:00:00'}
                  </span>
                </div>
                <div className="flex flex-col bg-white/[0.01] border border-white/[0.03] p-3 px-5 rounded-full hover:border-amber-500/20 transition-colors">
                  <span className="text-[7.5px] font-mono uppercase tracking-widest text-white/30 flex items-center gap-1.5 font-bold justify-center">
                    <Shield className="w-3 h-3 text-amber-500/80" />
                    COHORT BATCH
                  </span>
                  <span className="text-[10.5px] font-mono text-amber-500 mt-1 font-bold tracking-wider uppercase text-center">
                    REGULAR_DEV
                  </span>
                </div>
              </div>

              {/* Coordinates Indicator */}
              <div className="flex items-center justify-between pt-3 px-1">
                <span className="text-[8px] font-mono uppercase tracking-[0.16em] text-white/30 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-white/40" />
                  GEO COORDINATE
                </span>
                <button
                  onClick={handleCopyCoord}
                  className="font-mono text-[9.5px] text-amber-500 hover:text-white transition-all duration-300 flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  {hasCopied ? (
                    <span className="text-green-400 font-bold uppercase tracking-wider">COPIED LINK_STAMP!</span>
                  ) : (
                    <span className="border-b border-dashed border-amber-500/30 hover:border-white hover:text-white transition-all pb-0.5">9.4981° N, 76.3311° E</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Column B: Cohort Capabilities Analytics (Interactive) - custom rounded-[2rem] to match circular aesthetic */}
          <div className="lg:col-span-4 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.04] p-8 rounded-[2rem] relative overflow-hidden group hover:border-amber-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center border-l border-b border-white/[0.03] text-white/10 group-hover:text-amber-500/20 group-hover:border-amber-500/15 transition-all duration-500 text-[10px] font-mono select-none rounded-tr-[1.9rem]">
              B2
            </div>

            <h4 className="text-white/80 font-mono text-[9px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-500" />
              <span className="font-bold">COHORT SKILL DISTRIBUTION</span>
            </h4>

            <p className="text-white/35 text-[11px] font-light leading-relaxed mb-6">
              Primary framework and language capabilities dynamically computed directly from student ledger records.
            </p>

            <div className="space-y-4 relative z-10">
              {aggregatedSkills.map(([skill, count]) => {
                const percentage = Math.round((count / STUDENTS.length) * 100);
                return (
                  <div key={skill} className="space-y-1.5 group/skill">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white/70 group-hover/skill:text-amber-500 font-medium transition-colors">{skill}</span>
                      <span className="text-amber-500/80 font-mono text-[9.5px] font-bold">[{percentage}%]</span>
                    </div>
                    <div className="h-[3px] bg-white/[0.04] p-[0.5px] rounded-full overflow-hidden border border-white/[0.02]">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column C: Seamless Cyclic Scholar Spotlight - custom rounded-[2rem] to match circular aesthetic */}
          <div className="lg:col-span-4 bg-[#0a0808]/40 border border-white/[0.04] p-8 rounded-[2rem] flex flex-col justify-between h-full relative overflow-hidden group hover:border-amber-500/20 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center border-l border-b border-white/[0.03] text-white/10 group-hover:text-amber-500/20 group-hover:border-amber-500/15 transition-all duration-500 text-[10px] font-mono select-none rounded-tr-[1.9rem]">
              C3
            </div>

            <div>
              <h4 className="text-white/85 font-mono text-[9px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>FEATURED COHORT MEMBER</span>
              </h4>

              <div className="relative overflow-hidden h-24 mt-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredStudent.id}
                    initial={{ opacity: 0, x: 12, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -12, filter: 'blur(3px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4.5 absolute inset-0 py-1"
                  >
                    {/* Double circular dynamic rings like the header circular badges */}
                    <div className="relative shrink-0 pr-1 select-none">
                      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-500 to-transparent opacity-25 blur-sm group-hover:opacity-60 transition-all duration-500 animate-pulse" />
                      <img 
                        src={featuredStudent.image} 
                        alt={featuredStudent.name}
                        className="w-14 h-14 rounded-full object-cover border border-amber-500/25 relative z-10 filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-sans font-bold text-white tracking-wide truncate group-hover:text-amber-500 transition-colors duration-300">
                        {featuredStudent.name}
                      </span>
                      <span className="text-[8.5px] text-amber-500 font-mono mt-0.5 tracking-widest font-extrabold uppercase">
                        INDEX ID: #{featuredStudent.id.padStart(3, '0')}
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {featuredStudent.techStack.slice(0, 2).map((tech) => (
                          <span key={tech} className="bg-amber-500/5 text-[7.5px] font-mono text-amber-500/90 px-3 py-1 rounded-full border border-amber-500/15 uppercase font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Total Aggregate Batch Metrics - clean pill columns to go with header rounded widgets */}
            <div className="grid grid-cols-3 gap-3 border-t border-white/[0.04] pt-5 mt-5 relative z-10 text-center">
              <div className="flex flex-col bg-white/[0.01]/10 border border-white/[0.02] p-2.5 rounded-full hover:border-amber-500/20 hover:bg-amber-500/[0.01] transition-all">
                <span className="text-[7px] font-mono uppercase tracking-[0.15em] text-white/35 font-bold">SCHOLARS</span>
                <span className="text-sm font-mono text-white mt-1 font-bold group-hover:text-amber-500 transition-colors">{STUDENTS.length}</span>
              </div>
              <div className="flex flex-col bg-white/[0.01]/10 border border-white/[0.02] p-2.5 rounded-full hover:border-amber-500/20 hover:bg-amber-500/[0.01] transition-all">
                <span className="text-[7px] font-mono uppercase tracking-[0.15em] text-white/35 font-bold">BUILDS</span>
                <span className="text-sm font-mono text-white mt-1 font-bold group-hover:text-amber-500 transition-colors">{PROJECTS.length}</span>
              </div>
              <div className="flex flex-col bg-white/[0.01]/10 border border-white/[0.02] p-2.5 rounded-full hover:border-amber-500/20 hover:bg-amber-500/[0.01] transition-all">
                <span className="text-[7px] font-mono uppercase tracking-[0.15em] text-white/35 font-bold">MEDIAS</span>
                <span className="text-sm font-mono text-white mt-1 font-bold group-hover:text-amber-500 transition-colors">{MEMORIES.length}</span>
              </div>
            </div>
          </div>

        </div>

        {/* System Navigation Indices & Scroll Control */}
        <div className="py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 border-b border-white/[0.03]">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-[9px] font-mono tracking-widest text-amber-500 uppercase font-extrabold mr-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
              <span>TERMINAL INDEX</span>
            </span>
            <div className="h-5 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex flex-wrap gap-x-3 gap-y-3">
              {navLinks.map((link) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  className="group relative flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-white/[0.03] bg-white/[0.01] text-xs font-sans font-medium tracking-wide text-white/50 hover:text-white hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all duration-300"
                  whileHover={{ y: -1 }}
                >
                  <span className="text-[8px] font-mono text-amber-500 tracking-widest uppercase">
                    [{link.code}]
                  </span>
                  <span className="group-hover:text-amber-500 transition-colors">{link.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:opacity-100 group-hover:text-amber-500 transition-all" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Tactile Retro Mechanical Back-to-Top Control - fully rounded button to match login / floating buttons */}
          <div className="flex justify-start lg:justify-end shrink-0">
            <motion.button 
              whileHover={{ scale: 1.025, borderColor: 'rgba(245,158,11,0.4)' }}
              whileTap={{ scale: 0.975 }}
              onClick={scrollToTop}
              className="group flex items-center gap-3 bg-[#0d0909] hover:bg-amber-500/10 border border-white/10 px-6 py-3.5 rounded-full transition-all duration-300 text-[9.5px] font-mono uppercase tracking-[0.25em] text-white/70 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] focus:outline-none cursor-pointer"
            >
              <span>SYS.SCROLL_TOP()</span>
              <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-amber-500/20 flex items-center justify-center text-white/50 group-hover:text-amber-500 transition-all duration-300 border border-white/5">
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Platform Index */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[9.5px] font-mono text-white/30 uppercase tracking-[0.2em] select-none">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span className="font-bold">© {new Date().getFullYear()} RMCA BATCH 2025 – 2027. REGULAR_INDEX.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <div className="flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.04] px-3 py-1 rounded-full">
              <span>Made with dedication</span>
              <Heart className="w-3 h-3 text-amber-500 fill-amber-500/20 animate-pulse" />
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 hover:scale-105 transition-all flex items-center gap-1.5 focus:outline-none pb-0.5 border-b border-transparent hover:border-amber-500/30">
              <Globe className="w-3 h-3 opacity-50" />
              <span>Campus Index</span>
            </a>
            <a href="#" className="hover:text-amber-500 hover:scale-105 transition-all flex items-center gap-1.5 focus:outline-none pb-0.5 border-b border-transparent hover:border-amber-500/30">
              <Compass className="w-3 h-3 opacity-50" />
              <span>Atmospheric Hub</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
