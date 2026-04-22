import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Layers, Github, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';

export const ProjectShowcase: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 relative z-10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-atmos-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-atmos-accent/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-atmos-accent/50" />
              <Layers className="text-atmos-accent w-4 h-4 opacity-70" />
              <span className="font-sans text-[10px] tracking-[0.3em] text-atmos-accent uppercase font-medium">Innovations</span>
            </div>
            <h2 className="title-serif text-5xl md:text-8xl mb-8 text-white leading-[1.1]">
              Project <span className="text-atmos-accent italic">Showcase</span>
            </h2>
            <p className="font-sans text-white/40 text-sm md:text-base tracking-wide max-w-xl font-light leading-relaxed">
              Where lines of code transform into solutions. Explore the digital architectures crafted by our developers.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`${
                index === 0 ? 'lg:col-span-12' : 'lg:col-span-6'
              } group`}
            >
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-atmos-accent/20 hover:shadow-[0_0_50px_rgba(99,102,241,0.05)]">
                <div className={`flex flex-col ${index === 0 ? 'lg:flex-row' : ''}`}>
                  {/* Image Container */}
                  <div className={`relative overflow-hidden ${index === 0 ? 'lg:w-3/5 aspect-[16/9]' : 'aspect-video'}`}>
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-atmos-bg via-transparent to-transparent opacity-60" />
                    
                    {/* Floating Tech Badges (Only on Featured) */}
                    {index === 0 && (
                      <div className="absolute top-8 left-8 flex gap-2">
                        <span className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-sans text-white/80 tracking-widest uppercase">Featured Project</span>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className={`p-8 md:p-12 flex flex-col justify-between ${index === 0 ? 'lg:w-2/5' : ''}`}>
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="title-serif text-3xl md:text-4xl text-white group-hover:text-atmos-accent transition-colors duration-500">
                          {project.title}
                        </h3>
                        <motion.a 
                          href="#"
                          whileHover={{ rotate: 45 }}
                          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-atmos-accent transition-all"
                        >
                          <ArrowUpRight size={18} />
                        </motion.a>
                      </div>

                      <p className="text-white/50 text-sm md:text-base leading-relaxed font-light mb-8 line-clamp-3 group-hover:text-white/70 transition-colors duration-500">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.map(tech => (
                          <span key={tech} className="text-[10px] font-sans tracking-widest uppercase text-atmos-accent/70 bg-atmos-accent/5 border border-atmos-accent/10 px-3 py-1 rounded-md transition-all group-hover:border-atmos-accent/30 group-hover:text-atmos-accent">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 p-1">
                          <img src={`https://avatar.vercel.sh/${project.author}`} className="w-full h-full rounded-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt={project.author} />
                        </div>
                        <span className="text-xs font-sans text-white/30 group-hover:text-white/60 transition-colors">{project.author}</span>
                      </div>

                      <div className="flex gap-4">
                        <a href="#" className="text-white/20 hover:text-atmos-accent transition-colors">
                          <Github size={16} />
                        </a>
                        <a href="#" className="text-white/20 hover:text-atmos-accent transition-colors">
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View All Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <button className="group flex items-center gap-4 text-xs font-sans tracking-[0.4em] uppercase text-white/40 hover:text-white transition-all">
            <span className="w-12 h-px bg-white/10 group-hover:w-24 group-hover:bg-atmos-accent transition-all duration-700" />
            Explore Archive
            <span className="w-12 h-px bg-white/10 group-hover:w-24 group-hover:bg-atmos-accent transition-all duration-700" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

