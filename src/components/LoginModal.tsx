import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert } from 'lucide-react';
import { useMutation } from "convex/react";
import { anyApi } from "convex/server";
import { useAuth } from '../AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const loginMutation = useMutation(anyApi.auth.login);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const user = await loginMutation({ username, password });
      login(user);
      onClose();
    } catch (err: any) {
      setError(err.message || "AUTHENTICATION_FAILED");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-void-black border border-cyber-cyan/50 p-8 w-full max-w-md relative shadow-[0_0_30px_rgba(0,255,255,0.2)]"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-cyan" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan" />

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-cyber-cyan/50 hover:text-cyber-cyan transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-8">
              <ShieldAlert className="text-cyber-cyan w-6 h-6" />
              <h3 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">Auth_Req</h3>
            </div>
            
            {error && (
              <div className="bg-cyber-magenta/10 border border-cyber-magenta text-cyber-magenta p-3 mb-6 text-xs font-mono uppercase tracking-widest flex items-center gap-2 shadow-[0_0_10px_rgba(255,0,60,0.2)]">
                <span className="w-2 h-2 bg-cyber-magenta animate-pulse" />
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-mono text-cyber-cyan mb-2 uppercase tracking-[0.2em]">Username</label>
                <input 
                  required
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-void-black border border-cyber-cyan/30 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all placeholder-white/20"
                  placeholder="INPUT_ID"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-cyber-cyan mb-2 uppercase tracking-[0.2em]">Password</label>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-void-black border border-cyber-cyan/30 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all placeholder-white/20"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-cyber-cyan text-void-black font-black py-4 mt-8 hover:bg-white transition-colors uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,255,0.4)] flex items-center justify-center gap-2 group"
              >
                Authenticate
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
