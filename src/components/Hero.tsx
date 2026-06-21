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
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#030202]">
      {/* Precision Digital Aesthetics Grid overlay matching the footer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_85%,transparent_100%)] pointer-events-none" />

      {/* Futuristic Responsive Ambient Light Radiators */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1200px] h-[600px] bg-gradient-to-tr from-[#f59e0b]/8 via-transparent to-transparent blur-[160px] rounded-full mix-blend-screen opacity-80 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-600/5 blur-[140px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-amber-500/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 text-center px-6 w-full max-w-5xl flex flex-col items-center">
        
        {/* Dynamic Badge Controller - styled with premium glass pill look */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 border border-white/[0.08] bg-white/[0.03] hover:border-amber-500/30 px-6 py-2.5 rounded-full mb-8 backdrop-blur-xl hover:bg-[#f59e0b]/5 transition-all duration-500 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.5)] select-none group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f59e0b]" />
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-white/90 group-hover:text-amber-400 transition-colors">
            System initialization : online
          </span>
        </motion.div>

        {/* High-fidelity custom Typographic Display encased in a premium frosted glass capsule container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl glass-panel p-8 md:p-12 mb-10 overflow-hidden group hover:border-amber-500/30 hover:shadow-[0_45px_90px_rgba(245,158,11,0.06),inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-[2.5rem]"
        >
          {/* Subtle glossy sheen line sweep inside the title module */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-[2.5rem]">
            <div className="absolute -inset-full top-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </div>

          <div className="relative select-none flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <motion.h1 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-8xl sm:text-9xl md:text-[11.5rem] font-serif font-light tracking-[0.15em] leading-none mb-2 text-white relative flex items-center justify-center"
              >
                {titleText.split('').map((char, index) => (
                  <motion.span 
                    key={index} 
                    variants={charVariants} 
                    whileHover={{ 
                      scale: 1.08, 
                      color: "#f59e0b",
                      transition: { duration: 0.25, ease: "easeOut" } 
                    }}
                    className="inline-block cursor-default transition-all duration-300 mx-1 drop-shadow-[0_4px_20px_rgba(255,255,255,0.08)] [text-shadow:0_4px_30px_rgba(255,255,255,0.05)]"
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
                className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-white/[0.05] to-white/[0.01] border border-white/[0.12] px-8 py-3 rounded-full backdrop-blur-3xl relative shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.18),0_12px_40px_rgba(0,0,0,0.6)] group/nixie"
              >
                <div className="absolute inset-0 bg-amber-500/[0.04] rounded-full pointer-events-none" />
                {subtitleText.split('').map((char, index) => (
                  <motion.span 
                    key={index}
                    variants={charVariants}
                    className="inline-block font-mono font-medium text-4xl md:text-5xl text-[#f59e0b] px-1 relative group/char [text-shadow:0_0_18px_rgba(245,158,11,0.5)]"
                    whileHover={{ 
                      scale: 1.2, 
                      color: "#fafeed",
                      textShadow: "0 0 40px rgba(245,158,11,1)",
                      transition: { duration: 0.15 } 
                    }}
                  >
                    {char}
                    <div className="absolute -inset-2 blur-3xl bg-[#f59e0b]/15 rounded-full opacity-60 pointer-events-none group-hover/char:opacity-100 transition-opacity" />
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Minimalized descriptive loop */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.9, duration: 1.2 }}
          className="text-xs sm:text-sm font-sans font-medium tracking-[0.25em] uppercase text-amber-500/90 max-w-md mx-auto text-center leading-relaxed mt-4"
        >
          MCA REGULAR • COMPUTER APPLICATIONS COHORT
        </motion.p>

        {/* Interactive Milestone Ledger (The Count Since Commencement) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl w-full mt-14"
        >
          {[
            { label: 'DAYS PASSED', value: timeSince.days, icon: Calendar },
            { label: 'HOURS_ACTIVE', value: timeSince.hours, icon: Cpu },
            { label: 'MINUTES', value: timeSince.minutes, icon: Network },
            { label: 'SECONDS', value: timeSince.seconds, icon: Sparkles },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="relative group [perspective:1000px]">
                {/* Mirror reflection sweep effect overlay */}
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-[2rem]">
                  <div className="absolute -inset-full top-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
                
                {/* Custom circular glow backdrop */}
                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-amber-500/0 via-amber-500/0 to-transparent group-hover:from-amber-500/5 group-hover:to-amber-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
                
                {/* Glass-Panel card container with a generous rounded-[2rem] layout to fit */}
                <div className="glass-panel p-6 md:p-8 flex flex-col items-center justify-center rounded-[2rem] border border-white/[0.08] hover:border-amber-500/30 group-hover:shadow-[0_20px_45px_rgba(245,158,11,0.1)] relative z-10 text-center">
                  
                  {/* Styled Dynamic Mini Ring matching high-end circular elements */}
                  <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 group-hover:text-amber-500 group-hover:border-amber-500/20 group-hover:scale-110 transition-all duration-500 mb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="text-4xl md:text-5xl font-mono tracking-tight font-extrabold text-white group-hover:text-amber-500 transition-all duration-500 [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  
                  <span className="mt-3.5 text-[8.5px] font-mono tracking-[0.25em] text-white/35 group-hover:text-amber-500/80 uppercase font-black transition-colors">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Interactive Stats Panel to match bento metrics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-wrap sm:flex-nowrap items-center justify-center gap-6 text-white/30 font-mono text-[9px] uppercase tracking-[0.2em] border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] px-7 py-4 rounded-full backdrop-blur-xl select-none hover:border-amber-500/30 hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-all duration-500 relative group"
        >
          {/* Subtle reflection overlay on stats component as well */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-full">
            <div className="absolute -inset-full top-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </div>

          <div className="flex items-center gap-2 text-white/60 font-semibold group-hover:text-white transition-colors duration-300">
            <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
              <Network className="w-3 h-3" />
            </div>
            <span>SCHOLARS: <span className="text-white font-bold">{STUDENTS.length}</span></span>
          </div>
          <span className="text-white/10 hidden sm:inline select-none">|</span>
          <div className="flex items-center gap-2 text-white/60 font-semibold group-hover:text-white transition-colors duration-300">
            <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
              <Code className="w-3 h-3" />
            </div>
            <span>PROJECTS: <span className="text-white font-bold">{PROJECTS.length}</span></span>
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
