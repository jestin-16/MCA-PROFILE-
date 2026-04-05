import React from 'react';
import { motion } from 'motion/react';
import { MEMORIES } from '../constants';
import { AlertTriangle } from 'lucide-react';

const getGridItemClass = (index: number) => {
  const classes = [
    "md:col-span-8 md:row-span-2", // Large hero
    "md:col-span-4 md:row-span-1", // Small side
    "md:col-span-4 md:row-span-1", // Small side
    "md:col-span-4 md:row-span-2", // Tall left
    "md:col-span-8 md:row-span-1", // Wide right
    "md:col-span-5 md:row-span-2", // Medium tall
    "md:col-span-7 md:row-span-1", // Medium wide
    "md:col-span-3 md:row-span-1", // Small
    "md:col-span-4 md:row-span-1", // Small
  ];
  return classes[index % classes.length];
};

export const MemoryLane: React.FC = () => {
  return (
    <section id="memories" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16 border-l-4 border-cyber-green pl-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <AlertTriangle className="text-cyber-green w-5 h-5" />
            <span className="text-cyber-green font-mono text-xs uppercase tracking-[0.3em]">Raw_Data_Dump</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
            Memory <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-cyan">Fragments</span>
          </h2>
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest max-w-2xl">
            Unfiltered visual records. Size and resolution may vary due to data corruption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[250px] gap-4 md:grid-flow-dense">
          {MEMORIES.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 5) * 0.1 }}
              className={`group relative overflow-hidden bg-void-black border border-white/10 hover:border-cyber-green transition-colors duration-300 ${getGridItemClass(index)}`}
            >
              {/* Rugged Background Pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-50" />

              <img
                src={memory.url}
                alt={memory.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Industrial Tape / Accent */}
              <div className="absolute top-4 -right-10 bg-cyber-green text-void-black text-[8px] font-black uppercase tracking-widest py-1 px-10 rotate-45 shadow-lg z-20">
                RAW_FILE
              </div>

              {/* Overlay Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-10 flex flex-col justify-end h-full pointer-events-none">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-cyber-green animate-pulse" />
                    <span className="text-[10px] font-mono text-cyber-green uppercase tracking-widest bg-void-black/80 px-2 py-0.5 border border-cyber-green/30">
                      ID_{memory.id.slice(0,6)}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-black uppercase tracking-tight text-white drop-shadow-md line-clamp-2">
                    {memory.caption}
                  </p>
                </div>
              </div>

              {/* Rugged Borders / Crosshairs */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-cyber-green transition-colors z-20" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-cyber-green transition-colors z-20" />
              
              {/* Glitch Overlay on Hover */}
              <div className="absolute inset-0 bg-cyber-green/10 opacity-0 group-hover:opacity-100 mix-blend-color transition-opacity duration-300 pointer-events-none z-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
