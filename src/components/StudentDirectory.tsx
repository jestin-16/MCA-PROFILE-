import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { STUDENTS } from '../constants';
import { GlassCard } from './GlassCard';

export const StudentDirectory: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredStudents = STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section id="directory" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">Student Directory</h2>
          <p className="text-white/50">Meet the brilliant minds of the 2025-2027 batch.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
          <input
            type="text"
            placeholder="Search name or tech stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-tech-blue/50 transition-colors"
          />
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredStudents.map((student) => (
            <motion.div
              key={student.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-[400px] w-full"
              >
                <GlassCard className="group relative overflow-hidden h-full p-0 border border-white/10 hover:border-tech-blue/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]">
                  {/* Full Bleed Background Image */}
                  <img 
                    src={student.image} 
                    alt={student.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content Container */}
                  <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10">
                    <div className="flex justify-between items-end">
                      <div className="flex-1">
                        <h3 className="font-black text-2xl sm:text-3xl tracking-tighter text-white uppercase leading-none mb-1 group-hover:text-tech-blue transition-colors duration-300 drop-shadow-lg">
                          {student.name}
                        </h3>
                        <p className="text-xs text-white/60 uppercase tracking-widest font-mono font-semibold">
                          MCA '27
                        </p>
                      </div>
                      
                      {/* Social Links */}
                      <div className="flex gap-3 pb-1">
                        {student.github && (
                          <a href={student.github} className="text-white/50 hover:text-white transition-colors transform hover:scale-110">
                            <Github size={18} />
                          </a>
                        )}
                        {student.linkedin && (
                          <a href={student.linkedin} className="text-white/50 hover:text-[#0A66C2] transition-colors transform hover:scale-110">
                            <Linkedin size={18} />
                          </a>
                        )}
                        {student.twitter && (
                          <a href={student.twitter} className="text-white/50 hover:text-[#1DA1F2] transition-colors transform hover:scale-110">
                            <Twitter size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Tech Stack - Appears on Hover */}
                    <div className="overflow-hidden">
                      <div className="flex flex-wrap gap-1.5 mt-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {student.techStack.slice(0, 4).map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm bg-white/10 text-white/90 backdrop-blur-md border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                        {student.techStack.length > 4 && (
                          <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm bg-white/5 text-white/50 backdrop-blur-md border border-white/5">
                            +{student.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Animated Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-tech-blue/0 group-hover:border-tech-blue/50 transition-colors duration-500 rounded-tl-2xl z-20" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-tech-violet/0 group-hover:border-tech-violet/50 transition-colors duration-500 rounded-br-2xl z-20" />
                </GlassCard>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-20 text-white/30">
          No students found matching your search.
        </div>
      )}
    </section>
  );
};
