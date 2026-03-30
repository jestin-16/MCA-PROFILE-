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
              <GlassCard className="group relative overflow-hidden h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-tech-blue/50 transition-colors">
                    <img 
                      src={student.image} 
                      alt={student.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <div className="flex gap-2 mt-1">
                      {student.github && <a href={student.github} className="text-white/40 hover:text-tech-blue"><Github size={16} /></a>}
                      {student.linkedin && <a href={student.linkedin} className="text-white/40 hover:text-tech-blue"><Linkedin size={16} /></a>}
                      {student.twitter && <a href={student.twitter} className="text-white/40 hover:text-tech-blue"><Twitter size={16} /></a>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {student.techStack.map(tech => (
                    <span key={tech} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-tech-blue/10 text-tech-blue border border-tech-blue/20">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-tech-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </GlassCard>
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
