import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../AuthContext';
import { LogIn, LogOut, User } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'DIR', href: '#directory' },
    { name: 'MEM', href: '#memories' },
    { name: 'PRJ', href: '#projects' },
    { name: 'WALL', href: '#wall' },
  ];

  return (
    <nav className={cn(
      "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-5xl rounded-full px-6 py-3",
      isScrolled ? "glass-panel neon-border" : "bg-transparent"
    )}>
      <div className="flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-widest flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-void-black border border-cyber-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center text-cyber-cyan text-xs font-mono">
            MCA
          </div>
          <span className="hidden sm:inline font-mono text-sm uppercase tracking-[0.2em] neon-text">SYS.PORTAL</span>
        </motion.div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-xs font-mono font-medium text-white/50 hover:text-cyber-cyan hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all uppercase tracking-widest relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-cyan transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
              </motion.a>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan">
                  <User size={14} />
                  <span className="hidden sm:inline">{user.username} [{user.role}]</span>
                </div>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 text-xs font-mono text-cyber-magenta hover:text-white transition-colors"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">LOGOUT</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 text-xs font-mono text-cyber-cyan hover:text-white transition-all bg-cyber-cyan/10 px-5 py-2 rounded-full border border-cyber-cyan/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-cyber-cyan/20 uppercase tracking-widest"
              >
                <LogIn size={14} />
                <span>Auth</span>
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};
