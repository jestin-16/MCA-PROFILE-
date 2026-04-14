import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Terminal } from 'lucide-react';
import { Message } from '../types';

export const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "MCA 2025-27 is going to be legendary! 🚀", author: "Alex", timestamp: Date.now(), color: "cyber-cyan" },
    { id: '2', text: "Who's ready for the next hackathon?", author: "Sarah", timestamp: Date.now() - 100000, color: "cyber-magenta" },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !author.trim()) return;

    const msg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text: newMessage,
      author: author,
      timestamp: Date.now(),
      color: Math.random() > 0.5 ? 'cyber-cyan' : 'cyber-magenta'
    };

    setMessages([msg, ...messages]);
    setNewMessage('');
  };

  return (
    <section id="wall" className="py-24 px-6 relative z-10 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-30 mask-image:linear-gradient(to_bottom,transparent,black,transparent)" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Terminal className="text-cyber-cyan w-5 h-5" />
            <span className="text-cyber-cyan font-mono text-xs uppercase tracking-[0.3em]">System.Comms</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta">Graffiti</span> Wall
          </motion.h2>
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest">Leave a note, a shoutout, or just your mark on our batch portal.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="holo-card mb-16 p-6 border border-cyber-cyan/30 bg-void-black/80 shadow-[0_0_30px_rgba(0,255,255,0.05)] relative overflow-hidden group"
        >
          {/* Scanning line effect */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-cyan/50 opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="TRANSMIT_MESSAGE..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full bg-void-black border border-cyber-cyan/30 rounded-none py-4 px-6 text-sm font-mono focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all text-white placeholder-white/30"
                />
              </div>
              <div className="relative w-full md:w-48">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-cyan/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="USER_ID"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-void-black border border-cyber-cyan/30 rounded-none py-4 pl-12 pr-6 text-sm font-mono focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all text-white placeholder-white/30 uppercase"
                />
              </div>
              <button
                type="submit"
                className="bg-cyber-cyan text-void-black font-black px-8 py-4 rounded-none hover:bg-white transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95"
              >
                Post <Send size={16} />
              </button>
            </div>
          </form>
        </motion.div>

        <div className="relative flex flex-col gap-8 py-10">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 hidden md:block" />
          
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className={`relative flex w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} items-center`}
              >
                {/* Timeline Node */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full hidden md:block ${msg.color === 'cyber-cyan' ? 'bg-cyber-cyan shadow-[0_0_10px_rgba(0,255,255,0.8)]' : 'bg-cyber-magenta shadow-[0_0_10px_rgba(255,0,60,0.8)]'}`} />
                
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="w-full md:w-[45%] relative group"
                >
                  <div className={`holo-card p-6 border-t-2 ${msg.color === 'cyber-cyan' ? 'border-t-cyber-cyan border-cyber-cyan/20 shadow-[0_5px_15px_rgba(0,255,255,0.05)] group-hover:shadow-[0_10px_30px_rgba(0,255,255,0.15)]' : 'border-t-cyber-magenta border-cyber-magenta/20 shadow-[0_5px_15px_rgba(255,0,60,0.05)] group-hover:shadow-[0_10px_30px_rgba(255,0,60,0.15)]'} bg-void-black/90 transition-all duration-300`}>
                    <p className="text-lg font-mono mb-6 text-white/90 leading-relaxed">"{msg.text}"</p>
                    <div className="flex justify-between items-center text-xs border-t border-white/10 pt-4">
                      <span className={`font-black uppercase tracking-widest flex items-center gap-2 ${msg.color === 'cyber-cyan' ? 'text-cyber-cyan' : 'text-cyber-magenta'}`}>
                        <User size={12} /> {msg.author}
                      </span>
                      <span className="font-mono text-white/30 bg-white/5 px-2 py-1 rounded-sm">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  
                  {/* Decorative corner */}
                  <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity ${msg.color === 'cyber-cyan' ? 'border-cyber-cyan' : 'border-cyber-magenta'}`} />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
