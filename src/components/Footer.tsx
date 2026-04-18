import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 mt-24 relative z-10 glass-panel border-x-0 border-b-0 rounded-none mix-blend-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/90">
            <span className="font-serif italic text-sm pr-0.5">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-light tracking-widest text-white uppercase font-sans">CLASS OF '27</span>
          </div>
        </div>

        <div className="text-white/30 text-xs font-sans tracking-widest flex items-center gap-2 font-light">
          Built by MCA Regular
        </div>

        <div className="flex gap-6 text-xs font-sans text-white/50 uppercase tracking-widest font-light">
          <a href="#" className="hover:text-atmos-accent transition-colors">Privacy</a>
          <a href="#" className="hover:text-atmos-accent transition-colors">Terms</a>
          <a href="#" className="hover:text-atmos-accent transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};
