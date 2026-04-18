import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, KeyRound } from 'lucide-react';
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
      setError(err.message || "Authentication failed. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-atmos-bg/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="glass-panel p-8 md:p-10 w-full max-w-md relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center gap-3 mb-10 text-center mt-2">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-2">
                <KeyRound className="text-atmos-accent w-6 h-6" />
              </div>
              <h3 className="title-serif text-3xl text-white">Sign In</h3>
              <p className="text-white/50 text-sm font-sans font-light">Access your MCA student profile</p>
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 mb-6 text-sm font-sans flex items-center gap-3 rounded-xl font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-sans text-white/60 mb-2 font-medium">Username</label>
                <input 
                  required
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-atmos-accent/50 transition-all font-light placeholder-white/30"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-white/60 mb-2 font-medium">Password</label>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-atmos-accent/50 transition-all font-light placeholder-white/30"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-atmos-bg font-medium py-3 rounded-xl hover:bg-atmos-accent hover:text-white transition-colors flex items-center justify-center gap-2 group mt-8"
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
