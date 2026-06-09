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
    <footer className="relative z-10 pt-28 pb-12 overflow-hidden border-t border-white/[0.04] bg-[#020202]">
      {/* High-Contrast Technical Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* Cinematic Linear Glow Dividers */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent opacity-80" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#f59e0b]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Typographic Display Block */}
        <div className="relative mb-20 flex flex-col items-center justify-center select-none">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.2rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8rem] font-serif font-light tracking-[0.3em] leading-none text-center uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.07] to-white/[0.01]"
          >
            SYSTEM CORE
          </motion.h2>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="bg-[#0c0a09]/95 border border-[#f59e0b]/25 hover:border-[#f59e0b]/50 px-5 py-2 rounded-xl flex items-center gap-3 shadow-[0_12px_40px_rgba(0,0,0,0.9)] transition-colors duration-300"
             >
               <div className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
               <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#f59e0b] font-medium">
                 COHORT PLATFORM INDEX // 2025 - 2027
               </span>
             </motion.div>
          </div>
        </div>

        {/* Minimalist Dashboard Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20 border-b border-white/[0.04]">
          
          {/* Column A: Batch Terminal & Operational Status */}
          <div className="lg:col-span-4 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-[#f59e0b] bg-[#f59e0b]/5 group-hover:bg-[#f59e0b]/10 group-hover:border-[#f59e0b]/40 transition-colors duration-500">
                  <Cpu className="w-5 h-5 pointer-events-none" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-sans tracking-widest text-white uppercase font-semibold">RMCA CONTROL PANEL</span>
                  <span className="text-[8px] font-mono tracking-[0.2em] text-[#f59e0b] uppercase mt-0.5 font-bold">NODE DIRECTORY</span>
                </div>
              </div>
              <p className="text-white/45 text-xs font-light leading-relaxed max-w-sm mb-6">
                An ultra-precision digital directory cataloging user profile layers, technical credentials, real-time message broadcasts, and aggregated static assets for our computer science cohort.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/[0.04]">
              {/* Telemetry Metrics Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[7.5px] font-mono uppercase tracking-widest text-white/30 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#f59e0b]" />
                    SYSTEM TIME
                  </span>
                  <span className="text-sm font-mono text-white/95 mt-1 font-semibold tracking-wider">
                    {time || '00:00:00'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7.5px] font-mono uppercase tracking-widest text-white/30 flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-[#f59e0b]" />
                    COHORT BATCH
                  </span>
                  <span className="text-xs font-serif italic text-[#f59e0b] mt-1 font-bold">
                    Regular Cohort
                  </span>
                </div>
              </div>

              {/* Coordinates Indicator */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                <span className="text-[8px] font-mono uppercase tracking-[0.16em] text-white/30 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-white/40" />
                  GEO COORDINATE
                </span>
                <button
                  onClick={handleCopyCoord}
                  className="font-mono text-[9px] text-[#f59e0b] hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
                >
                  {hasCopied ? (
                    <span className="text-green-400 font-semibold uppercase tracking-wider">COPIED IP INDEX!</span>
                  ) : (
                    <span className="border-b border-dashed border-[#f59e0b]/40 hover:border-white">9.4981° N, 76.3311° E</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Column B: Cohort Capabilities Analytics (Interactive) */}
          <div className="lg:col-span-4 bg-white/[0.01]/10 border border-white/[0.03] p-7 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_60%_100%_at_50%_120%,rgba(245,158,11,0.02),transparent_70%)] pointer-events-none" />
            
            <h4 className="text-white/80 font-mono text-[9px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#f59e0b]" />
              <span>COHORT SKILL DISTRIBUTION</span>
            </h4>

            <p className="text-white/35 text-[10px] font-light leading-relaxed mb-6">
              Primary framework and language capabilities dynamically computed directly from student ledger records.
            </p>

            <div className="space-y-3.5 relative z-10">
              {aggregatedSkills.map(([skill, count]) => {
                const percentage = Math.round((count / STUDENTS.length) * 100);
                return (
                  <div key={skill} className="space-y-1.5 group/skill">
                    <div className="flex justify-between items-center text-[10.5px]">
                      <span className="text-white/70 group-hover/skill:text-[#f59e0b] font-medium transition-colors">{skill}</span>
                      <span className="text-[#f59e0b]/80 font-mono text-[9px]">{percentage}% ({count})</span>
                    </div>
                    <div className="h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#f59e0b] to-amber-500 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column C: Seamless Cyclic Scholar Spotlight */}
          <div className="lg:col-span-4 bg-white/[0.01]/10 border border-white/[0.03] p-7 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_60%_100%_at_50%_120%,rgba(245,158,11,0.02),transparent_70%)] pointer-events-none" />

            <div>
              <h4 className="text-white/80 font-mono text-[9px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f59e0b] animate-pulse" />
                <span>FEATURED COHORT MEMBER</span>
              </h4>

              <div className="relative overflow-hidden h-24 mt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredStudent.id}
                    initial={{ opacity: 0, x: 15, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -15, filter: 'blur(3px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 absolute inset-0 py-1"
                  >
                    <div className="relative shrink-0 pr-1">
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-[#f59e0b] to-transparent opacity-20 blur-sm group-hover:opacity-60 transition-all duration-500" />
                      <img 
                        src={featuredStudent.image} 
                        alt={featuredStudent.name}
                        className="w-14 h-14 rounded-xl object-cover border border-white/10 relative z-10 filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-sans font-semibold text-white tracking-wide truncate group-hover:text-[#f59e0b] transition-colors duration-300">
                        {featuredStudent.name}
                      </span>
                      <span className="text-[8.5px] text-[#f59e0b] font-mono mt-0.5 tracking-wider font-semibold uppercase">
                        INDEX ID: #{featuredStudent.id.padStart(3, '0')}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {featuredStudent.techStack.slice(0, 2).map((tech) => (
                          <span key={tech} className="bg-white/5 text-[7.5px] font-mono text-white/60 px-1.5 py-0.5 rounded border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Total Aggregate Batch Metrics */}
            <div className="grid grid-cols-3 gap-3 border-t border-white/[0.04] pt-5 mt-5 relative z-10 text-center">
              <div className="flex flex-col">
                <span className="text-[7.5px] font-mono uppercase tracking-[0.15em] text-white/35">SCHOLARS</span>
                <span className="text-base font-mono text-white mt-1 font-semibold group-hover:text-[#f59e0b] transition-colors">{STUDENTS.length}</span>
              </div>
              <div className="flex flex-col border-x border-white/[0.04] px-1">
                <span className="text-[7.5px] font-mono uppercase tracking-[0.15em] text-white/35">BUILDS</span>
                <span className="text-base font-mono text-white mt-1 font-semibold group-hover:text-[#f59e0b] transition-colors">{PROJECTS.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7.5px] font-mono uppercase tracking-[0.15em] text-white/35">MEDIAS</span>
                <span className="text-base font-mono text-white mt-1 font-semibold group-hover:text-[#f59e0b] transition-colors">{MEMORIES.length}</span>
              </div>
            </div>
          </div>

        </div>

        {/* System Navigation Indices & Scroll Control */}
        <div className="py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-[9px] font-mono tracking-widest text-[#f59e0b] uppercase font-bold mr-4 flex items-center gap-1.5">
              <span>★</span> TERMINAL INDEX
            </span>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {navLinks.map((link) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  className="group relative flex items-center gap-1.5 text-xs font-sans font-light tracking-wide text-white/50 hover:text-white transition-all duration-300 py-1"
                  whileHover={{ y: -1 }}
                >
                  <span className="text-[8.5px] font-mono text-[#f59e0b] tracking-wider uppercase opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    [{link.code}]
                  </span>
                  <span className="group-hover:text-[#f59e0b] transition-colors">{link.name}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 group-hover:text-[#f59e0b] transition-all" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Minimalist Back to Top Capsule */}
          <div className="flex justify-start lg:justify-end shrink-0">
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToTop}
              className="group flex items-center gap-2.5 bg-white/[0.01]/10 hover:bg-[#f59e0b]/10 hover:border-[#f59e0b]/50 border border-white/5 px-5 py-2.5 rounded-xl transition-all duration-500 text-[9px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:outline-none"
            >
              <span>SYS.SCROLL_TOP()</span>
              <div className="w-5 h-5 rounded bg-white/5 group-hover:bg-[#f59e0b]/20 flex items-center justify-center text-white/50 group-hover:text-[#f59e0b] transition-all duration-500">
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Platform Index */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-6 text-[9.5px] font-mono text-white/30 uppercase tracking-[0.2em] select-none">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span>© {new Date().getFullYear()} RMCA BATCH 2025 – 2027. ALL REGULAR METRICS SECURE.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <div className="flex items-center gap-1.5">
              <span>Made with dedication</span>
              <Heart className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]/15 animate-pulse" />
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b] transition-colors flex items-center gap-1.5">
              <Globe className="w-3 h-3 opacity-60" />
              <span>Campus Index</span>
            </a>
            <a href="#" className="hover:text-[#f59e0b] transition-colors flex items-center gap-1.5">
              <Compass className="w-3 h-3 opacity-60" />
              <span>Atmospheric Hub</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
