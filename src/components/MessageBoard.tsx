import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User } from 'lucide-react';
import { Message } from '../types';
import { GlassCard } from './GlassCard';

export const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "MCA 2025-27 is going to be legendary! 🚀", author: "Alex", timestamp: Date.now(), color: "tech-blue" },
    { id: '2', text: "Who's ready for the next hackathon?", author: "Sarah", timestamp: Date.now() - 100000, color: "tech-violet" },
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
      color: Math.random() > 0.5 ? 'tech-blue' : 'tech-violet'
    };

    setMessages([msg, ...messages]);
    setNewMessage('');
  };

  return (
    <section id="wall" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">Digital Graffiti Wall</h2>
        <p className="text-white/50">Leave a note, a shoutout, or just your mark on our batch portal.</p>
      </div>

      <GlassCard className="mb-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-tech-blue/50 transition-colors"
              />
            </div>
            <div className="relative w-full md:w-48">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
              <input
                type="text"
                placeholder="Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-tech-blue/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-tech-blue to-tech-violet text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Post <Send size={16} />
            </button>
          </div>
        </form>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              <GlassCard className={msg.color === 'tech-blue' ? 'neon-blue' : 'neon-violet'}>
                <p className="text-lg font-medium mb-4 italic">"{msg.text}"</p>
                <div className="flex justify-between items-center text-xs text-white/40">
                  <span className="font-bold uppercase tracking-widest">— {msg.author}</span>
                  <span>{new Date(msg.timestamp).toLocaleDateString()}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
