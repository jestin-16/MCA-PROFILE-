import React from 'react';
import { motion } from 'motion/react';
import { MEMORIES } from '../constants';
import { Camera } from 'lucide-react';

export const MemoryLane: React.FC = () => {
  return (
    <section id="memories" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Camera className="text-cyber-green w-5 h-5" />
            <span className="text-cyber-green font-mono text-xs uppercase tracking-[0.3em]">System.Archives</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
            Memory <span className="text-cyber-green">Lane</span>
          </h2>
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest max-w-2xl mx-auto">Capturing the moments that define our journey through MCA.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMORIES.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden holo-card border border-cyber-green/20 hover:border-cyber-green/80 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,102,0.2)] aspect-square bg-void-black/80"
            >
              <img
                src={memory.url}
                alt={memory.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-50 mix-blend-overlay pointer-events-none" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-8 h-[2px] bg-cyber-green mb-3 shadow-[0_0_10px_rgba(0,255,102,0.8)]" />
                  <p className="text-lg font-black uppercase tracking-tight text-white drop-shadow-[0_0_5px_rgba(0,255,102,0.5)]">{memory.caption}</p>
                  <p className="text-[10px] font-mono text-cyber-green mt-1 uppercase tracking-widest">RECORD_{memory.id.slice(0,6)}</p>
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-green/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-green/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
