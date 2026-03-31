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
    { name: 'Home', href: '#home' },
    { name: 'Directory', href: '#directory' },
    { name: 'Memories', href: '#memories' },
    { name: 'Projects', href: '#projects' },
    { name: 'Wall', href: '#wall' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tech-blue to-tech-violet flex items-center justify-center text-white text-xs">
            MCA
          </div>
          <span className="hidden sm:inline">BATCH PORTAL</span>
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
                className="text-sm font-medium text-white/70 hover:text-tech-blue transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <User size={16} />
                  <span className="hidden sm:inline">{user.username} ({user.role})</span>
                </div>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 text-sm text-tech-blue hover:text-tech-blue/80 transition-colors bg-tech-blue/10 px-4 py-2 rounded-full border border-tech-blue/20"
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};
