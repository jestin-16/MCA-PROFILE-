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
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-tech-blue/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tech-violet/20 blur-[120px] rounded-full" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-tech-blue font-mono tracking-widest text-sm uppercase mb-4">MCA Regular Batch</h2>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
            <span className="block text-white">RMCA</span>
            <span className="block bg-gradient-to-r from-tech-blue to-tech-violet bg-clip-text text-transparent">25-27</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex gap-4 md:gap-8 justify-center mt-12"
        >
          {[
            { label: 'Days', value: timeSince.days },
            { label: 'Hours', value: timeSince.hours },
            { label: 'Mins', value: timeSince.minutes },
            { label: 'Secs', value: timeSince.seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="glass w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-xl md:rounded-2xl mb-2">
                <span className="text-2xl md:text-4xl font-bold text-glow-blue">{item.value}</span>
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-white/40 font-medium tracking-wide uppercase text-xs"
        >
          Journey Since August 11, 2025
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
      >
        <div className="w-1 h-2 bg-tech-blue rounded-full" />
      </motion.div>
    </section>
  );
};
