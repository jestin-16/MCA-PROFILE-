import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Code2 } from 'lucide-react';
import { PROJECTS } from '../constants';
import { GlassCard } from './GlassCard';

export const ProjectShowcase: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">Project Showcase</h2>
        <p className="text-white/50">Innovation and creativity from our batch members.</p>
      </div>

      <div className="relative flex flex-col gap-16 md:gap-32 py-10">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`relative flex w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} items-center`}
          >
            {/* Center dot */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-tech-blue/80 border-2 border-[#050505] z-10 shadow-[0_0_15px_rgba(0,210,255,0.5)]" />
            
            {/* Connector Line */}
            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-tech-blue/30 w-[5%] ${index % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} />

            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full md:w-[45%]"
            >
              <GlassCard className="p-0 overflow-hidden flex flex-col h-full group border border-white/10 hover:border-tech-blue/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="glass p-2 rounded-full text-white/70 hover:text-tech-blue cursor-pointer transition-colors">
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-tech-blue transition-colors">{project.title}</h3>
                    <span className="text-xs font-mono text-white/40">by {project.author}</span>
                  </div>
                  
                  <p className="text-white/60 mb-6 flex-grow">{project.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-sm">
                          #{tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
