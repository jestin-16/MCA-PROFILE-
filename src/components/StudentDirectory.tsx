import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { Search, Github, Linkedin, Twitter, Database, Plus, X, Upload, Camera, Edit2 } from 'lucide-react';
import { STUDENTS as FALLBACK_STUDENTS } from '../constants';
import { GlassCard } from './GlassCard';
import { useQuery, useMutation } from "convex/react";
import { anyApi } from "convex/server";
import { useAuth } from '../AuthContext';

export const StudentDirectory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadingStudentId, setUploadingStudentId] = useState<string | null>(null);
  
  const { user } = useAuth();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const [formData, setFormData] = useState({
    name: '',
    techStack: '',
    github: '',
    linkedin: '',
    twitter: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Fetch from Convex
  const convexStudents = useQuery(anyApi.students.get);
  const addStudent = useMutation(anyApi.students.add);
  const editStudent = useMutation(anyApi.students.edit);
  const updateImage = useMutation(anyApi.students.updateImage);
  const generateUploadUrl = useMutation(anyApi.students.generateUploadUrl);
  
  const students = convexStudents || [];

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

  const openAddModal = () => {
    setEditingStudent(null);
    setFormData({ name: '', techStack: '', github: '', linkedin: '', twitter: '' });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student: any) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      techStack: student.techStack.join(', '),
      github: student.github || '',
      linkedin: student.linkedin || '',
      twitter: student.twitter || '',
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      let storageId: string | undefined = undefined;

      if (imageFile) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });
        const json = await result.json();
        storageId = json.storageId;
      }

      const studentData = {
        name: formData.name,
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
        github: formData.github || undefined,
        linkedin: formData.linkedin || undefined,
        twitter: formData.twitter || undefined,
        storageId,
      };

      if (editingStudent) {
        await editStudent({
          id: editingStudent._id,
          ...studentData,
        });
      } else {
        // Fallback image if no file selected
        const imageUrl = storageId ? undefined : `https://picsum.photos/seed/${formData.name || 'new'}/400/400`;
        await addStudent({
          ...studentData,
          image: imageUrl,
        });
      }

      setIsModalOpen(false);
      setFormData({ name: '', techStack: '', github: '', linkedin: '', twitter: '' });
      setImageFile(null);
      setEditingStudent(null);
    } catch (error) {
      console.error("Failed to save student:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoUploadClick = (studentId: string) => {
    setUploadingStudentId(studentId);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingStudentId) return;

    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();
      
      await updateImage({ id: uploadingStudentId as any, storageId });
    } catch (error) {
      console.error("Failed to update image:", error);
    } finally {
      setUploadingStudentId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const randomOrderRef = React.useRef<Record<string, number>>({});

  const sortedStudents = React.useMemo(() => {
    if (!students) return [];
    
    let result = [...students];
    
    // Assign a stable random sort value for each student
    result.forEach(s => {
      if (randomOrderRef.current[s._id] === undefined) {
        randomOrderRef.current[s._id] = Math.random();
      }
    });
    
    if (search) {
      result = result.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Sort randomly but stably, always keeping Jestin first
    result.sort((a, b) => {
      const isAJestin = a.name.toLowerCase().includes('jestin');
      const isBJestin = b.name.toLowerCase().includes('jestin');
      
      if (isAJestin && !isBJestin) return -1;
      if (!isAJestin && isBJestin) return 1;
      
      return randomOrderRef.current[a._id] - randomOrderRef.current[b._id];
    });

    return result;
  }, [students, search]);

  const displayedStudents = sortedStudents.slice(0, visibleCount);
  const hasMore = visibleCount < sortedStudents.length;

  return (
    <section ref={containerRef} id="directory" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
            className="text-4xl font-bold tracking-tight mb-2"
          >
            Student Directory
          </motion.h2>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
            className="text-white/50"
          >
            Meet the brilliant minds of the 2025-2027 batch.
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {user?.role === 'admin' && convexStudents !== undefined && convexStudents.length === 0 && (
            <button 
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="flex items-center justify-center gap-2 bg-tech-blue/20 hover:bg-tech-blue/30 text-tech-blue px-4 py-3 rounded-full transition-colors border border-tech-blue/30 disabled:opacity-50"
            >
              <Database size={16} />
              {isSeeding ? 'Seeding...' : 'Seed Convex DB'}
            </button>
          )}
          
          {user?.role === 'admin' && (
            <button 
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-full transition-colors border border-white/10"
            >
              <Plus size={16} />
              Add Student
            </button>
          )}

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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-10"
      >
        {convexStudents === undefined ? (
          <div className="col-span-full flex justify-center items-center py-20 w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-blue"></div>
          </div>
        ) : (
          <AnimatePresence mode='popLayout'>
            {displayedStudents.map((student, index) => (
              <StudentCard 
                key={student._id || student.id} 
                student={student} 
                index={index} 
                user={user} 
                handlePhotoUploadClick={handlePhotoUploadClick} 
                openEditModal={openEditModal} 
              />
            ))}
          </AnimatePresence>
        )}
      </motion.div>

      {convexStudents !== undefined && displayedStudents.length === 0 && (
        <div className="text-center py-20 text-white/30">
          {convexStudents.length === 0 
            ? "Database is empty. Click 'Seed Convex DB' to populate."
            : "No students found matching your search."}
        </div>
      )}

      {hasMore && convexStudents !== undefined && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 active:scale-95"
          >
            Load More Students
          </button>
        </div>
      )}

      {/* Hidden file input for user photo upload */}
      <input 
        type="file" 
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Add/Edit Student Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-bold mb-6">{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Tech Stack (comma separated)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.techStack}
                    onChange={e => setFormData({...formData, techStack: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                    placeholder="React, Node.js, Python"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">GitHub URL</label>
                    <input 
                      type="url" 
                      value={formData.github}
                      onChange={e => setFormData({...formData, github: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={formData.linkedin}
                      onChange={e => setFormData({...formData, linkedin: e.target.value})}
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
                      {imageFile ? imageFile.name : (editingStudent ? "Upload New Image (Optional)" : "Upload Image")}
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-tech-blue text-black font-bold py-3 rounded-lg mt-4 hover:bg-tech-blue/90 transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Saving...' : (editingStudent ? 'Save Changes' : 'Add to Directory')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const StudentCard = ({ student, index, user, handlePhotoUploadClick, openEditModal }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="w-full perspective-1000"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="w-full relative z-20"
      >
        <GlassCard className="group relative overflow-hidden p-0 flex flex-col sm:flex-row h-auto sm:h-48 border border-white/10 hover:border-tech-blue/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] bg-[#050505]/80 backdrop-blur-xl">
          
          {/* Holographic Glare Effect */}
          <motion.div 
            className="absolute inset-0 z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 mix-blend-overlay"
            style={{
              background: useMotionTemplate`radial-gradient(
                circle at ${useTransform(x, [-0.5, 0.5], [0, 100])}% ${useTransform(y, [-0.5, 0.5], [0, 100])}%, 
                rgba(255,255,255,0.4) 0%, 
                rgba(0,210,255,0.2) 20%, 
                rgba(255,0,255,0.1) 40%, 
                transparent 60%
              )`
            }}
          />

          {/* Image Section */}
          <div className="w-full sm:w-48 h-48 sm:h-full relative shrink-0 overflow-hidden">
            <motion.img 
              src={student.image} 
              alt={student.name} 
              style={{ transform: "translateZ(10px) scale(1.05)" }}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 md:grayscale-[0.4] md:group-hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            {/* Gradient fade into content */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-[#050505]/50 to-[#050505] opacity-90" />
            
            {/* ID Badge Overlay */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-tech-blue/20 backdrop-blur-md border border-tech-blue/30 rounded text-[8px] font-mono text-tech-blue uppercase tracking-widest">
              ID: {student._id?.slice(-6) || "000000"}
            </div>
          </div>

          {/* Content Section */}
          <motion.div 
            style={{ transform: "translateZ(30px)" }}
            className="p-5 flex flex-col justify-between flex-1 relative z-10 -mt-12 sm:mt-0"
          >
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-2xl tracking-tight text-white uppercase leading-none mb-1 group-hover:text-tech-blue transition-colors duration-300">
                    {student.name}
                  </h3>
                  <p className="text-xs text-tech-blue/80 uppercase tracking-widest font-mono font-semibold mb-4">
                    MCA '27
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-2">
                  {student.github && (
                    <a href={student.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors p-1.5 bg-white/5 rounded-full hover:bg-white/10">
                      <Github size={14} />
                    </a>
                  )}
                  {student.linkedin && (
                    <a href={student.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#0A66C2] transition-colors p-1.5 bg-white/5 rounded-full hover:bg-white/10">
                      <Linkedin size={14} />
                    </a>
                  )}
                  {student.twitter && (
                    <a href={student.twitter} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#1DA1F2] transition-colors p-1.5 bg-white/5 rounded-full hover:bg-white/10">
                      <Twitter size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {student.techStack.slice(0, 5).map((tech: string) => (
                  <span 
                    key={tech} 
                    className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-white/5 text-white/70 border border-white/10 group-hover:border-tech-blue/30 group-hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                {student.techStack.length > 5 && (
                  <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-white/5 text-white/40 border border-white/5">
                    +{student.techStack.length - 5}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="absolute bottom-3 right-3 flex gap-2 z-30">
            {user?.role === 'user' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePhotoUploadClick(student._id);
                }}
                className="bg-black/50 hover:bg-black/80 backdrop-blur-md p-1.5 rounded border border-white/20 text-white transition-colors flex items-center"
                title="Update Photo"
              >
                <Camera size={14} />
              </button>
            )}
            {user?.role === 'admin' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(student);
                }}
                className="bg-tech-blue/20 hover:bg-tech-blue/40 backdrop-blur-md p-1.5 rounded border border-tech-blue/30 text-tech-blue transition-colors flex items-center"
                title="Edit Student"
              >
                <Edit2 size={14} />
              </button>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-tech-blue/5 blur-2xl rounded-full group-hover:bg-tech-blue/20 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-b from-tech-blue/0 via-tech-blue/50 to-tech-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};
