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
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b",
        isScrolled 
          ? "bg-atmos-bg/90 backdrop-blur-2xl border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] py-4" 
          : "bg-gradient-to-b from-atmos-bg/80 to-transparent border-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Brand */}
        <motion.div 
          className="flex items-center gap-4 group cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center text-white overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:border-atmos-accent/50 transition-all duration-500">
            <div className="absolute inset-0 bg-atmos-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <Cpu size={18} className="text-white relative z-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <span className="hidden sm:flex flex-col">
            <span className="font-serif italic text-xl tracking-wide text-white group-hover:text-atmos-accent transition-colors duration-500 leading-none">MCA</span>
            <span className="font-mono text-[9px] tracking-[0.4em] text-white/50 uppercase mt-1">Profile '27</span>
          </span>
        </motion.div>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-[11px] font-mono tracking-[0.2em] text-white/60 hover:text-white transition-all uppercase group py-1"
            >
              {item.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-atmos-accent group-hover:w-full transition-all duration-500 ease-out" />
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center min-w-[120px] justify-end">
          {user ? (
            <div className="flex items-center gap-4 bg-transparent border border-white/10 py-1.5 px-4 backdrop-blur-md hover:border-atmos-accent/50 transition-colors duration-300">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-white/80 uppercase">
                <span className="w-1.5 h-1.5 bg-atmos-accent animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                <span className="hidden sm:inline">{user.username} <span className="opacity-50">[{user.role}]</span></span>
              </div>
              <div className="w-[1px] h-4 bg-white/20 mx-2" />
              <button 
                onClick={logout}
                className="flex items-center justify-center text-white/40 hover:text-red-400 transition-colors group p-1"
                title="Logout"
              >
                <LogOut size={14} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          ) : (
             <div className="w-10 h-10" />
          )}
        </div>
      </div>
    </motion.header>
  );
};

