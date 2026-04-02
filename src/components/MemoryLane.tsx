import React from 'react';
import { motion } from 'motion/react';
import { MEMORIES } from '../constants';

export const MemoryLane: React.FC = () => {
  return (
    <section id="memories" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Memory Lane</h2>
          <p className="text-white/50 max-w-2xl mx-auto">Capturing the moments that define our journey through MCA.</p>
        </div>

        <div className="relative flex flex-col gap-16 md:gap-32 py-10">
          {MEMORIES.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} items-center`}
            >
              {/* Center dot */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-tech-violet/80 border-2 border-[#050505] z-10 shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
              
              {/* Connector Line */}
              <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-tech-violet/30 w-[5%] ${index % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} />

              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full md:w-[45%]"
              >
                <div className="group relative overflow-hidden rounded-2xl glass border border-white/10 hover:border-tech-violet/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <img
                    src={memory.url}
                    alt={memory.caption}
                    className="w-full h-auto object-cover transition-transform duration-700 md:group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <p className="text-lg font-bold text-white drop-shadow-lg">{memory.caption}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
