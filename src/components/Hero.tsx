import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Cpu, Calendar, Code, Network, Sparkles } from 'lucide-react';
import { STUDENTS, PROJECTS, MEMORIES } from '../constants';

const titleText = "RMCA";
const subtitleText = "25-27";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const charVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)", scale: 0.9 },
  visible: { 
    opacity: 0.95, 
    y: 0, 
    filter: "blur(0px)", 
    scale: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const Hero: React.FC = () => {
  const [timeSince, setTimeSince] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date('2025-08-11T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - startDate;

      setTimeSince({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-[#030202]">
      {/* Precision Digital Aesthetics Grid overlay matching the footer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_85%,transparent_100%)] pointer-events-none" />

      {/* Futuristic Responsive Ambient Light Radiators */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1200px] h-[500px] bg-gradient-to-tr from-[#f59e0b]/5 to-transparent blur-[140px] rounded-full mix-blend-screen opacity-70 animate-pulse" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-amber-500/5 blur-[130px] rounded-full mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 text-center px-6 w-full max-w-5xl flex flex-col items-center">
        
        {/* Dynamic Badge Controller */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 border border-white/5 hover:border-[#f59e0b]/30 bg-white/[0.01] hover:bg-white/[0.03] px-5 py-2.5 rounded-full mb-8 backdrop-blur-2xl transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.3)] select-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/80">
            System initialization : online
          </span>
        </motion.div>

        {/* High-fidelity custom Typographic Display */}
        <div className="relative mb-6 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-7xl sm:text-8xl md:text-[11rem] font-serif font-light tracking-[0.1em] leading-none mb-1 text-white relative flex items-center justify-center animate-pulse"
              style={{ animationDuration: '4s' }}
            >
              {titleText.split('').map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={charVariants} 
                  whileHover={{ 
                    scale: 1.05, 
                    color: "#f59e0b",
                    transition: { duration: 0.2 } 
                  }}
                  className="inline-block cursor-default transition-all duration-300 mx-1"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Glowing amber Nixie timer styled version of subtitle "25-27" */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center gap-1.5 mt-2 bg-white/[0.01] border border-white/5 px-6 py-2 rounded-2xl backdrop-blur-xl relative"
            >
              <div className="absolute inset-0 bg-[#f59e0b]/[0.01] rounded-2xl pointer-events-none" />
              {subtitleText.split('').map((char, index) => (
                <motion.span 
                  key={index}
                  variants={charVariants}
                  className="inline-block font-mono font-medium text-3xl md:text-5xl text-[#f59e0b] px-0.5 relative group [text-shadow:0_0_15px_rgba(245,158,11,0.4)]"
                  whileHover={{ 
                    scale: 1.15, 
                    color: "#fafeed",
                    textShadow: "0 0 35px rgba(245,158,11,0.9)",
                    transition: { duration: 0.15 } 
                  }}
                >
                  {char}
                  <div className="absolute -inset-2 blur-3xl bg-[#f59e0b]/10 rounded-full opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity" />
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Minimalized descriptive loop */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.9, duration: 1.2 }}
          className="text-xs sm:text-sm font-sans font-light tracking-widest uppercase text-white/90 max-w-md mx-auto text-center leading-relaxed mt-4"
        >
          MCA REGULAR • COMPUTER APPLICATIONS COHORT
        </motion.p>

        {/* Interactive Milestone Ledger (The Count Since Commencement) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl w-full mt-16"
        >
          {[
            { label: 'days passed', value: timeSince.days },
            { label: 'hours', value: timeSince.hours },
            { label: 'minutes', value: timeSince.minutes },
            { label: 'seconds', value: timeSince.seconds },
          ].map((item, idx) => (
            <div key={item.label} className="relative group">
              {/* Outer soft dynamic card backdrop overlay */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent group-hover:from-[#f59e0b]/20 group-hover:to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              
              <div className="bg-[#0a0807]/30 backdrop-blur-2xl border border-white/5 group-hover:border-[#f59e0b]/25 p-5 md:p-6 flex flex-col items-center justify-center rounded-2xl transition-all duration-500 relative z-10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                {/* Active corner ticks */}
                <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-white/10 group-hover:bg-[#f59e0b]/50 transition-colors" />

                <span className="text-3xl md:text-4xl font-mono tracking-tight font-bold text-white group-hover:text-[#f59e0b] group-hover:scale-105 transition-all duration-500">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="mt-2.5 text-[8px] font-mono tracking-[0.25em] text-white/30 group-hover:text-white/50 uppercase transition-colors">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Interactive Stats Panel to match bento metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.5 }}
          className="mt-14 flex items-center justify-center gap-6 text-white/30 font-mono text-[9px] uppercase tracking-[0.2em] border border-white/5 bg-white/[0.01] px-6 py-3.5 rounded-full backdrop-blur-2xl max-w-md select-none hover:border-[#f59e0b]/20 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-white/50">
            <Network className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Active Nodes: {STUDENTS.length}</span>
          </div>
          <span className="text-white/10">|</span>
          <div className="flex items-center gap-1.5 text-white/50">
            <Code className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Showcases: {PROJECTS.length}</span>
          </div>
        </motion.div>

      </div>

      {/* Downward Navigation Needle Scrolling Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 select-none"
      >
        <span className="text-[8px] font-mono text-[#f59e0b] tracking-[0.25em] uppercase">Begin journey</span>
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#f59e0b]/60 to-transparent" />
      </motion.div>
    </section>
  );
};
