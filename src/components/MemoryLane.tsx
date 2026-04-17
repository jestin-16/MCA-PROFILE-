import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMORIES } from '../constants';
import { Sparkles, Plus, X, Upload, Link, FileImage } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '../AuthContext';

const getGridItemClass = (index: number) => {
  const classes = [
    "md:col-span-8 md:row-span-2", // Large hero
    "md:col-span-4 md:row-span-1", // Small side
    "md:col-span-4 md:row-span-1", // Small side
    "md:col-span-4 md:row-span-2", // Tall left
    "md:col-span-8 md:row-span-1", // Wide right
    "md:col-span-5 md:row-span-2", // Medium tall
    "md:col-span-7 md:row-span-1", // Medium wide
    "md:col-span-3 md:row-span-1", // Small
    "md:col-span-4 md:row-span-1", // Small
  ];
  return classes[index % classes.length];
};

export const MemoryLane: React.FC = () => {
  const { user } = useAuth();
  const dbMemories = useQuery(api.memories.get);
  const addMemory = useMutation(api.memories.add);
  
  const [isAdding, setIsAdding] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('file');
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [fileName, setFileName] = useState('');

  // Use DB memories if available, otherwise fallback to constants
  const displayMemories = dbMemories && dbMemories.length > 0 ? dbMemories : MEMORIES;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800; // Limit size to prevent DB payload too large
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setNewUrl(dataUrl);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newCaption) return;
    
    try {
      await addMemory({
        url: newUrl,
        caption: newCaption,
        type: 'image'
      });
      setIsAdding(false);
      setNewUrl('');
      setNewCaption('');
      setFileName('');
    } catch (error) {
      console.error("Failed to add memory:", error);
    }
  };

  return (
    <section id="memories" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="text-atmos-accent w-4 h-4 opacity-70" />
                <span className="font-sans text-xs tracking-widest text-atmos-accent/80 uppercase">Moments Captured</span>
              </div>
              <h2 className="title-serif text-5xl md:text-7xl mb-4 text-white">
                Memory <span className="text-atmos-accent italic">Fragments</span>
              </h2>
              <p className="font-sans text-white/50 text-sm tracking-wide max-w-2xl font-light">
                A visual journey through time, preserving moments of collaboration, learning, and shared experiences in an atmospheric gallery.
              </p>
            </motion.div>
          </div>

          {user?.role === 'admin' && (
            <button
              onClick={() => setIsAdding(true)}
              className="glass-button flex items-center gap-2"
            >
              <Plus size={16} /> Add Fragment
            </button>
          )}
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 overflow-hidden"
            >
              <div className="glass-panel p-8 relative max-w-2xl">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <h3 className="title-serif text-3xl mb-6 text-white flex items-center gap-3">
                  <Upload size={24} className="text-atmos-accent" /> New Memory Fragment
                </h3>
                <form onSubmit={handleAddSubmit} className="space-y-6">
                  <div className="flex gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => { setUploadMethod('file'); setNewUrl(''); setFileName(''); }}
                      className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all ${uploadMethod === 'file' ? 'bg-atmos-accent text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      <FileImage size={18} /> Upload Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => { setUploadMethod('url'); setNewUrl(''); setFileName(''); }}
                      className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all ${uploadMethod === 'url' ? 'bg-atmos-accent text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      <Link size={18} /> Paste URL
                    </button>
                  </div>
                  
                  {uploadMethod === 'url' ? (
                    <div>
                      <label className="block text-xs font-sans text-white/60 mb-2 font-medium">Image URL</label>
                      <input
                        type="url"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-atmos-accent/50 transition-all font-light"
                        required
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-sans text-white/60 mb-2 font-medium">Select Photo</label>
                      <label className="w-full flex-col bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-8 text-white hover:border-atmos-accent/50 transition-all font-light flex items-center justify-center cursor-pointer hover:bg-white/10">
                        <Upload size={24} className="mb-2 text-white/40" />
                        <span className="text-sm font-medium">{fileName || "Click to browse"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          required={!newUrl}
                        />
                      </label>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-sans text-white/60 mb-2 font-medium">Caption</label>
                    <input
                      type="text"
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      placeholder="Enter a meaningful description..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-atmos-accent/50 transition-all font-light"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-white text-atmos-bg font-medium px-8 py-3 rounded-xl hover:bg-atmos-accent hover:text-white transition-colors"
                  >
                    Save Memory
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[250px] gap-6 md:grid-flow-dense">
          {displayMemories.map((memory: any, index: number) => {
            const id = memory._id || memory.id;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (index % 5) * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors duration-500 ${getGridItemClass(index)}`}
              >
                <img
                  src={memory.url}
                  alt={memory.caption}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:blur-[2px] opacity-80 group-hover:opacity-60"
                  referrerPolicy="no-referrer"
                />
                
                {/* Smooth Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-atmos-bg/90 via-atmos-bg/20 to-transparent transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 z-10 flex flex-col justify-end pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <p className="title-serif text-xl md:text-3xl font-light text-white leading-tight">
                      {memory.caption}
                    </p>
                    <div className="mt-4 w-12 h-px bg-atmos-accent/60" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

