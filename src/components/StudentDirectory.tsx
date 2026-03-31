import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Github, Linkedin, Twitter, Database, Plus, X, Upload } from 'lucide-react';
import { STUDENTS as FALLBACK_STUDENTS } from '../constants';
import { GlassCard } from './GlassCard';
import { useQuery, useMutation } from "convex/react";
import { anyApi } from "convex/server";

export const StudentDirectory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [newStudent, setNewStudent] = useState({
    name: '',
    techStack: '',
    github: '',
    linkedin: '',
    twitter: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Fetch from Convex, fallback to constants if not loaded or empty
  const convexStudents = useQuery(anyApi.students.get);
  const addStudent = useMutation(anyApi.students.add);
  
  const students = convexStudents && convexStudents.length > 0 ? convexStudents : FALLBACK_STUDENTS;

  const handleSeedDatabase = async () => {
    if (isSeeding) return;
    setIsSeeding(true);
    try {
      for (const student of FALLBACK_STUDENTS) {
        await addStudent({
          name: student.name,
          image: student.image,
          techStack: student.techStack,
          github: student.github,
          linkedin: student.linkedin,
          twitter: student.twitter,
        });
      }
    } catch (error) {
      console.error("Failed to seed database:", error);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement Convex File Storage upload here later.
    // For now, using a placeholder image based on the name.
    const imageUrl = `https://picsum.photos/seed/${newStudent.name || 'new'}/400/400`;

    try {
      await addStudent({
        name: newStudent.name,
        image: imageUrl,
        techStack: newStudent.techStack.split(',').map(s => s.trim()).filter(Boolean),
        github: newStudent.github || undefined,
        linkedin: newStudent.linkedin || undefined,
        twitter: newStudent.twitter || undefined,
      });
      setIsAddModalOpen(false);
      setNewStudent({ name: '', techStack: '', github: '', linkedin: '', twitter: '' });
      setImageFile(null);
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  const sortedStudents = React.useMemo(() => {
    if (!students) return [];
    
    let result = [...students];
    
    if (search) {
      result = result.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Custom sorting: Jestin first, Rich second, rest as is
    result.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      const isAJestin = aName.includes('jestin');
      const isBJestin = bName.includes('jestin');
      if (isAJestin && !isBJestin) return -1;
      if (!isAJestin && isBJestin) return 1;

      const isARich = aName.includes('rich');
      const isBRich = bName.includes('rich');
      if (isARich && !isBRich) return -1;
      if (!isARich && isBRich) return 1;

      return 0;
    });

    return result;
  }, [students, search]);

  const displayedStudents = sortedStudents.slice(0, visibleCount);
  const hasMore = visibleCount < sortedStudents.length;

  return (
    <section id="directory" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">Student Directory</h2>
          <p className="text-white/50">Meet the brilliant minds of the 2025-2027 batch.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {convexStudents !== undefined && convexStudents.length === 0 && (
            <button 
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="flex items-center justify-center gap-2 bg-tech-blue/20 hover:bg-tech-blue/30 text-tech-blue px-4 py-3 rounded-full transition-colors border border-tech-blue/30 disabled:opacity-50"
            >
              <Database size={16} />
              {isSeeding ? 'Seeding...' : 'Seed Convex DB'}
            </button>
          )}
          
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-full transition-colors border border-white/10"
          >
            <Plus size={16} />
            Add Student
          </button>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
            <input
              type="text"
              placeholder="Search name or tech stack..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(6); // Reset pagination on search
              }}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-tech-blue/50 transition-colors"
            />
          </div>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {displayedStudents.map((student) => (
            <motion.div
              key={student._id || student.id}
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
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0 blur-md group-hover:blur-none"
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
                          <a href={student.github} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors transform hover:scale-110">
                            <Github size={18} />
                          </a>
                        )}
                        {student.linkedin && (
                          <a href={student.linkedin} target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#0A66C2] transition-colors transform hover:scale-110">
                            <Linkedin size={18} />
                          </a>
                        )}
                        {student.twitter && (
                          <a href={student.twitter} target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#1DA1F2] transition-colors transform hover:scale-110">
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

      {displayedStudents.length === 0 && (
        <div className="text-center py-20 text-white/30">
          No students found matching your search.
        </div>
      )}

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 active:scale-95"
          >
            Load More Students
          </button>
        </div>
      )}

      {/* Add Student Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
            >
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-bold mb-6">Add Student</h3>
              
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Name</label>
                  <input 
                    required
                    type="text" 
                    value={newStudent.name}
                    onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Tech Stack (comma separated)</label>
                  <input 
                    required
                    type="text" 
                    value={newStudent.techStack}
                    onChange={e => setNewStudent({...newStudent, techStack: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                    placeholder="React, Node.js, Python"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">GitHub URL</label>
                    <input 
                      type="url" 
                      value={newStudent.github}
                      onChange={e => setNewStudent({...newStudent, github: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={newStudent.linkedin}
                      onChange={e => setNewStudent({...newStudent, linkedin: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Profile Picture</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => setImageFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 border-dashed rounded-lg px-4 py-8 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Upload size={20} />
                      {imageFile ? imageFile.name : "Upload Image (Will implement later)"}
                    </label>
                  </div>
                  <p className="text-[10px] text-white/40 mt-2">
                    Note: File upload to Convex storage will be implemented later. A placeholder will be used for now.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-tech-blue text-black font-bold py-3 rounded-lg mt-4 hover:bg-tech-blue/90 transition-colors"
                >
                  Add to Directory
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
