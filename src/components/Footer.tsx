import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Globe, Compass, Mail, Calendar, ArrowUp, Check, Heart, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home', category: 'Registry' },
    { name: 'Directory', href: '#directory', category: 'Peers' },
    { name: 'Showcase', href: '#showcase', category: 'Builds' },
    { name: 'Memories', href: '#memories', category: 'Archive' },
    { name: 'Board', href: '#board', category: 'Signals' }
  ];

  const activeSemesters = [
    { key: 's1', label: 'Semester 1', status: 'Completed', date: 'Fall 2025' },
    { key: 's2', label: 'Semester 2', status: 'Completed', date: 'Spring 2026' },
    { key: 's3', label: 'Semester 3', status: 'Active', date: 'Current' },
    { key: 's4', label: 'Semester 4', status: 'Upcoming', date: 'Next Up' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <footer className="relative z-10 pt-28 pb-12 overflow-hidden border-t border-white/5 bg-atmos-dark">
      {/* Dynamic Aesthetic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-atmos-accent/40 to-transparent" />
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[600px] h-[300px] bg-atmos-accent/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-1/3 translate-x-1/2 w-[400px] h-[200px] bg-pink-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Large Typography Branding Piece */}
        <div className="flex flex-col items-center justify-center mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 0.15, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[4rem] md:text-[11rem] font-serif font-light text-white tracking-widest leading-none select-none text-center"
          >
            CLASS OF '27
          </motion.h2>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 10 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="bg-white/[0.03] backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/5 flex items-center gap-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-atmos-accent/30 transition-colors duration-500 cursor-default"
             >
               <div className="w-1.5 h-1.5 rounded-full bg-atmos-accent animate-ping" />
               <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70">Connecting the Journey</span>
             </motion.div>
          </div>
        </div>

        {/* Modular Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 border-t border-white/10 pt-16"
        >
          {/* Column 1: Identity & Real-time Info (Colspan: 5) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 border border-white/15 rounded-xl flex items-center justify-center text-white relative group overflow-hidden bg-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-atmos-accent/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="font-serif italic text-lg relative z-10 font-bold group-hover:scale-110 transition-transform">M</span>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-sm font-sans tracking-[0.15em] text-white uppercase font-semibold leading-tight">MCA REGULAR</span>
                  <span className="text-[9px] font-mono tracking-widest text-atmos-accent/80 uppercase mt-0.5">Cohort of 2025-2027</span>
                </div>
              </div>
              <p className="text-white/40 text-xs font-light max-w-sm leading-relaxed mb-6">
                An unified digital ecosystem for peers of class regular 2025-27. Charting milestones, publishing innovative student showcases, and preserving collective memory loops.
              </p>
            </div>

            {/* Time / Server Activity indicators */}
            <div className="flex flex-wrap gap-6 border-t border-white/[0.04] pt-6 mt-4">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/30">Local Node Clock</span>
                <span className="text-sm font-mono text-white/80 mt-1 min-w-[70px]">{time || '--:--:--'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/30">Node State</span>
                <span className="text-xs font-mono text-atmos-accent flex items-center gap-1.5 mt-1.5 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  ONLINE / PERSISTENT
                </span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Interactive Semester Progress Tracker (Colspan: 4) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-white/80 font-mono text-[9px] tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-atmos-accent" />
                <span>Academic Journey</span>
              </h4>
              
              <div className="relative pl-5 border-l border-white/5 space-y-5">
                {activeSemesters.map((sem) => (
                  <div key={sem.key} className="relative group/sem">
                    {/* Ring indicator */}
                    <div className="absolute -left-[27px] top-1 flex items-center justify-center">
                      {sem.status === 'Completed' ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-atmos-accent group-hover/sem:bg-atmos-accent/20 group-hover/sem:border-atmos-accent/50 transition-colors duration-300">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      ) : sem.status === 'Active' ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-atmos-dark border border-atmos-accent flex items-center justify-center p-[2px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-atmos-accent animate-ping absolute" />
                          <span className="w-1.5 h-1.5 rounded-full bg-atmos-accent" />
                        </div>
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full bg-atmos-dark border border-white/10" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans tracking-wide text-white/70 group-hover/sem:text-white transition-colors">
                          {sem.label}
                        </span>
                        {sem.status === 'Active' && (
                          <span className="bg-atmos-accent/10 border border-atmos-accent/30 text-[8px] font-mono tracking-wider font-light uppercase px-1.5 py-0.5 rounded text-atmos-accent">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-white/30 tracking-wider uppercase mt-0.5">
                        {sem.date} • {sem.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 3: Navigation Quicklinks & Scroll Up (Colspan: 3) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="w-full md:text-right">
              <h4 className="text-white/80 font-mono text-[9px] tracking-[0.25em] uppercase mb-6 md:justify-end flex items-center gap-2">
                <span>Quick Registry</span>
              </h4>
              
              <ul className="space-y-3.5">
                {navLinks.map((link) => (
                  <li key={link.name} className="flex md:justify-end">
                    <motion.a 
                      href={link.href}
                      className="text-white/40 hover:text-white transition-all text-xs font-light flex items-center gap-2 group w-fit"
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                      whileHover={{ x: -4 }}
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    >
                      <span className="text-[10px] font-mono text-white/20 tracking-widest lowercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {link.category}
                      </span>
                      <span className="tracking-wider text-xs font-sans group-hover:text-atmos-accent transition-colors">
                        {link.name}
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-atmos-accent" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back to Top Magnetic Node */}
            <div className="pt-8 w-full md:text-right flex md:justify-end mt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="group flex items-center gap-3 bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-atmos-accent/30 px-4 py-2 rounded-full transition-all duration-300 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 hover:text-white"
              >
                <span>Ascend Node</span>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-atmos-accent/20 flex items-center justify-center text-white/60 group-hover:text-atmos-accent transition-all duration-300">
                  <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar Details & Social Coordinates */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]"
        >
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span>© {new Date().getFullYear()} MCA REGISTERED SYSTEM.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <div className="flex items-center gap-1">
              <span>Made with dedication for our class</span>
              <Heart className="w-3 h-3 text-atmos-accent fill-atmos-accent/10 animate-pulse" />
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-atmos-accent transition-colors flex items-center gap-1.5">
              <Globe className="w-3 w-3 opacity-60" />
              <span>Campus Index</span>
            </a>
            <a href="#" className="hover:text-atmos-accent transition-colors flex items-center gap-1.5">
              <Compass className="w-3 w-3 opacity-60" />
              <span>Directory Map</span>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

