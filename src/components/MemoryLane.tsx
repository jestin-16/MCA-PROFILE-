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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMORIES.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass border border-white/10 hover:border-tech-violet/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] aspect-square"
            >
              <img
                src={memory.url}
                alt={memory.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-lg font-bold text-white drop-shadow-lg">{memory.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
