import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Globe, 
  Compass, 
  Calendar, 
  ArrowUp, 
  Check, 
  Heart, 
  Cpu, 
  Database, 
  Clock,
  Terminal,
  Grid,
  FileText,
  Workflow
} from 'lucide-react';
import { STUDENTS, PROJECTS, MEMORIES } from '../constants';

export const Footer: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [time, setTime] = useState<string>('');
  const [copiedCoords, setCopiedCoords] = useState(false);

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
    { name: 'Home', href: '#home', category: 'REGISTRY' },
    { name: 'Directory', href: '#directory', category: 'PEERS' },
    { name: 'Showcase', href: '#showcase', category: 'BUILDS' },
    { name: 'Memories', href: '#memories', category: 'COLLECTION' },
    { name: 'Board', href: '#board', category: 'BROADCAST' }
  ];

  const activeSemesters = [
    { key: 's1', label: 'Semester 1', status: 'Completed', date: 'Fall 2025', detail: 'Architectural foundation established' },
    { key: 's2', label: 'Semester 2', status: 'Completed', date: 'Spring 2026', detail: 'Advanced integrations & showcases' },
    { key: 's3', label: 'Semester 3', status: 'Active', date: 'Current Progress', detail: 'Full-stack enterprise synthesizers' },
    { key: 's4', label: 'Semester 4', status: 'Upcoming', date: 'Spring 2027', detail: 'Culminating thesis & deploy loops' },
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

  const handleCopyCoords = () => {
    navigator.clipboard.writeText('9.4981° N, 76.3311° E');
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <footer className="relative z-10 pt-24 pb-12 overflow-hidden border-t border-white/5 bg-atmos-dark">
      {/* Precision Digital Aesthetics Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* Futuristic Ambient Heat Radiators */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-atmos-accent/40 to-transparent" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[250px] bg-atmos-accent/5 blur-[90px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-[500px] h-[250px] bg-amber-500/5 blur-[90px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Dynamic Massive Header Backdrop */}
        <div className="flex flex-col items-center justify-center mb-16 relative">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 0.08, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3.5rem] md:text-[10rem] font-serif font-light text-white tracking-widest leading-none select-none text-center uppercase"
          >
            MCA REGULAR
          </motion.h2>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 15 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="bg-[#0c0a09]/80 backdrop-blur-2xl px-6 py-2 rounded-full border border-white/5 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-atmos-accent/30 transition-all duration-500 cursor-default"
             >
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-atmos-accent opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-atmos-accent"></span>
               </span>
               <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/80">Batch of 2025 - 2027</span>
             </motion.div>
          </div>
        </div>

        {/* Bento Grid layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Bento Card 1: Node Telemetry & Identity */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-12 lg:col-span-5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 p-8 rounded-3xl transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.2)] flex flex-col justify-between group h-full"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  className="w-12 h-12 border border-white/10 rounded-2xl flex items-center justify-center text-atmos-accent bg-atmos-accent/5 group-hover:border-atmos-accent/40 group-hover:bg-atmos-accent/10 transition-all duration-500"
                >
                  <Cpu className="w-5 h-5 transition-transform" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-sm font-sans tracking-widest text-white uppercase font-bold leading-tight group-hover:text-atmos-accent transition-colors">MCA SYSTEM</span>
                  <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase mt-0.5">EST. SEP 2025</span>
                </div>
              </div>
              <p className="text-white/50 text-xs font-light leading-relaxed max-w-sm mb-6">
                A unified atmospheric landing platform chronicling our common achievements, showcasing dynamic user directories, and tracking our milestone loops together.
              </p>
            </div>

            {/* Interactive System Stats Footer Block */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 mt-4">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/30 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-atmos-accent" />
                  Local Node clock
                </span>
                <span className="text-sm font-mono text-white/90 mt-1.5 font-semibold tracking-wider">{time || '--:--:--'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/30 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-atmos-accent" />
                  Satellite Coordinates
                </span>
                <button 
                  onClick={handleCopyCoords}
                  className="text-left group/btn text-[10px] font-mono text-atmos-accent hover:text-white transition-colors mt-1.5 flex items-center gap-1"
                >
                  {copiedCoords ? (
                    <span className="text-green-400 font-medium">COPIED TO CLIPBOARD!</span>
                  ) : (
                    <>
                      <span>9.4981° N, 76.3311° E</span>
                      <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity text-[8px] font-sans">[copy]</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Interactive Semester Progress Tracks */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-6 lg:col-span-4 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 p-8 rounded-3xl transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
          >
            <h4 className="text-white/80 font-mono text-[9px] tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-atmos-accent" />
              <span>Academic Roadmap Ledger</span>
            </h4>

            <div className="relative pl-5 border-l border-white/5 space-y-4">
              {activeSemesters.map((sem, idx) => (
                <div key={sem.key} className="relative group/sem flex flex-col xl:flex-row xl:items-center xl:justify-between gap-1 xl:gap-4">
                  {/* Visual Node Indicators */}
                  <div className="absolute -left-[26.5px] top-1 flex items-center justify-center">
                    {sem.status === 'Completed' ? (
                      <div className="w-3 h-3 rounded-full bg-atmos-bg border border-atmos-accent/40 flex items-center justify-center text-atmos-accent group-hover/sem:bg-atmos-accent group-hover/sem:text-white transition-colors duration-300 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                        <Check className="w-2 h-2" />
                      </div>
                    ) : sem.status === 'Active' ? (
                      <div className="w-3 h-3 rounded-full bg-atmos-bg border border-atmos-accent flex items-center justify-center p-[2px] shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-atmos-accent animate-ping absolute" />
                        <span className="w-1.5 h-1.5 rounded-full bg-atmos-accent" />
                      </div>
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-atmos-bg border border-white/20" />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-sans tracking-wide text-white/80 group-hover/sem:text-atmos-accent transition-colors font-medium">
                        {sem.label}
                      </span>
                      {sem.status === 'Active' && (
                        <span className="bg-atmos-accent/10 border border-atmos-accent/35 text-[7px] font-mono tracking-widest font-light uppercase px-1.5 py-0.5 rounded text-atmos-accent animate-pulse">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] font-mono text-white/30 tracking-wider uppercase mt-0.5">
                      {sem.date} • {sem.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bento Card 3: Deep Cohort Metrics Grid */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-6 lg:col-span-3 grid grid-rows-3 gap-4"
          >
            {/* Metric Cell 1: Studs */}
            <div className="bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 px-6 py-4 rounded-2xl transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Peer registry size</span>
                <span className="text-2xl font-mono text-white group-hover:text-atmos-accent transition-colors font-semibold mt-1">
                  {STUDENTS.length}
                </span>
                <span className="text-[8px] text-white/40 mt-1 uppercase font-light">Registered scholars</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] group-hover:bg-atmos-accent/5 text-white/30 group-hover:text-atmos-accent transition-all duration-500">
                <Grid className="w-4 h-4" />
              </div>
            </div>

            {/* Metric Cell 2: Projects */}
            <div className="bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 px-6 py-4 rounded-2xl transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">System Deployments</span>
                <span className="text-2xl font-mono text-white group-hover:text-atmos-accent transition-colors font-semibold mt-1">
                  {PROJECTS.length}
                </span>
                <span className="text-[8px] text-white/40 mt-1 uppercase font-light">Custom digital builds</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] group-hover:bg-atmos-accent/5 text-white/30 group-hover:text-atmos-accent transition-all duration-500">
                <Workflow className="w-4 h-4" />
              </div>
            </div>

            {/* Metric Cell 3: Memories */}
            <div className="bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 px-6 py-4 rounded-2xl transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Archived Memories</span>
                <span className="text-2xl font-mono text-white group-hover:text-atmos-accent transition-colors font-semibold mt-1">
                  {MEMORIES.length}
                </span>
                <span className="text-[8px] text-white/40 mt-1 uppercase font-light">Preserved chapters</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] group-hover:bg-atmos-accent/5 text-white/30 group-hover:text-atmos-accent transition-all duration-500">
                <FileText className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Navigation Row & Back-to-Top Actions */}
        <div className="border-t border-white/10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-[9px] font-mono tracking-widest text-[#f59e0b] uppercase font-semibold mr-4 flex items-center gap-1.5">
              <span>★</span> TERMINAL INDEX
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
                  <span className="text-[9px] font-mono text-atmos-accent tracking-widest uppercase opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    [{link.category}]
                  </span>
                  <span className="group-hover:text-atmos-accent transition-colors">{link.name}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 group-hover:text-atmos-accent transition-all" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Ascend Node Control Node */}
          <div className="flex justify-start lg:justify-end shrink-0">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="group flex items-center gap-3 bg-white/[0.02] hover:bg-atmos-accent/10 hover:border-atmos-accent/50 border border-white/5 px-6 py-3 rounded-full transition-all duration-500 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.25)]"
            >
              <span>ASCEND NODE</span>
              <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-atmos-accent/20 flex items-center justify-center text-white/50 group-hover:text-atmos-accent transition-all duration-500">
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Global Registry Authority Stamp */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]"
        >
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span>© {new Date().getFullYear()} MCA REGISTERED SYSTEM INC.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <div className="flex items-center gap-1.5">
              <span>Crafted for regular 25-27</span>
              <Heart className="w-3 h-3 text-atmos-accent fill-atmos-accent/10 animate-pulse" />
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-atmos-accent transition-colors flex items-center gap-1.5">
              <Globe className="w-3 h-3 opacity-60" />
              <span>Campus Index</span>
            </a>
            <a href="#" className="hover:text-atmos-accent transition-colors flex items-center gap-1.5">
              <Compass className="w-3 h-3 opacity-60" />
              <span>Atmospheric Hub</span>
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};
