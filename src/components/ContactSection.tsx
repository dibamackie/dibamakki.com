'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
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

        <a
          href="mailto:diba.mak@gmail.com"
          className="inline-block bg-lime-500 text-zinc-950 font-black uppercase tracking-widest text-xl px-12 py-5 punk-shadow hover:punk-shadow-hover transition-all duration-300"
        >
          Send an Email
        </a>
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
