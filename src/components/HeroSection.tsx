'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section id="home" className="relative relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
      <div className="z-10 text-center flex flex-col items-center w-full max-w-4xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-zinc-100 punk-shadow-white inline-block border-4 border-zinc-100 p-4 sm:p-8 bg-zinc-900 mb-6">
            Diba Makki
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-lime-500 text-zinc-950 font-bold px-6 py-2 uppercase tracking-wide text-sm sm:text-xl punk-shadow mb-12"
        >
          Developer • Designer • Builder
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center gap-6 mb-20"
        >
          <SocialLink href="https://linkedin.com/in/dibamakki" icon={<FiLinkedin size={24} />} label="LinkedIn" />
          <SocialLink href="https://github.com/dibamackie" icon={<FiGithub size={24} />} label="GitHub" />
          <SocialLink href="mailto:diba.mak@gmail.com" icon={<FiMail size={24} />} label="Email" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500"
      >
        <FiArrowDown size={32} />
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center p-4 bg-zinc-900 border-2 border-zinc-700 text-zinc-300 transition-all duration-300 hover:text-lime-400 hover:border-lime-400 punk-shadow hover:punk-shadow-hover hover:-translate-y-1 group"
      aria-label={label}
    >
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
    </a>
  );
}
