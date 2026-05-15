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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/90 group-hover:bg-atmos-accent/20 group-hover:border-atmos-accent/50 transition-all duration-300">
            <Cpu size={16} className="text-atmos-accent/80 group-hover:text-atmos-accent group-hover:rotate-180 transition-all duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif italic text-lg tracking-wide text-white leading-none group-hover:text-atmos-accent transition-colors">MCA</span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase mt-1">Profile</span>
          </div>
        </motion.div>

        {/* Center Nav */}
        <nav className="hidden md:flex flex-1 justify-center">
          <motion.ul 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
            className="flex items-center gap-8 bg-white/5 py-2 px-6 rounded-full border border-white/5 backdrop-blur-md"
          >
            {navItems.map((item) => (
              <motion.li 
                key={item.name}
                variants={{
                  hidden: { y: -20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <a
                  href={item.href}
                  className="relative text-[11px] font-sans tracking-[0.1em] text-white/60 hover:text-white transition-colors uppercase group py-1 block"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-atmos-accent transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Right Auth */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-end w-32"
        >
          {user ? (
            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full py-1.5 px-4 backdrop-blur-md hover:border-atmos-accent/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-white/80 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="hidden sm:inline">{user.username}</span>
              </div>
              <div className="w-[1px] h-3 bg-white/20 mx-1" />
              <button 
                onClick={logout}
                className="text-white/40 hover:text-red-400 transition-colors py-1 group"
                title="Logout"
              >
                <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 hover:border-atmos-accent/50 transition-all font-mono text-[10px] tracking-widest uppercase group"
            >
              <User size={14} className="group-hover:scale-110 group-hover:text-atmos-accent transition-all" />
              <span>Login</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

