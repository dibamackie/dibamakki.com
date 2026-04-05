'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'Start Here', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeUrl, setActiveUrl] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-zinc-950/80 py-4' : ''}`}
    >
      <nav className="flex items-center gap-2 sm:gap-6 rounded-none punk-border bg-zinc-900 px-6 py-3 punk-shadow transition-all duration-300">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setActiveUrl(link.href)}
            className={`relative px-2 py-1 text-sm sm:text-base font-bold uppercase tracking-wider transition-colors ${activeUrl === link.href ? 'text-lime-400' : 'text-zinc-400 hover:text-zinc-100'}`}
          >
            {activeUrl === link.href && (
              <motion.div
                layoutId="active-indicator"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-lime-400"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            {link.name}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
