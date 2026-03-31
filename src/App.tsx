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
    <div className="relative selection:bg-tech-blue/30">
      <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
      
      <main>
        <Hero />
        <StudentDirectory />
        <MemoryLane />
        <ProjectShowcase />
        <MessageBoard />
      </main>

      <Footer />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
}
