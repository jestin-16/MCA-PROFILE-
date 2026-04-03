import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudentDirectory } from './components/StudentDirectory';
import { MemoryLane } from './components/MemoryLane';
import { ProjectShowcase } from './components/ProjectShowcase';
import { MessageBoard } from './components/MessageBoard';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen scanlines">
      <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
      
      <main className="relative z-10">
        <Hero />
        
        <div className="relative">
          {/* Global Walkway Path Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-transparent via-cyber-cyan/30 to-transparent -translate-x-1/2 hidden md:block z-0 shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
          
          <StudentDirectory />
          <MemoryLane />
          <ProjectShowcase />
          <MessageBoard />
        </div>
      </main>

      <Footer />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
}
