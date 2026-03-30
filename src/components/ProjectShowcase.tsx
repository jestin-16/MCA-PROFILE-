import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Code2 } from 'lucide-react';
import { PROJECTS } from '../constants';
import { GlassCard } from './GlassCard';

export const ProjectShowcase: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">Project Showcase</h2>
        <p className="text-white/50">Innovation and creativity from our batch members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-0 overflow-hidden flex flex-col h-full group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  <div className="glass p-2 rounded-full text-white/70 hover:text-tech-blue cursor-pointer">
                    <ExternalLink size={18} />
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <span className="text-xs font-mono text-white/40">by {project.author}</span>
                </div>
                
                <p className="text-white/60 mb-6 flex-grow">{project.description}</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
