import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-cyber-cyan/20 mt-24 relative z-10 bg-void-black/90">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-cyber-cyan bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan text-xs font-black shadow-[0_0_10px_rgba(0,255,255,0.3)]">
            MCA
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tighter uppercase text-white">SYS.PORTAL</span>
            <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-widest">BATCH_2025_2027</span>
          </div>
        </div>

        <div className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-2 h-2 bg-cyber-magenta animate-pulse" />
          SYSTEM_ONLINE // BUILT_BY_MCA_REGULAR
        </div>

        <div className="flex gap-6 text-xs font-mono text-white/50 uppercase tracking-widest">
          <a href="#" className="hover:text-cyber-cyan hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all">Privacy</a>
          <a href="#" className="hover:text-cyber-cyan hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all">Terms</a>
          <a href="#" className="hover:text-cyber-cyan hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all">Contact</a>
        </div>
      </div>
    </footer>
  );
};
