import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, MessageSquare } from 'lucide-react';
import { Message } from '../types';

export const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "MCA 2025-27 is going to be legendary! 🌅", author: "Alex", timestamp: Date.now(), color: "atmos-accent" },
    { id: '2', text: "Who's ready for the next hackathon?", author: "Sarah", timestamp: Date.now() - 100000, color: "white" },
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
      color: Math.random() > 0.5 ? 'atmos-accent' : 'white'
    };

    setMessages([msg, ...messages]);
    setNewMessage('');
  };

  return (
    <section id="wall" className="py-24 px-6 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <MessageSquare className="text-atmos-accent w-5 h-5 opacity-70" />
              <span className="font-sans text-xs tracking-widest text-atmos-accent/80 uppercase">Community</span>
            </div>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="title-serif text-5xl md:text-6xl mb-6 text-white"
            >
              Digital <span className="text-atmos-accent italic">Graffiti</span> Wall
            </motion.h2>
            <p className="font-sans text-white/50 text-sm tracking-wide max-w-xl mx-auto font-light">
              Leave a note, share a thought, or simply make your mark on our collective journey.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 mb-20 relative overflow-hidden group shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Share your thoughts..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-sans focus:outline-none focus:border-atmos-accent/50 transition-all text-white placeholder-white/30 font-light"
                />
              </div>
              <div className="relative w-full md:w-64">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-sans focus:outline-none focus:border-atmos-accent/50 transition-all text-white placeholder-white/30 font-light"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-white text-atmos-bg font-medium px-8 py-4 rounded-2xl hover:bg-atmos-accent hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                Post <Send size={16} />
              </button>
            </div>
          </form>
        </motion.div>

        <div className="relative flex flex-col gap-10 py-10">
          {/* Subtle Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-x-1/2 hidden md:block" />
          
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                className={`relative flex w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} items-center`}
              >
                {/* Timeline Node */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full hidden md:block bg-atmos-bg border-4 ${msg.color === 'atmos-accent' ? 'border-atmos-accent' : 'border-white/20'}`} />
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className="w-full md:w-[45%] relative group"
                >
                  <div className={`glass-panel p-8 border-t-2 ${msg.color === 'atmos-accent' ? 'border-t-atmos-accent' : 'border-t-transparent'} transition-all duration-500`}>
                    <p className="font-serif text-xl md:text-2xl mb-8 text-white/90 leading-relaxed font-light">"{msg.text}"</p>
                    <div className="flex justify-between items-center text-xs border-t border-white/5 pt-6">
                      <span className={`font-sans tracking-wide flex items-center gap-2 ${msg.color === 'atmos-accent' ? 'text-atmos-accent' : 'text-white/60'}`}>
                        <User size={14} className="opacity-70" /> {msg.author}
                      </span>
                      <span className="font-sans text-white/30 tracking-wider bg-white/5 px-3 py-1.5 rounded-full">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

