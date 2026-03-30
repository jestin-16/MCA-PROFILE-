import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tech-blue to-tech-violet flex items-center justify-center text-white text-xs font-bold">
            MCA
          </div>
          <span className="text-sm font-bold tracking-tighter">BATCH PORTAL 2025-2027</span>
        </div>

        <div className="text-white/30 text-xs font-medium uppercase tracking-widest">
          Built with passion by the MCA Regular Batch
        </div>

        <div className="flex gap-6 text-sm text-white/50">
          <a href="#" className="hover:text-tech-blue transition-colors">Privacy</a>
          <a href="#" className="hover:text-tech-blue transition-colors">Terms</a>
          <a href="#" className="hover:text-tech-blue transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};
