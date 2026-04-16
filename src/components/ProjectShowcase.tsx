import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Layers } from 'lucide-react';
import { PROJECTS } from '../constants';

export const ProjectShowcase: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Layers className="text-atmos-accent w-5 h-5 opacity-70" />
            <span className="font-sans text-xs tracking-widest text-atmos-accent/80 uppercase">Selected Works</span>
          </div>
          <h2 className="title-serif text-5xl md:text-6xl mb-6">
            Project <span className="text-atmos-accent italic">Showcase</span>
          </h2>
          <p className="font-sans text-white/50 text-sm tracking-wide max-w-2xl mx-auto font-light">
            Highlighting innovation, technical excellence, and creative problem-solving from our members.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="w-full h-full"
          >
            <div className="glass-panel overflow-hidden flex flex-col h-full group">
              <div className="relative h-64 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-atmos-bg via-atmos-bg/20 to-transparent" />
                
                <div className="absolute top-6 right-6">
                  <div className="bg-white/5 backdrop-blur-md p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 cursor-pointer transition-all hover:scale-110">
                    <ExternalLink size={18} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-atmos-bg to-atmos-bg/40">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="title-serif text-3xl group-hover:text-atmos-accent transition-colors">{project.title}</h3>
                </div>
                <div className="mb-6">
                  <span className="text-xs font-sans text-white/40 tracking-wider">Created By:</span>
                  <span className="text-sm font-sans text-white/80 ml-2">{project.author}</span>
                </div>
                
                <p className="text-white/60 mb-8 flex-grow font-sans text-sm leading-relaxed font-light">{project.description}</p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-xs font-sans text-white/50 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 transition-colors hover:bg-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

