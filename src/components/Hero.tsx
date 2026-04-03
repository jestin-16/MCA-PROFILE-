import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyber-cyan/10 blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyber-purple/10 blur-[150px] rounded-full mix-blend-screen" />

      <div className="relative z-10 text-center px-6 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-block border border-cyber-cyan/30 bg-cyber-cyan/5 px-4 py-1 rounded-full mb-8 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <h2 className="text-cyber-cyan font-mono tracking-[0.3em] text-xs uppercase">SYS.INIT // MCA_REGULAR</h2>
          </div>
          
          <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter mb-4 leading-none relative group">
            <span className="block text-white mix-blend-overlay opacity-90 group-hover:opacity-100 transition-opacity">RMCA</span>
            <span className="absolute inset-0 text-cyber-cyan opacity-0 group-hover:opacity-50 translate-x-1 translate-y-1 transition-all duration-75 mix-blend-screen blur-[2px]">RMCA</span>
            <span className="absolute inset-0 text-cyber-magenta opacity-0 group-hover:opacity-50 -translate-x-1 -translate-y-1 transition-all duration-75 mix-blend-screen blur-[2px]">RMCA</span>
            <span className="block bg-gradient-to-r from-cyber-cyan via-white to-cyber-purple bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">25-27</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex gap-4 md:gap-8 justify-center mt-16"
        >
          {[
            { label: 'DAYS', value: timeSince.days },
            { label: 'HRS', value: timeSince.hours },
            { label: 'MIN', value: timeSince.minutes },
            { label: 'SEC', value: timeSince.seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center relative group">
              <div className="absolute inset-0 bg-cyber-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="glass-panel w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-none border-t-2 border-b-2 border-transparent group-hover:border-cyber-cyan transition-all duration-300 relative z-10">
                <span className="text-2xl md:text-4xl font-mono font-bold neon-text">{item.value.toString().padStart(2, '0')}</span>
              </div>
              <span className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-cyber-cyan/70 font-mono font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center justify-center gap-4 text-white/40 font-mono tracking-[0.2em] uppercase text-xs"
        >
          <div className="w-12 h-[1px] bg-white/20" />
          <span>UPTIME SINCE 2025.08.11</span>
          <div className="w-12 h-[1px] bg-white/20" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-mono text-cyber-cyan tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyber-cyan to-transparent" />
      </motion.div>
    </section>
  );
};
