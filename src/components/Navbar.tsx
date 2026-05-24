import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../AuthContext';
import { LogIn, LogOut, User, Cpu, Hash, Layers } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link spy based on scroll
      const sections = ['home', 'directory', 'memories', 'projects', 'wall'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            const match = navItems.find(item => item.href === `#${section}`);
            if (match) setActiveItem(match.name);
          }
        }
      }
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
    { name: 'Home', href: '#home', code: '01', category: 'REGISTRY' },
    { name: 'Directory', href: '#directory', code: '02', category: 'PEERS' },
    { name: 'Memories', href: '#memories', code: '03', category: 'COLLECTION' },
    { name: 'Projects', href: '#projects', code: '04', category: 'BUILDS' },
    { name: 'Wall', href: '#wall', code: '05', category: 'BROADCAST' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        isScrolled 
          ? "bg-[#0c0a09]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] py-3"
          : "bg-transparent py-5"
      )}
    >
      {/* Visual Alignment Top Bar Line with dynamic color transition */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-atmos-accent/40 to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Brand Terminal */}
        <motion.div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/90 group-hover:bg-atmos-accent/10 group-hover:border-atmos-accent/30 transition-all duration-500 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
            <Cpu size={16} className="text-atmos-accent group-hover:rotate-180 transition-transform duration-700" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif italic text-base tracking-wider text-white font-semibold leading-none group-hover:text-atmos-accent transition-colors">MCA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-atmos-accent animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            </div>
            <span className="font-mono text-[7px] tracking-[0.25em] text-white/40 uppercase mt-1">System Core v2.7</span>
          </div>
        </motion.div>

        {/* Dynamic Nav Ledger (Matches custom bento metrics style) */}
        <nav className="hidden md:flex flex-1 justify-center max-w-xl mx-auto">
          <motion.ul 
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 bg-white/[0.02] hover:bg-white/[0.03] border border-white/5 py-1 px-1.5 rounded-full backdrop-blur-2xl transition-all duration-300"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <motion.li 
                  key={item.name}
                  variants={{
                    hidden: { y: -15, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setActiveItem(item.name)}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-center group flex flex-col items-center transition-all duration-300",
                      isActive 
                        ? "bg-white/[0.04] text-white border border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.2)]" 
                        : "text-white/50 hover:text-white border border-transparent"
                    )}
                  >
                    {/* Micro metadata tag */}
                    <span className={cn(
                      "font-mono text-[6px] tracking-[0.2em] mb-0.5 transition-colors duration-300",
                      isActive ? "text-atmos-accent font-semibold" : "text-white/20 group-hover:text-atmos-accent/60"
                    )}>
                      {item.code} {item.category}
                    </span>

                    {/* Actual Label */}
                    <span className="text-[10px] font-sans tracking-[0.08em] uppercase font-medium leading-none block">
                      {item.name}
                    </span>

                    {/* Ground Active Dot */}
                    {isActive && (
                      <motion.span 
                        layoutId="activeGlow"
                        className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-atmos-accent shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        {/* Control Desk Actions/Auth */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-end w-36 gap-3"
        >
          {user ? (
            <motion.div 
              whileHover={{ y: -1 }}
              className="flex items-center gap-3 bg-[#0c0a09]/85 border border-white/10 rounded-full py-1.5 pl-3.5 pr-2 backdrop-blur-md hover:border-atmos-accent/40 shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-colors duration-300"
            >
              <div className="flex flex-col items-start leading-none gap-0.5">
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                  <span className="max-w-[70px] truncate font-mono text-[9px] text-white/90 uppercase tracking-wider">{user.username}</span>
                </div>
              </div>
              <div className="w-[1px] h-3 bg-white/10" />
              <button 
                onClick={logout}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 flex items-center justify-center transition-all duration-300"
                title="Disconnect Session"
              >
                <LogOut size={11} />
              </button>
            </motion.div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(245,158,11,0.15)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.02] text-white/80 hover:text-white hover:bg-white/5 hover:border-atmos-accent/50 transition-all font-mono text-[9px] tracking-[0.15em] uppercase group shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            >
              <User size={12} className="group-hover:scale-110 group-hover:text-atmos-accent transition-all duration-300" />
              <span>LOG NODE</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};
