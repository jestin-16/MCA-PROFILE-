import React from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'motion/react';
import { MEMORIES } from '../constants';

export const MemoryLane: React.FC = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <section id="memories" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Memory Lane</h2>
          <p className="text-white/50 max-w-2xl mx-auto">Capturing the moments that define our journey through MCA.</p>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {MEMORIES.map((memory, idx) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass"
            >
              <img
                src={memory.url}
                alt={memory.caption}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <p className="text-sm font-medium text-white">{memory.caption}</p>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};
