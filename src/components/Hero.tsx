import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const titleText = "RMCA";
const subtitleText = "25-27";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const charVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    scale: 1,
    transition: { duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] } 
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

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-atmos-accent/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="relative z-10 text-center px-6 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="inline-block border border-white/10 bg-white/5 px-6 py-2 rounded-full mb-10 backdrop-blur-md">
            <h2 className="text-white/70 font-sans tracking-[0.2em] text-xs uppercase">MCA Regular Program</h2>
          </div>
          
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-7xl md:text-[14rem] font-serif font-light tracking-tight mb-2 leading-none relative group flex flex-col items-center"
          >
            <div className="flex relative">
              {titleText.split('').map((char, index) => (
                <motion.span key={index} variants={charVariants} className="inline-block text-white opacity-95">
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.div variants={charVariants} className="block font-sans font-light text-3xl md:text-6xl text-atmos-accent drop-shadow-[0_0_30px_rgba(255,78,0,0.5)] mt-4">
              {subtitleText}
            </motion.div>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="flex gap-4 md:gap-10 justify-center mt-20"
        >
          {[
            { label: 'Days', value: timeSince.days },
            { label: 'Hours', value: timeSince.hours },
            { label: 'Minutes', value: timeSince.minutes },
            { label: 'Seconds', value: timeSince.seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center relative group">
              <div className="absolute inset-0 bg-atmos-surface blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="glass-panel w-20 h-24 md:w-28 md:h-32 flex flex-col items-center justify-center rounded-2xl border-white/10 hover:border-atmos-accent/50 transition-all duration-500 relative z-10">
                <span className="text-3xl md:text-5xl font-serif font-light text-white">{item.value.toString().padStart(2, '0')}</span>
                <span className="mt-2 text-[10px] md:text-xs tracking-widest text-white/50 font-sans uppercase">{item.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 2 }}
          className="mt-20 flex items-center justify-center gap-6 text-white/30 font-serif italic tracking-wide text-sm"
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
          <span>Commenced August 11th, 2025</span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-sans text-atmos-accent tracking-[0.2em] uppercase">Begin</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-atmos-accent to-transparent" />
      </motion.div>
    </section>
  );
};
