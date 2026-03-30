import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudentDirectory } from './components/StudentDirectory';
import { MemoryLane } from './components/MemoryLane';
import { ProjectShowcase } from './components/ProjectShowcase';
import { MessageBoard } from './components/MessageBoard';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative selection:bg-tech-blue/30">
      <Navbar />
      
      <main>
        <Hero />
        <StudentDirectory />
        <MemoryLane />
        <ProjectShowcase />
        <MessageBoard />
      </main>

      <Footer />
    </div>
  );
}
