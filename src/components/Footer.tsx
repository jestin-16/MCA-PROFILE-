import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 pt-32 pb-12 overflow-hidden border-t border-white/5 bg-atmos-dark">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-atmos-accent/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-atmos-accent/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Large Typography Background piece */}
        <div className="flex flex-col items-center justify-center mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[4rem] md:text-[12rem] font-serif font-light text-white/[0.03] tracking-tighter leading-none select-none text-center"
          >
            RMCA '27
          </motion.h2>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="glass-panel px-6 py-3 rounded-full border border-atmos-accent/30 flex items-center gap-3 backdrop-blur-xl">
               <div className="w-2 h-2 rounded-full bg-atmos-accent animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
               <span className="font-mono text-xs uppercase tracking-widest text-white/80">Connecting the Future</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          {/* Brand/Identity */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-white relative group overflow-hidden bg-white/5">
                <div className="absolute inset-0 bg-atmos-accent/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="font-serif italic text-xl relative z-10">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-light tracking-widest text-white uppercase font-sans">MCA Regular</span>
                <span className="text-xs font-mono tracking-wider text-atmos-accent drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] mt-1">BATCH OF 2025-2027</span>
              </div>
            </div>
            <p className="text-white/40 text-sm font-light max-w-sm leading-relaxed">
              An atmospheric digital space for the MCA Regular class of 2025-2027. Showcasing our projects, collective memories, and the journey forward.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white/80 font-mono text-[10px] tracking-[0.2em] uppercase mb-2">Navigation</h4>
            {['Home', 'Directory', 'Showcase', 'Memories', 'Board'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors text-sm font-light flex items-center gap-2 group w-fit">
                <span className="uppercase tracking-wider font-sans text-xs">{link}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-atmos-accent" />
              </a>
            ))}
          </div>

          {/* Socials & Interaction */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white/80 font-mono text-[10px] tracking-[0.2em] uppercase mb-1">Connect</h4>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-atmos-accent hover:bg-atmos-accent/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                  <Icon strokeWidth={1.5} width={18} height={18} />
                </a>
              ))}
            </div>
            
            <button 
              onClick={scrollToTop}
              className="mt-auto flex items-center gap-4 text-xs font-mono text-atmos-accent uppercase tracking-widest hover:text-white transition-colors group w-fit pt-4"
            >
              <span>Back to Top</span>
              <div className="w-10 h-10 rounded-full border border-atmos-accent/30 bg-atmos-accent/5 flex items-center justify-center group-hover:bg-atmos-accent group-hover:border-atmos-accent transition-all duration-500 overflow-hidden relative">
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                 <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform relative z-10" />
              </div>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} MCA Regular. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-atmos-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-atmos-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
