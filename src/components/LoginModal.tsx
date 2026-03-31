import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useMutation } from "convex/react";
import { anyApi } from "convex/server";
import { useAuth } from '../AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [error, setError] = useState('');
  
  const loginMutation = useMutation(anyApi.auth.login);
  const registerMutation = useMutation(anyApi.auth.register);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        const user = await loginMutation({ username, password });
        login(user);
        onClose();
      } else {
        const user = await registerMutation({ username, password, role });
        login(user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Register'}</h3>
            
            {error && (
              <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Username</label>
                <input 
                  required
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                  placeholder="admin or user1"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Password</label>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Role</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as 'admin' | 'user')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-blue/50"
                  >
                    <option value="user" className="bg-[#111]">User</option>
                    <option value="admin" className="bg-[#111]">Admin</option>
                  </select>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-tech-blue text-black font-bold py-3 rounded-lg mt-4 hover:bg-tech-blue/90 transition-colors"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
              
              <div className="text-center mt-4 text-sm text-white/50">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-tech-blue hover:underline"
                >
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
