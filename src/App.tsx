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
    <div className="relative min-h-screen">
      <div className="atmosphere-bg" />
      <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
      
      <main className="relative z-10">
        <Hero />
        
        <div className="relative">
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
