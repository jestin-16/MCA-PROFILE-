import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../AuthContext';
import { LogIn, LogOut, User, Cpu } from 'lucide-react';

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
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret combo: Ctrl + Shift + L
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        onLoginClick();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onLoginClick]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Directory', href: '#directory' },
    { name: 'Memories', href: '#memories' },
    { name: 'Projects', href: '#projects' },
    { name: 'Wall', href: '#wall' },
  ];

  return (
    <nav className={cn(
      "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[95%] max-w-5xl rounded-full px-8 py-3",
      isScrolled ? "glass-panel" : "bg-transparent"
    )}>
      <div className="flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-500">
            <div className="absolute inset-0 bg-atmos-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <Cpu size={18} className="text-white relative z-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <span className="hidden sm:flex flex-col">
            <span className="font-serif italic text-xl tracking-wide text-white group-hover:text-atmos-accent transition-colors duration-500 leading-none">MCA</span>
            <span className="font-mono text-[9px] tracking-[0.4em] text-white/50 uppercase mt-1">Profile '27</span>
          </span>
        </motion.div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-sm font-sans font-light text-white/50 hover:text-white transition-all tracking-wider relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-atmos-accent transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-sans tracking-wide text-atmos-accent">
                  <User size={16} />
                  <span className="hidden sm:inline font-light">{user.username} <span className="text-white/30 text-xs uppercase tracking-widest">[{user.role}]</span></span>
                </div>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest font-sans text-white/50 hover:text-atmos-accent transition-colors"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

