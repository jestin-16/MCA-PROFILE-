import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Github, Linkedin, Plus, X, Upload, Camera, Edit2 } from 'lucide-react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-12">
        <div className="text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="title-serif text-5xl md:text-7xl mb-4">
              Student <span className="text-atmos-accent">Directory</span>
            </h2>
            <p className="font-sans text-white/50 text-sm tracking-wide">
              Showcasing the minds and works of the MCA Regular batch.
            </p>
          </motion.div>
        </div>
        
        <div className="flex flex-col gap-6 w-full lg:w-96 self-end">
          <div className="flex flex-wrap gap-4 justify-end">
            {user?.role === 'admin' && convexStudents !== undefined && convexStudents.length === 0 && (
              <button 
                onClick={handleSeedDatabase}
                disabled={isSeeding}
                className="glass-button"
              >
                {isSeeding ? 'Initializing...' : 'Seed Database'}
              </button>
            )}
            
            {user?.role === 'admin' && (
              <button 
                onClick={openAddModal}
                className="glass-button flex items-center gap-2"
              >
                <Plus size={14} /> Add Student
              </button>
            )}
          </div>

          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-atmos-accent transition-colors w-5 h-5" />
            <input
              type="text"
              placeholder="Search directory..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(6);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm font-sans text-white focus:outline-none focus:border-atmos-accent/50 transition-all font-light"
            />
          </div>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10"
      >
        {convexStudents === undefined ? (
          <div className="col-span-full flex justify-center py-20 w-full">
            <div className="w-8 h-8 rounded-full border border-t-atmos-accent border-white/10 animate-spin" />
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
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <Search className="w-12 h-12 text-white/10 mb-4" />
          <h3 className="font-serif text-2xl text-white/60 mb-2">No students found</h3>
          <p className="font-sans text-sm text-white/30">Adjust your search parameters to try again.</p>
        </div>
      )}

      {hasMore && convexStudents !== undefined && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="glass-button px-10"
          >
            Load More
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-atmos-bg/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-panel p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>
              
              <h3 className="title-serif text-3xl mb-8 text-white">
                {editingStudent ? 'Edit Profile' : 'New Profile'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-sans text-white/60 mb-2 font-medium">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-atmos-accent/50 transition-all font-light"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-white/60 mb-2 font-medium">Tech Stack (CSV)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.techStack}
                    onChange={e => setFormData({...formData, techStack: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-atmos-accent/50 transition-all font-light"
                    placeholder="React, Node, Python"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans text-white/60 mb-2 font-medium">GitHub URL</label>
                    <input 
                      type="url" 
                      value={formData.github}
                      onChange={e => setFormData({...formData, github: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-atmos-accent/50 transition-all font-light"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-white/60 mb-2 font-medium">LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={formData.linkedin}
                      onChange={e => setFormData({...formData, linkedin: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-atmos-accent/50 transition-all font-light"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans text-white/60 mb-2 font-medium">Profile Image</label>
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
                      className="flex flex-col items-center justify-center gap-3 w-full bg-white/5 border border-white/10 border-dashed rounded-xl py-8 text-white/60 hover:text-white hover:border-atmos-accent/50 transition-all cursor-pointer text-sm font-light"
                    >
                      <Upload size={20} />
                      {imageFile ? imageFile.name : (editingStudent ? "Select new image" : "Upload image")}
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-white text-atmos-bg font-medium py-3 rounded-xl hover:bg-atmos-accent hover:text-white transition-colors"
                >
                  {isUploading ? 'Processing...' : (editingStudent ? 'Save Changes' : 'Create Profile')}
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
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
      className="glass-panel overflow-hidden group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img 
          src={student.image} 
          alt={student.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-atmos-bg via-atmos-bg/20 to-transparent opacity-80" />
        
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
          <h3 className="title-serif text-2xl group-hover:text-atmos-accent transition-colors">
            {student.name}
          </h3>
          <div className="flex gap-3">
            {student.github && (
              <a href={student.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Github size={18} />
              </a>
            )}
            {student.linkedin && (
              <a href={student.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {student.techStack.map((tech: string, i: number) => (
            <span key={i} className="text-[11px] font-sans text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1">
              {tech}
            </span>
          ))}
        </div>

        {(user?.role === 'user' || user?.role === 'admin') && (
          <div className="flex justify-end items-center pt-4 border-t border-white/5 gap-3">
            {user?.role === 'user' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePhotoUploadClick(student._id);
                }}
                className="text-white/40 hover:text-white transition-colors p-2"
                title="Update Photo"
              >
                <Camera size={16} />
              </button>
            )}
            {user?.role === 'admin' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(student);
                }}
                className="text-white/40 hover:text-white transition-colors p-2"
                title="Edit Profile"
              >
                <Edit2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

