import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Code2 } from 'lucide-react';
import { PROJECTS } from '../constants';

export const ProjectShowcase: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Code2 className="text-cyber-magenta w-5 h-5" />
          <span className="text-cyber-magenta font-mono text-xs uppercase tracking-[0.3em]">System.Projects</span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
          Project <span className="text-cyber-magenta">Showcase</span>
        </h2>
        <p className="text-white/50 font-mono text-sm uppercase tracking-widest">Innovation and creativity from our batch members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-full"
          >
            <div className="holo-card p-0 overflow-hidden flex flex-col h-full group border border-cyber-magenta/20 hover:border-cyber-magenta/80 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,0,60,0.2)] bg-void-black/80">
              <div className="relative h-64 overflow-hidden border-b border-cyber-magenta/20">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105 grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-50 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/20 to-transparent opacity-90" />
                
                <div className="absolute top-4 right-4">
                  <div className="bg-void-black/80 p-2 border border-cyber-magenta/50 text-cyber-magenta hover:bg-cyber-magenta/20 hover:text-white cursor-pointer transition-colors shadow-[0_0_10px_rgba(255,0,60,0.3)]">
                    <ExternalLink size={18} />
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-magenta/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-magenta/50" />
              </div>
              
              <div className="p-8 flex flex-col flex-grow relative z-10 bg-void-black/90">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-cyber-magenta transition-colors drop-shadow-[0_0_5px_rgba(255,0,60,0.5)]">{project.title}</h3>
                  <span className="text-[10px] font-mono text-cyber-magenta/70 uppercase tracking-widest bg-cyber-magenta/10 px-2 py-1 border border-cyber-magenta/30">BY {project.author}</span>
                </div>
                
                <p className="text-white/60 mb-6 flex-grow font-mono text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[9px] font-mono font-bold text-cyber-magenta/80 uppercase tracking-widest bg-cyber-magenta/5 border border-cyber-magenta/20 px-2 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-magenta to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
