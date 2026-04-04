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
      {/* System Status Bar */}
      <div className="mb-12 flex flex-wrap gap-4 items-center justify-between border-b border-cyber-cyan/10 pb-6">
        <div className="flex gap-6 items-center">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">System_Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
              <span className="text-xs font-mono text-cyber-cyan uppercase tracking-tighter">Operational</span>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Active_Nodes</span>
            <span className="text-xs font-mono text-white uppercase tracking-tighter">{students.length} Units</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="hidden sm:flex flex-col">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Data_Stream</span>
            <span className="text-xs font-mono text-cyber-magenta uppercase tracking-tighter animate-pulse">Encrypted</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-4 bg-void-black/50 px-4 py-2 border border-white/5">
          <div className="w-24 h-1 bg-white/5 overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-cyber-cyan/30"
            />
          </div>
          <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">Syncing_Convex_DB</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-12">
        <div className="text-left relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 group"
          >
            <div className="p-1.5 bg-cyber-cyan/10 border border-cyber-cyan/30 group-hover:bg-cyber-cyan/20 transition-colors">
              <Database className="text-cyber-cyan w-4 h-4" />
            </div>
            <span className="text-cyber-cyan font-mono text-xs uppercase tracking-[0.4em]">System.Directory</span>
          </motion.div>
          
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
              Student <span className="text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">Directory</span>
            </h2>
            <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-cyan via-transparent to-transparent opacity-50" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1 h-4 bg-cyber-cyan/20" />
              ))}
            </div>
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">
              Accessing batch records... <span className="text-cyber-cyan">STABLE_CONNECTION_ESTABLISHED</span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-6 w-full lg:w-auto self-end">
          <div className="flex flex-wrap gap-4 justify-end">
            {user?.role === 'admin' && convexStudents !== undefined && convexStudents.length === 0 && (
              <button 
                onClick={handleSeedDatabase}
                disabled={isSeeding}
                className="flex items-center justify-center gap-3 bg-cyber-cyan/5 hover:bg-cyber-cyan/15 text-cyber-cyan px-6 py-3 border border-cyber-cyan/30 disabled:opacity-50 font-mono text-[10px] uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              >
                <Database size={14} />
                {isSeeding ? 'INITIALIZING...' : 'SEED_DATABASE'}
              </button>
            )}
            
            {user?.role === 'admin' && (
              <button 
                onClick={openAddModal}
                className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-3 font-mono text-[10px] uppercase tracking-widest transition-all hover:border-white/40 hover:bg-white/10"
              >
                <Plus size={14} />
                NEW_RECORD
              </button>
            )}
          </div>

          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-0 bg-cyber-cyan/5 opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-cyan/40 group-focus-within:text-cyber-cyan w-4 h-4 transition-colors" />
            <input
              type="text"
              placeholder="SEARCH_QUERY..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(6);
              }}
              className="w-full bg-void-black/80 border border-white/10 rounded-none py-4 pl-12 pr-6 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-cyber-cyan transition-all uppercase tracking-widest"
            />
            <div className="absolute bottom-0 left-0 h-[1px] bg-cyber-cyan w-0 group-focus-within:w-full transition-all duration-500" />
          </div>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-10"
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
        <div className="text-center py-24 bg-void-black/40 border border-cyber-magenta/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCBMIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDAsIDk2LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-20" />
          <div className="relative z-10">
            <div className="inline-block p-4 border border-cyber-magenta/30 mb-6">
              <X className="text-cyber-magenta w-8 h-8 mx-auto" />
            </div>
            <p className="text-cyber-magenta font-mono text-sm uppercase tracking-[0.5em] animate-pulse mb-2">
              {convexStudents.length === 0 
                ? "ERR: DATABASE_EMPTY"
                : "ERR: NO_MATCHING_RECORDS"}
            </p>
            <p className="text-white/20 font-mono text-[10px] uppercase tracking-widest">
              System_Search_Returned_Null_Result
            </p>
          </div>
        </div>
      )}

      {hasMore && convexStudents !== undefined && (
        <div className="mt-24 flex justify-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="relative group px-16 py-5 bg-void-black border border-cyber-cyan/30 overflow-hidden transition-all hover:border-cyber-cyan"
          >
            <div className="absolute inset-0 bg-cyber-cyan/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-cyber-cyan group-hover:animate-ping" />
                <div className="w-1 h-1 bg-cyber-cyan group-hover:animate-ping [animation-delay:0.2s]" />
              </div>
              <span className="text-cyber-cyan font-mono text-xs uppercase tracking-[0.4em]">Load_More_Nodes</span>
              <div className="text-[8px] font-mono text-white/20 group-hover:text-cyber-cyan/50 transition-colors">
                [+6_UNITS]
              </div>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-black/90 backdrop-blur-md scanlines"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-void-black border border-cyber-cyan/50 p-8 w-full max-w-md relative shadow-[0_0_30px_rgba(0,240,255,0.2)] max-h-[90vh] overflow-y-auto"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-cyan" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan" />

              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-cyber-cyan/50 hover:text-cyber-cyan transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-black uppercase tracking-widest mb-8 text-white drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                {editingStudent ? 'Edit_Record' : 'New_Record'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono text-cyber-cyan mb-2 uppercase tracking-[0.2em]">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-void-black border border-cyber-cyan/30 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all placeholder-white/20"
                    placeholder="INPUT_NAME"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-cyber-cyan mb-2 uppercase tracking-[0.2em]">Tech Stack (CSV)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.techStack}
                    onChange={e => setFormData({...formData, techStack: e.target.value})}
                    className="w-full bg-void-black border border-cyber-cyan/30 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all placeholder-white/20"
                    placeholder="REACT, NODE, PYTHON"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-cyber-cyan mb-2 uppercase tracking-[0.2em]">GitHub URL</label>
                    <input 
                      type="url" 
                      value={formData.github}
                      onChange={e => setFormData({...formData, github: e.target.value})}
                      className="w-full bg-void-black border border-cyber-cyan/30 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all placeholder-white/20"
                      placeholder="HTTPS://..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-cyber-cyan mb-2 uppercase tracking-[0.2em]">LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={formData.linkedin}
                      onChange={e => setFormData({...formData, linkedin: e.target.value})}
                      className="w-full bg-void-black border border-cyber-cyan/30 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all placeholder-white/20"
                      placeholder="HTTPS://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-cyber-cyan mb-2 uppercase tracking-[0.2em]">Profile Image</label>
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
                      className="flex flex-col items-center justify-center gap-3 w-full bg-void-black border border-cyber-cyan/30 border-dashed py-8 text-cyber-cyan/60 hover:text-cyber-cyan hover:bg-cyber-cyan/5 transition-all cursor-pointer font-mono text-xs uppercase tracking-widest"
                    >
                      <Upload size={20} />
                      {imageFile ? imageFile.name : (editingStudent ? "UPDATE_IMAGE" : "UPLOAD_IMAGE")}
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-cyber-cyan text-void-black font-black py-4 mt-4 hover:bg-white transition-colors uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,255,0.4)] disabled:opacity-50"
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
        className="w-full relative group"
      >
        {/* Outer Frame Brackets */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyber-cyan/30 group-hover:border-cyber-cyan transition-colors" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyber-cyan/30 group-hover:border-cyber-cyan transition-colors" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyber-cyan/30 group-hover:border-cyber-cyan transition-colors" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyber-cyan/30 group-hover:border-cyber-cyan transition-colors" />

        <div className="relative overflow-hidden bg-void-black/90 border border-cyber-cyan/20 group-hover:border-cyber-cyan/60 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]">
          
          {/* Scanning Line Animation */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-cyber-cyan/40 shadow-[0_0_15px_rgba(0,255,255,0.8)] z-30"
            />
          </div>

          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <motion.img 
              src={student.image} 
              alt={student.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-transparent opacity-80" />
            
            {/* HUD Overlay Elements */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-pulse" />
                <span className="text-[8px] font-mono text-cyber-cyan uppercase tracking-widest">Signal_Active</span>
              </div>
              <div className="text-[10px] font-mono text-white/40 uppercase">ID_{student._id?.slice(-6) || "000000"}</div>
            </div>

            <div className="absolute top-4 right-4 text-right">
              <div className="text-[8px] font-mono text-cyber-magenta uppercase tracking-widest mb-1">Core_Sync</div>
              <div className="text-xs font-mono text-white font-bold">98.4%</div>
            </div>

            {/* Biometric Data Grid */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <div className="h-1 w-12 bg-white/10 overflow-hidden">
                  <motion.div 
                    animate={{ width: ["20%", "80%", "40%", "90%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-full bg-cyber-cyan"
                  />
                </div>
                <div className="h-1 w-8 bg-white/10 overflow-hidden">
                  <motion.div 
                    animate={{ width: ["60%", "30%", "70%", "50%"] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="h-full bg-cyber-magenta"
                  />
                </div>
              </div>
              <div className="text-[8px] font-mono text-white/30 uppercase tracking-tighter">
                LAT: 40.7128<br/>
                LNG: -74.0060
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-cyber-cyan transition-colors drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]">
                  {student.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-[1px] bg-cyber-cyan" />
                  <span className="text-[9px] font-mono text-cyber-cyan/70 uppercase tracking-[0.2em]">Developer_Class_27</span>
                </div>
              </div>

              <div className="flex gap-3">
                {student.github && (
                  <a href={student.github} target="_blank" rel="noreferrer" className="text-white/30 hover:text-cyber-cyan transition-all hover:scale-110">
                    <Github size={16} />
                  </a>
                )}
                {student.linkedin && (
                  <a href={student.linkedin} target="_blank" rel="noreferrer" className="text-white/30 hover:text-cyber-cyan transition-all hover:scale-110">
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {student.techStack.slice(0, 3).map((tech: string) => (
                <div key={tech} className="relative group/tag">
                  <span className="text-[9px] font-mono font-bold text-white/50 uppercase tracking-widest px-2 py-1 border border-white/10 group-hover:border-cyber-cyan/50 group-hover:text-cyber-cyan transition-all block">
                    {tech}
                  </span>
                  <div className="absolute -bottom-[1px] left-0 w-0 h-[1px] bg-cyber-cyan group-hover/tag:w-full transition-all duration-300" />
                </div>
              ))}
              {student.techStack.length > 3 && (
                <span className="text-[9px] font-mono text-white/20 uppercase px-2 py-1">
                  +{student.techStack.length - 3}
                </span>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <div className="flex gap-2">
                {user?.role === 'user' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePhotoUploadClick(student._id);
                    }}
                    className="text-cyber-cyan/40 hover:text-cyber-cyan transition-colors"
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
                    className="text-cyber-magenta/40 hover:text-cyber-magenta transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                )}
              </div>
              <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
                System_Verified
              </div>
            </div>
          </div>

          {/* Decorative Corner Accent */}
          <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute bottom-[-20px] right-[-20px] w-16 h-16 border border-cyber-cyan rotate-45" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
