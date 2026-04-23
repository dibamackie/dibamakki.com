'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-32 px-6 sm:px-12 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-5xl sm:text-7xl font-black uppercase text-zinc-100 mb-8">
          Let's <span className="text-lime-500 block sm:inline">Connect</span>
        </h2>

        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
          Whether you have a project in mind, want to collaborate, or just want to talk code and design—my inbox is open.
        </p>

        {status === 'success' ? (
          <div className="bg-lime-500/10 border border-lime-500 p-8 punk-shadow inline-block">
            <h3 className="text-3xl font-display font-black text-lime-500 uppercase mb-4">Message Sent!</h3>
            <p className="text-zinc-300">Thanks for reaching out. I'll get back to you soon.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 uppercase font-bold text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-bold uppercase text-zinc-400 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-900 punk-border p-4 text-zinc-100 focus:outline-none focus:punk-shadow-hover transition-all placeholder:text-zinc-600"
                placeholder="YOUR NAME"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold uppercase text-zinc-400 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-900 punk-border p-4 text-zinc-100 focus:outline-none focus:punk-shadow-hover transition-all placeholder:text-zinc-600"
                placeholder="YOUR EMAIL"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-bold uppercase text-zinc-400 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-zinc-900 punk-border p-4 text-zinc-100 focus:outline-none focus:punk-shadow-hover transition-all resize-none placeholder:text-zinc-600"
                placeholder="WHAT'S ON YOUR MIND?"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-500 font-bold uppercase text-sm">Failed to send message. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-4 w-full bg-lime-500 text-zinc-950 font-black uppercase tracking-widest text-xl px-12 py-5 punk-shadow hover:punk-shadow-hover transition-all duration-300 disabled:opacity-50 disabled:hover:punk-shadow disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </motion.div>

      <footer className="mt-40 border-t border-zinc-800 pt-8 text-zinc-600 font-bold uppercase text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Diba Makki</p>
        <div className="flex gap-4">
          {/* Add additional footer links if necessary */}
        </div>
      </footer>
    </section>
  );
}
