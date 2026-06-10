import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../AuthContext';
import { 
  Cpu, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Terminal, 
  Hash, 
  Clock, 
  Compass, 
  BookOpen,
  ArrowUpRight 
} from 'lucide-react';
import { STUDENTS, PROJECTS, MEMORIES } from '../constants';

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [time, setTime] = useState<string>('');
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll spy logic
      const sections = ['home', 'directory', 'memories', 'projects', 'wall'];
      const scrollPosition = window.scrollY + 180;

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

    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);

    const handleKeyDown = (e: KeyboardEvent) => {
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
      clearInterval(interval);
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
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 px-6 lg:px-12",
          isScrolled 
            ? "py-3 top-4 max-w-6xl mx-auto"
            : "py-6 top-0 max-w-7xl mx-auto"
        )}
      >
        {/* Sleek Floating Glass Capsule Container */}
        <div className={cn(
          "relative w-full transition-all duration-500 flex items-center justify-between border",
          isScrolled 
            ? "bg-[#0c0a09]/80 backdrop-blur-3xl border-white/10 rounded-2xl px-6 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            : "bg-transparent border-transparent rounded-none py-2"
        )}>
          {/* Accent Gold top-line on floating banner */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div 
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 0.7, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.8 }}
                className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* BRAND/DASMBOARD TERMINAL LOGO */}
          <motion.div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3.5 cursor-pointer group select-none relative z-10"
          >
            <div className="relative">
              {/* Outer Golden Pulsing Halo surrounding logo in default style */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-[#f59e0b] to-[#ea580c] opacity-20 blur-sm group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative w-11 h-11 rounded-xl border border-white/10 bg-[#0c0a09] flex items-center justify-center text-white/90 group-hover:bg-[#f59e0b]/10 group-hover:border-[#f59e0b]/50 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                <Cpu size={20} className="text-[#f59e0b] group-hover:rotate-180 transition-transform duration-700 ease-out" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif italic text-lg tracking-widest text-[#f59e0b] font-black leading-none uppercase group-hover:text-white transition-colors duration-300 [text-shadow:0_0_15px_rgba(245,158,11,0.4)]">RMCA</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]"></span>
                </span>
              </div>
              <span className="font-mono text-[7.5px] tracking-[0.25em] text-white/40 uppercase mt-1.5 font-bold flex items-center gap-1">
                <span className="inline-block w-1.5 h-[1px] bg-amber-500/50" /> BATCH OF '27
              </span>
            </div>
          </motion.div>

          {/* WEB DESKTOP NAVIGATION INNER DECK */}
          <nav className="hidden md:flex flex-1 justify-center max-w-2xl mx-auto relative">
            <ul className="flex items-center gap-1.5 bg-[#030202]/30 border border-white/[0.06] p-1.5 rounded-2xl backdrop-blur-3xl transition-all duration-300 shadow-[2px_10px_30px_rgba(0,0,0,0.5)]">
              {navItems.map((item) => {
                const isActive = activeItem === item.name;
                const isHovered = hoveredItem === item.name;
                
                return (
                  <li 
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <a
                      href={item.href}
                      onClick={() => setActiveItem(item.name)}
                      className={cn(
                        "relative px-4.5 py-2.5 rounded-xl text-center group flex flex-col items-center transition-all duration-300",
                        isActive 
                          ? "text-white font-semibold" 
                          : "text-white/45 hover:text-white"
                      )}
                    >
                      {/* Dynamic Magnetic Background Hover Capsule */}
                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.span 
                            layoutId="menuHoverBg"
                            className="absolute inset-0 rounded-xl bg-white/[0.03] border border-white/5 z-0"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 380, damping: 28 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Active State Background Block */}
                      {isActive && (
                        <motion.span 
                          layoutId="menuActiveBg"
                          className="absolute inset-0 rounded-xl bg-[#0c0a09]/90 border border-[#f59e0b]/25 shadow-[inset_0_1px_4px_rgba(255,255,255,0.05),0_0_15px_rgba(245,158,11,0.1)] z-0"
                          transition={{ type: "spring", stiffness: 350, damping: 26 }}
                        />
                      )}

                      {/* Monospace Super-Tighter label */}
                      <span className={cn(
                        "font-mono text-[7px] tracking-[0.2em] mb-1.5 relative z-10 transition-colors duration-300",
                        isActive ? "text-[#f59e0b] font-bold" : "text-white/20 group-hover:text-[#f59e0b]"
                      )}>
                        [{item.code}]
                      </span>

                      {/* Actual Name Tag */}
                      <span className="text-[10px] font-sans tracking-[0.1em] uppercase font-semibold leading-none block relative z-10 transition-colors duration-200">
                        {item.name}
                      </span>

                      {/* Ground Active Glow indicator */}
                      {isActive && (
                        <motion.span 
                          layoutId="activeUnderGlow"
                          className="absolute bottom-1 w-2.5 h-[2px] rounded-full bg-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.9)] z-10"
                          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* TELEMETRY METRIC OR AUTH CONTROL (Right Section) */}
          <div className="flex items-center justify-end md:w-52 gap-4.5 relative z-10">
            
            {/* Live Clock Indicator for Desktop */}
            <div className="hidden lg:flex flex-col text-right select-none border-r border-[#f59e0b]/15 pr-4 h-9 justify-center">
              <span className="text-[7.5px] font-mono tracking-widest text-[#f59e0b] leading-none uppercase font-bold">SYSTEM ACTIVE</span>
              <span className="text-[11px] font-mono text-white/80 mt-1 tracking-wider font-bold">{time || '00:00'}</span>
            </div>

            {/* Authenticated/Login Badge with Gold Halo hover */}
            {user ? (
              <motion.div 
                whileHover={{ y: -1 }}
                className="hidden sm:flex items-center gap-3 bg-[#0c0a09]/95 border border-white/10 rounded-xl py-1.5 pl-3.5 pr-1.5 backdrop-blur-md hover:border-[#f59e0b]/40 shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all duration-300 group"
              >
                <div className="flex flex-col items-start leading-none gap-0.5 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    <span className="max-w-[75px] truncate font-mono text-[9px] text-white/90 uppercase tracking-widest font-bold group-hover:text-[#f59e0b] transition-colors">{user.username}</span>
                  </div>
                </div>
                <div className="w-[1px] h-3.5 bg-white/10" />
                <button 
                  onClick={logout}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  title="Disconnect Session"
                >
                  <LogOut size={12} />
                </button>
              </motion.div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.03, boxShadow: "0 0 18px rgba(245,158,11,0.2)" }}
                whileTap={{ scale: 0.97 }}
                onClick={onLoginClick}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-[#f59e0b] hover:text-white hover:bg-[#f59e0b]/10 hover:border-[#f59e0b]/60 transition-all duration-300 font-mono text-[9px] tracking-[0.18em] uppercase group shadow-[0_4px_15px_rgba(0,0,0,0.2)] cursor-pointer"
              >
                <User size={12} className="group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                <span>CONNECT SESSION</span>
              </motion.button>
            )}

            {/* Mobile Panel Menu Hamburger Trigger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden w-10 h-10 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer relative"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} className="text-[#f59e0b]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* FULL RESPONSIVE NAVIGATION OVERLAY (Drawer matches footer theme) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 pt-28 pb-10 px-6 bg-[#030202]/98 border-b border-white/10 backdrop-blur-3xl z-40 shadow-[0_30px_70px_rgba(0,0,0,0.9)] max-h-screen overflow-y-auto"
          >
            {/* Ambient Background Aura specifically for mobile expansion menu */}
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_60%_100%_at_50%_-20%,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none" />

            <div className="max-w-xl mx-auto flex flex-col gap-8">
              
              {/* Dynamic Categorized Links */}
              <div className="space-y-2 mt-4">
                <span className="text-[8px] font-mono tracking-[0.3em] text-white/30 uppercase block mb-3 pl-4">NAVIGATIONAL DIRECTIVES</span>
                {navItems.map((item, index) => {
                  const isActive = activeItem === item.name;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.name);
                        setIsMobileMenuOpen(false);
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "flex items-center justify-between px-5 py-3.5 rounded-2xl border transition-all duration-300",
                        isActive 
                          ? "bg-white/[0.03] border-white/10 text-white font-medium" 
                          : "bg-[#0c0a09]/30 border-transparent text-white/60 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="font-mono text-[9px] text-[#f59e0b] tracking-wider">
                          [{item.code}]
                        </span>
                        <span className="text-sm font-sans tracking-wide uppercase">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-white/20 tracking-widest lowercase bg-white/5 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile Auth Slot */}
              <div className="border-t border-white/5 pt-6">
                {user ? (
                  <div className="bg-[#0c0a09]/90 border border-white/10 rounded-2xl p-4.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                        <Terminal size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-white font-semibold">{user.username}</span>
                        <span className="text-[8px] font-mono text-white/40 tracking-wider">AUTHENTICATED PEER</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-400 uppercase tracking-widest hover:bg-red-500/15 transition-all flex items-center gap-1.5"
                    >
                      <LogOut size={11} />
                      <span>LOG OUT</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-4 rounded-2xl border border-[#f59e0b]/35 bg-[#f59e0b]/5 hover:bg-[#f59e0b]/10 text-white font-mono text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2.5 transition-all duration-300"
                  >
                    <User size={14} className="text-[#f59e0b]" />
                    <span>AUTHENTICATE NODE SESSION</span>
                  </button>
                )}
              </div>

              {/* Live Statistics widget inside Mobile menu matching bento metrics */}
              <div className="grid grid-cols-3 gap-3 bg-white/[0.01] border border-white/5 p-4.5 rounded-2xl text-center select-none">
                <div className="flex flex-col">
                  <span className="text-[7px] font-mono text-white/30 tracking-widest uppercase">Scholars</span>
                  <span className="text-sm font-mono text-white mt-1 font-semibold">{STUDENTS.length}</span>
                </div>
                <div className="flex flex-col border-x border-white/5 px-2">
                  <span className="text-[7px] font-mono text-white/30 tracking-widest uppercase">Projects</span>
                  <span className="text-sm font-mono text-white mt-1 font-semibold">{PROJECTS.length}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-mono text-white/30 tracking-widest uppercase">Uptime</span>
                  <span className="text-sm font-mono text-white mt-1 font-semibold text-[#f59e0b]">99.8%</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
