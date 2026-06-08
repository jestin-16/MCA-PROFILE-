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
  Command,
  Activity,
  UserCheck
} from 'lucide-react';
import { STUDENTS, PROJECTS, MEMORIES } from '../constants';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(false);

  // Dynamically calculate actual aggregate skills from the STUDENT list
  const techStackCounts: { [key: string]: number } = {};
  STUDENTS.forEach(student => {
    student.techStack.forEach(skill => {
      techStackCounts[skill] = (techStackCounts[skill] || 0) + 1;
    });
  });

  // Sort and extract top 5 professional skills in the cohort
  const topSkills = Object.entries(techStackCounts)
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

  // Softly cycle through different students in the spotlight panel
  useEffect(() => {
    if (STUDENTS.length === 0) return;
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % STUDENTS.length);
    }, 4500);
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
    setCopiedIndex(true);
    setTimeout(() => setCopiedIndex(false), 2000);
  };

  return (
    <footer className="relative z-10 pt-28 pb-12 overflow-hidden border-t border-white/5 bg-[#020202]">
      {/* Precision Micro Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* Cinematic Glowing Amber & Golden Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-[#f59e0b]/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-[#f59e0b]/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-orange-600/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Dynamic Massive Header Backdrop */}
        <div className="flex flex-col items-center justify-center mb-24 relative select-none">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.6rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9.5rem] font-serif font-light tracking-[0.25em] leading-none text-center text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-white/[0.01] uppercase"
          >
            RMCA BATCH
          </motion.h2>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="bg-[#0c0a09]/95 border border-white/10 hover:border-[#f59e0b]/40 px-6 py-2.5 rounded-2xl flex items-center gap-3.5 shadow-[0_12px_45px_rgba(0,0,0,0.9)] transition-colors duration-500"
             >
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-75" />
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]" />
               </span>
               <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f59e0b] font-medium [text-shadow:0_0_8px_rgba(245,158,11,0.3)]">
                 COHORT SECURE SYNC // '25 – '27
               </span>
             </motion.div>
          </div>
        </div>

        {/* Premium Bento Analytics & Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
          
          {/* Bento Card 1: Batch Identity & Satellite Terminal */}
          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 hover:border-[#f59e0b]/15 p-8 rounded-3xl transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_60%_100%_at_50%_120%,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 border border-white/10 rounded-2xl flex items-center justify-center text-[#f59e0b] bg-[#f59e0b]/5 group-hover:bg-[#f59e0b]/10 group-hover:border-[#f59e0b]/30 group-hover:scale-105 transition-all duration-500">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-sans tracking-widest text-white uppercase font-bold group-hover:text-[#f59e0b] transition-colors">RMCA NETWORK</span>
                  <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase mt-0.5">EST. AUGUST 2025</span>
                </div>
              </div>
              <p className="text-white/50 text-xs font-light leading-relaxed mb-6">
                A unified atmospheric portal chronicling the dynamic roster, academic progressions, and creative portfolio showcases of the postgraduate computer science batch.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono uppercase tracking-[0.18em] text-white/35 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#f59e0b]" />
                    Local Server Time
                  </span>
                  <span className="text-base font-mono text-white/95 mt-1 font-semibold tracking-wider">
                    {time || '00:00:00'}
                  </span>
                </div>
                
                <div className="text-right">
                  <span className="text-[8px] font-mono uppercase tracking-[0.18em] text-white/35">
                    Academic Cycle
                  </span>
                  <span className="block mt-1 text-[9px] font-sans font-semibold text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/25 px-3 py-1 rounded-full uppercase tracking-widest">
                    Spring Semester 02
                  </span>
                </div>
              </div>

              {/* Coordinates block */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-[8px] font-mono uppercase tracking-[0.18em] text-white/35 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-white/40" />
                  Satellite Coordinates
                </span>
                <button
                  onClick={handleCopyCoord}
                  className="font-mono text-[9px] text-[#f59e0b] hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
                  title="Click to copy coordinates"
                >
                  {copiedIndex ? (
                    <span className="text-green-400 font-semibold uppercase tracking-wider">COPIED SYSTEM IP!</span>
                  ) : (
                    <span className="border-b border-dashed border-[#f59e0b]/40 hover:border-white">9.4981° N, 76.3311° E</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Interactive Dynamic Peer Tech Skill Spotlight */}
          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 hover:border-[#f59e0b]/15 p-8 rounded-3xl transition-all duration-500 relative group overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_60%_100%_at_50%_120%,rgba(245,158,11,0.02),transparent_70%)] pointer-events-none" />
            
            <h4 className="text-white/85 font-mono text-[9px] tracking-[0.25em] uppercase mb-5 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#f59e0b] animate-pulse" />
              <span>DYNAMIC COHORT CAPABILITIES</span>
            </h4>
            
            <p className="text-white/40 text-[10px] font-light leading-relaxed mb-6">
              Primary technology skills in high demand distribution aggregated across 60 active student profiles.
            </p>

            <div className="space-y-4 relative z-10">
              {topSkills.map(([skill, count]) => {
                const percentage = Math.round((count / STUDENTS.length) * 100);
                return (
                  <div key={skill} className="space-y-1.5 group/skill">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white/70 group-hover/skill:text-[#f59e0b] font-medium transition-colors">{skill}</span>
                      <span className="text-white/40 font-mono text-[10px]">{percentage}% ({count})</span>
                    </div>
                    <div className="h-[4px] bg-white/[0.03] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#f59e0b] via-amber-400 to-[#f59e0b]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bento Card 3: Dynamic Featured Scholar Spotlight (Cycles seamlessly) */}
          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 hover:border-[#f59e0b]/15 p-8 rounded-3xl transition-all duration-500 flex flex-col justify-between h-full hover:shadow-[0_16px_50px_rgba(245,158,11,0.04)] relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_60%_100%_at_50%_120%,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />

            <div>
              <h4 className="text-white/85 font-mono text-[9px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#f59e0b]" />
                <span>Featured Scholar Spotlight</span>
              </h4>

              <div className="relative overflow-hidden h-24 mt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredStudent.id}
                    initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4.5 absolute inset-0 py-1"
                  >
                    <div className="relative group/photo shrink-0 pr-1.5">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#f59e0b] to-transparent opacity-30 blur-sm group-hover/photo:opacity-100 transition-opacity duration-500" />
                      <img 
                        src={featuredStudent.image} 
                        alt={featuredStudent.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-white/10 bg-white/5 relative z-10 filter grayscale group-hover/photo:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-sans font-semibold text-white tracking-wide truncate group-hover:text-[#f59e0b] transition-colors duration-300">
                        {featuredStudent.name}
                      </span>
                      <span className="text-[9px] text-[#f59e0b] font-mono mt-0.5 tracking-wider font-semibold">
                        UID: #{featuredStudent.id.padStart(3, '0')}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {featuredStudent.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="bg-white/5 text-[8px] font-mono text-white/70 px-2 py-0.5 rounded border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Micro Statistics Metrics Footer row */}
            <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-6 mt-6 relative z-10">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-white/35">SCHOLARS</span>
                <span className="text-xl font-mono text-white mt-1 font-semibold group-hover:text-[#f59e0b] transition-colors">{STUDENTS.length}</span>
              </div>
              <div className="flex flex-col border-x border-white/5 px-2">
                <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-white/35">BUILDS</span>
                <span className="text-xl font-mono text-white mt-1 font-semibold group-hover:text-[#f59e0b] transition-colors">{PROJECTS.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-white/35">COLLECTABLE</span>
                <span className="text-xl font-mono text-white mt-1 font-semibold group-hover:text-[#f59e0b] transition-colors">{MEMORIES.length}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Navigation Row & Back-to-Top Actions */}
        <div className="border-t border-white/10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-[9px] font-mono tracking-widest text-[#f59e0b] uppercase font-semibold mr-4 flex items-center gap-1.5">
              <Command className="w-3.5 h-3.5" /> SYSTEM DIRECTIVES
            </span>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {navLinks.map((link) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  className="group relative flex items-center gap-2 text-xs font-sans font-light tracking-wide text-white/50 hover:text-white transition-all duration-300 py-1"
                  whileHover={{ y: -1 }}
                >
                  <span className="text-[9px] font-mono text-[#f59e0b] tracking-wider uppercase opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    [{link.code}]
                  </span>
                  <span className="group-hover:text-[#f59e0b] transition-colors">{link.name}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 group-hover:text-[#f59e0b] transition-all" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Clean humanized "Back to Top" command */}
          <div className="flex justify-start lg:justify-end shrink-0">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="group flex items-center gap-3 bg-white/[0.02] hover:bg-[#f59e0b]/10 hover:border-[#f59e0b]/50 border border-white/5 px-6 py-3.5 rounded-full transition-all duration-500 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.15)] focus:outline-none"
            >
              <span>SYS.ASCEND()</span>
              <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#f59e0b]/20 flex items-center justify-center text-white/50 group-hover:text-[#f59e0b] transition-all duration-500">
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Global Registry Stamp & Legalities */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/35 uppercase tracking-[0.2em]">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span>© {new Date().getFullYear()} MCA Batch 2025 – 2027. REGULAR SYNC.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <div className="flex items-center gap-1.5">
              <span>Made with dedication</span>
              <Heart className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]/10 animate-pulse" />
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
