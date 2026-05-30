import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp, 
  ArrowUpRight, 
  Globe, 
  Compass, 
  Heart, 
  Cpu, 
  Code, 
  Award, 
  TrendingUp, 
  UserCheck, 
  Image as ImageIcon,
  Clock
} from 'lucide-react';
import { STUDENTS, PROJECTS, MEMORIES } from '../constants';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  // Dynamically calculate actual aggregate skills from the STUDENT list
  const techStackCounts: { [key: string]: number } = {};
  STUDENTS.forEach(student => {
    student.techStack.forEach(skill => {
      techStackCounts[skill] = (techStackCounts[skill] || 0) + 1;
    });
  });

  // Sort and extract top 4 professional skills in the cohort
  const topSkills = Object.entries(techStackCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

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

  return (
    <footer className="relative z-10 pt-24 pb-12 overflow-hidden border-t border-white/5 bg-[#030202]">
      {/* Precision Ambient Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.01)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Cinematic Glowing Background Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#f59e0b]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-1/3 w-[600px] h-[300px] bg-orange-600/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Dynamic Massive Header Backdrop */}
        <div className="flex flex-col items-center justify-center mb-20 relative select-none">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.12, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.8rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-serif font-light text-white tracking-[0.2em] leading-none text-center uppercase"
          >
            MCA REGULAR
          </motion.h2>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="bg-[#0c0a09]/90 border border-white/10 px-6 py-2 rounded-full flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
             >
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-80" />
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]" />
               </span>
               <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/90">Batch of 2025 – 2027</span>
             </motion.div>
          </div>
        </div>

        {/* Premium Bento Analytics & Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
          
          {/* Card 1: Batch Identity & Local Clock */}
          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 hover:border-white/10 p-8 rounded-3xl transition-all duration-500 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 border border-white/10 rounded-2xl flex items-center justify-center text-[#f59e0b] bg-[#f59e0b]/5 group-hover:bg-[#f59e0b]/10 group-hover:border-[#f59e0b]/30 transition-all duration-500">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-sans tracking-widest text-white uppercase font-semibold">Cohort Directory</span>
                  <span className="text-[9px] font-mono tracking-widest text-[#f59e0b] uppercase mt-0.5">EST. SEP 2025</span>
                </div>
              </div>
              <p className="text-white/50 text-xs font-light leading-relaxed max-w-sm">
                A highly-curated atmospheric space for chronicling our shared achievements, showcasing peer projects, and housing the collective memories of our post-graduate milestone loops.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/35 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#f59e0b]" />
                  Local System Time
                </span>
                <span className="text-lg font-mono text-white/90 mt-1 font-semibold tracking-wider">
                  {time || '00:00:00'}
                </span>
              </div>
              
              <div className="text-right">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/35">
                  Academic Status
                </span>
                <span className="block mt-1 text-[10px] font-sans font-medium text-[#f59e0b] bg-[#f59e0b]/5 border border-[#f59e0b]/20 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                  Semester 2
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Dynamic Peer Tech Skill Spotlight */}
          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 hover:border-white/10 p-8 rounded-3xl transition-all duration-500">
            <h4 className="text-white/80 font-mono text-[9px] tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
              <span>DYNAMIC COHORT CAPABILITIES</span>
            </h4>
            
            <p className="text-white/40 text-[10px] font-light leading-relaxed mb-6">
              Live algorithmic skill distribution index aggregated across all 60 registered scholars.
            </p>

            <div className="space-y-4">
              {topSkills.map(([skill, count]) => {
                const percentage = Math.round((count / STUDENTS.length) * 100);
                return (
                  <div key={skill} className="space-y-1.5 group/skill">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white/70 group-hover/skill:text-white font-medium transition-colors">{skill}</span>
                      <span className="text-white/40 font-mono">{percentage}% ({count})</span>
                    </div>
                    <div className="h-[3px] bg-white/[0.03] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#f59e0b] to-amber-400 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 3: Dynamic Featured Scholar Spotlight (Cycles seamlessly) */}
          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 hover:border-white/10 p-8 rounded-3xl transition-all duration-500 flex flex-col justify-between h-full hover:shadow-[0_12px_40px_rgba(245,158,11,0.03)]">
            <div>
              <h4 className="text-white/80 font-mono text-[9px] tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#f59e0b]" />
                <span>Featured Scholar Spotlight</span>
              </h4>

              <div className="relative overflow-hidden h-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredStudent.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4.5 absolute inset-0"
                  >
                    <img 
                      src={featuredStudent.image} 
                      alt={featuredStudent.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-white/10 bg-white/5"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-sans font-medium text-white tracking-wide max-w-[180px] truncate">
                        {featuredStudent.name}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono mt-0.5">
                        REGISTRY INDEX: #{featuredStudent.id.padStart(3, '0')}
                      </span>
                      <div className="flex gap-1.5 mt-2">
                        {featuredStudent.techStack.map((tech) => (
                          <span key={tech} className="bg-white/5 text-[8px] font-mono text-white/60 px-2 py-0.5 rounded border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-6 mt-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/30">Scholars</span>
                <span className="text-lg font-mono text-white mt-1 font-semibold">{STUDENTS.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/30">Projects</span>
                <span className="text-lg font-mono text-white mt-1 font-semibold">{PROJECTS.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/30">Memories</span>
                <span className="text-lg font-mono text-white mt-1 font-semibold">{MEMORIES.length}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Navigation Row & Back-to-Top Actions */}
        <div className="border-t border-white/10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-[9px] font-mono tracking-widest text-[#f59e0b] uppercase font-semibold mr-4">
              ★ NAVIGATION INDEX
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
              className="group flex items-center gap-3 bg-white/[0.02] hover:bg-[#f59e0b]/10 hover:border-[#f59e0b]/50 border border-white/5 px-6 py-3 rounded-full transition-all duration-500 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.15)]"
            >
              <span>Back To Top</span>
              <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#f59e0b]/20 flex items-center justify-center text-white/50 group-hover:text-[#f59e0b] transition-all duration-500">
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Global Registry Stamp & Legalities */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/35 uppercase tracking-[0.2em]">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span>© {new Date().getFullYear()} MCA Batch 2025 – 2027. All rights reserved.</span>
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
