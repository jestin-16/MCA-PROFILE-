import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { Search, Github, Linkedin, Twitter, Database, Plus, X, Upload, Camera, Edit2 } from 'lucide-react';
import { STUDENTS as FALLBACK_STUDENTS } from '../constants';
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
    <section ref={containerRef} id="directory" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
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
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
            <h2 className="text-sm font-mono tracking-[0.3em] text-cyber-cyan uppercase">
              Database.Query
            </h2>
          </motion.div>
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase"
          >
            Student <span className="text-cyber-cyan">Directory</span>
          </motion.h2>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {user?.role === 'admin' && convexStudents !== undefined && convexStudents.length === 0 && (
            <button 
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="flex items-center justify-center gap-2 bg-cyber-cyan/10 hover:bg-cyber-cyan/20 text-cyber-cyan px-4 py-3 rounded-none border border-cyber-cyan/30 disabled:opacity-50 font-mono text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <Database size={14} />
              {isSeeding ? 'INIT...' : 'SEED_DB'}
            </button>
          )}
          
          {user?.role === 'admin' && (
            <button 
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-none border border-white/20 font-mono text-xs uppercase tracking-widest transition-all"
            >
              <Plus size={14} />
              ADD_RECORD
            </button>
          )}

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-cyan w-4 h-4" />
            <input
              type="text"
              placeholder="SEARCH_QUERY..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(6); // Reset pagination on search
              }}
              className="w-full bg-void-black/50 border border-cyber-cyan/30 rounded-none py-3 pl-12 pr-6 text-xs font-mono text-cyber-cyan placeholder:text-cyber-cyan/30 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all uppercase"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyber-cyan scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left" />
          </div>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10"
      >
        {convexStudents === undefined ? (
          <div className="col-span-full flex justify-center items-center py-20 w-full">
            <div className="w-12 h-12 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(0,240,255,0.5)]"></div>
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
        <div className="text-center py-20 text-cyber-cyan/50 font-mono text-sm uppercase tracking-widest">
          {convexStudents.length === 0 
            ? "ERR: DATABASE_EMPTY. AWAITING_SEED."
            : "ERR: NO_RECORDS_FOUND."}
        </div>
      )}

      {hasMore && convexStudents !== undefined && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="px-8 py-3 bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/50 text-cyber-cyan font-mono text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] relative overflow-hidden group"
          >
            <span className="relative z-10">LOAD_MORE</span>
            <div className="absolute inset-0 bg-cyber-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-void-black border border-cyber-cyan/50 p-6 w-full max-w-md relative shadow-[0_0_30px_rgba(0,240,255,0.2)] max-h-[90vh] overflow-y-auto scanlines"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-cyber-cyan/50 hover:text-cyber-cyan transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-mono font-bold mb-6 text-cyber-cyan uppercase tracking-widest">
                {editingStudent ? 'EDIT_RECORD' : 'NEW_RECORD'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-[10px] font-mono text-cyber-cyan/70 mb-1 uppercase tracking-widest">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-cyber-cyan/5 border border-cyber-cyan/30 rounded-none px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    placeholder="JOHN_DOE"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-cyber-cyan/70 mb-1 uppercase tracking-widest">Tech Stack (CSV)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.techStack}
                    onChange={e => setFormData({...formData, techStack: e.target.value})}
                    className="w-full bg-cyber-cyan/5 border border-cyber-cyan/30 rounded-none px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    placeholder="REACT, NODE, PYTHON"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-cyber-cyan/70 mb-1 uppercase tracking-widest">GitHub URL</label>
                    <input 
                      type="url" 
                      value={formData.github}
                      onChange={e => setFormData({...formData, github: e.target.value})}
                      className="w-full bg-cyber-cyan/5 border border-cyber-cyan/30 rounded-none px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                      placeholder="HTTPS://..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-cyber-cyan/70 mb-1 uppercase tracking-widest">LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={formData.linkedin}
                      onChange={e => setFormData({...formData, linkedin: e.target.value})}
                      className="w-full bg-cyber-cyan/5 border border-cyber-cyan/30 rounded-none px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                      placeholder="HTTPS://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-cyber-cyan/70 mb-1 uppercase tracking-widest">Profile Image</label>
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
                      className="flex items-center justify-center gap-2 w-full bg-cyber-cyan/5 border border-cyber-cyan/30 border-dashed rounded-none px-4 py-8 text-cyber-cyan/60 hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors cursor-pointer font-mono text-xs uppercase tracking-widest"
                    >
                      <Upload size={16} />
                      {imageFile ? imageFile.name : (editingStudent ? "UPLOAD_NEW (OPTIONAL)" : "UPLOAD_IMAGE")}
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-cyber-cyan text-void-black font-mono font-bold py-3 uppercase tracking-widest mt-4 hover:bg-white transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  {isUploading ? 'PROCESSING...' : (editingStudent ? 'UPDATE_RECORD' : 'INSERT_RECORD')}
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
        <div className="holo-card group flex flex-col h-[400px] border border-cyber-cyan/20 hover:border-cyber-cyan/80 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] bg-void-black/80">
          
          {/* Holographic Glare Effect */}
          <motion.div 
            className="absolute inset-0 z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 mix-blend-overlay"
            style={{
              background: useMotionTemplate`radial-gradient(
                circle at ${useTransform(x, [-0.5, 0.5], [0, 100])}% ${useTransform(y, [-0.5, 0.5], [0, 100])}%, 
                rgba(255,255,255,0.8) 0%, 
                rgba(0,240,255,0.4) 20%, 
                rgba(176,38,255,0.2) 40%, 
                transparent 60%
              )`
            }}
          />

          {/* Image Section */}
          <div className="w-full h-[60%] relative overflow-hidden border-b border-cyber-cyan/20">
            <motion.img 
              src={student.image} 
              alt={student.name} 
              style={{ transform: "translateZ(20px) scale(1.1)" }}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal"
              referrerPolicy="no-referrer"
            />
            {/* Scanline overlay on image */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-50 mix-blend-overlay pointer-events-none" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/20 to-transparent opacity-90" />
            
            {/* ID Badge Overlay */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-void-black/80 border border-cyber-cyan/50 text-[10px] font-mono text-cyber-cyan uppercase tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              ID:{student._id?.slice(-6) || "000000"}
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-cyan/50" />
          </div>

          {/* Content Section */}
          <motion.div 
            style={{ transform: "translateZ(40px)" }}
            className="p-5 flex flex-col justify-between flex-1 relative z-10 bg-void-black/90"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-xl tracking-tight text-white uppercase leading-none mb-1 group-hover:text-cyber-cyan transition-colors duration-300 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
                    {student.name}
                  </h3>
                  <p className="text-[10px] text-cyber-purple uppercase tracking-[0.2em] font-mono font-bold">
                    CLASS_27 // MCA
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-2">
                  {student.github && (
                    <a href={student.github} target="_blank" rel="noreferrer" className="text-cyber-cyan/50 hover:text-cyber-cyan transition-colors hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">
                      <Github size={16} />
                    </a>
                  )}
                  {student.linkedin && (
                    <a href={student.linkedin} target="_blank" rel="noreferrer" className="text-cyber-cyan/50 hover:text-cyber-cyan transition-colors hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {student.twitter && (
                    <a href={student.twitter} target="_blank" rel="noreferrer" className="text-cyber-cyan/50 hover:text-cyber-cyan transition-colors hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">
                      <Twitter size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {student.techStack.slice(0, 4).map((tech: string) => (
                  <span 
                    key={tech} 
                    className="text-[9px] uppercase font-mono tracking-widest px-2 py-1 bg-cyber-cyan/5 text-cyber-cyan/80 border border-cyber-cyan/20 group-hover:border-cyber-cyan/50 group-hover:text-cyber-cyan transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                {student.techStack.length > 4 && (
                  <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-1 bg-void-black text-cyber-cyan/40 border border-cyber-cyan/10">
                    +{student.techStack.length - 4}
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
                className="bg-void-black/80 p-2 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 hover:border-cyber-cyan transition-colors flex items-center shadow-[0_0_10px_rgba(0,240,255,0.2)]"
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
                className="bg-void-black/80 p-2 border border-cyber-magenta/30 text-cyber-magenta hover:bg-cyber-magenta/20 hover:border-cyber-magenta transition-colors flex items-center shadow-[0_0_10px_rgba(255,0,60,0.2)]"
                title="Edit Student"
              >
                <Edit2 size={14} />
              </button>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>
    </motion.div>
  );
};
