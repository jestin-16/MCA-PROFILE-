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
    <section id="wall" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
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
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
          Digital <span className="text-cyber-cyan">Graffiti</span> Wall
        </h2>
        <p className="text-white/50 font-mono text-sm uppercase tracking-widest">Leave a note, a shoutout, or just your mark on our batch portal.</p>
      </div>

      <div className="holo-card mb-12 p-6 border border-cyber-cyan/30 bg-void-black/80 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="TRANSMIT_MESSAGE..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full bg-void-black border border-cyber-cyan/30 rounded-none py-4 px-6 text-sm font-mono focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all text-white placeholder-white/30"
              />
            </div>
            <div className="relative w-full md:w-48">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-cyan/50 w-4 h-4" />
              <input
                type="text"
                placeholder="USER_ID"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-void-black border border-cyber-cyan/30 rounded-none py-4 pl-12 pr-6 text-sm font-mono focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all text-white placeholder-white/30 uppercase"
              />
            </div>
            <button
              type="submit"
              className="bg-cyber-cyan text-void-black font-black px-8 py-4 rounded-none hover:bg-white transition-colors flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,255,0.4)]"
            >
              Post <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      <div className="relative flex flex-col gap-8 py-10">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative flex w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} items-center`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full md:w-[60%]"
              >
                <div className={`holo-card p-6 border-l-4 ${msg.color === 'cyber-cyan' ? 'border-l-cyber-cyan border-cyber-cyan/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'border-l-cyber-magenta border-cyber-magenta/20 shadow-[0_0_15px_rgba(255,0,60,0.1)]'} bg-void-black/90`}>
                  <p className="text-lg font-mono mb-4 text-white/90">"{msg.text}"</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-black uppercase tracking-widest ${msg.color === 'cyber-cyan' ? 'text-cyber-cyan' : 'text-cyber-magenta'}`}>USER // {msg.author}</span>
                    <span className="font-mono text-white/30">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
