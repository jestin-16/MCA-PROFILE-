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
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-white/10 font-mono",
        isScrolled
          ? "bg-atmos-bg/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-atmos-bg/40 backdrop-blur-md"
      )}
    >
      <div className="w-full flex justify-between h-16 md:h-20 max-w-[1600px] mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-4 px-6 md:px-8 border-r border-white/10 hover:bg-white/5 transition-colors cursor-pointer group w-fit md:w-72 shrink-0">
          <div className="text-atmos-accent">
            <Cpu size={20} strokeWidth={1.5} className="group-hover:rotate-180 transition-transform duration-700 ease-out" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-white text-sm font-medium tracking-wide group-hover:text-atmos-accent transition-colors">MCA_PROFILE</span>
            <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase mt-0.5">Build.v27</span>
          </div>
        </div>

        {/* Center Nav Nodes */}
        <div className="hidden md:flex flex-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex-1 flex items-center justify-center border-r border-white/10 hover:bg-white/5 text-[10px] tracking-[0.2em] text-white/50 hover:text-white transition-all uppercase relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-atmos-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-atmos-accent/0 group-hover:text-atmos-accent transition-colors duration-300">{"//"}</span>
                {item.name}
              </span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-atmos-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center px-6 md:px-8 justify-end shrink-0 w-fit md:w-72 hover:bg-white/5 transition-colors border-l md:border-l-0 border-white/10">
          {user ? (
            <div className="flex items-center gap-4 w-full justify-between group cursor-pointer">
              <div className="flex flex-col items-start hidden sm:flex">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/80 uppercase">
                  <span className="w-1.5 h-1.5 bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  <span className="font-mono">{user.username}</span>
                </div>
                <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase mt-0.5 ml-3.5">Role: {user.role}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/80 uppercase sm:hidden">
                <span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
                <span>ME</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); logout(); }}
                className="flex items-center justify-center text-white/30 hover:text-red-400 transition-colors p-2"
                title="Terminate Session"
              >
                <LogOut size={16} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/40 uppercase cursor-pointer hover:text-white transition-colors group">
               <span className="w-1.5 h-1.5 border border-white/40 group-hover:border-atmos-accent group-hover:bg-atmos-accent/20 transition-all" />
               <span className="hidden sm:inline">Guest_Session</span>
               <span className="sm:hidden">Guest</span>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

