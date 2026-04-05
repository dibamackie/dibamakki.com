'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 sm:px-12 max-w-5xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="flex-1">
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-zinc-100 mb-8 tracking-tight">
            Start <span className="text-lime-500">Here.</span>
          </h2>
          
          <div className="space-y-6 text-lg sm:text-xl text-zinc-300 font-sans leading-relaxed">
            <p>
              I am a creative full-stack developer who believes the web shouldn't be boring. I build modern, scalable web applications with a rebellious edge.
            </p>
            <p>
              My approach blends rigorous engineering with striking, brutalist design. I don't just write code; I craft digital experiences that leave an impression. Whether it's complex microservices or high-performance UIs, I bring a unique chaotic but calculated energy to the table.
            </p>
            <div className="pt-6">
              <a href="#projects" className="inline-block bg-zinc-100 text-zinc-950 px-8 py-3 font-bold uppercase tracking-wider punk-shadow-white hover:punk-shadow-white-hover transition-all">
                See my work
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 relative">
          <div className="aspect-square bg-zinc-900 border-4 border-zinc-700 p-2 sm:p-4 transform rotate-3 punk-shadow hover:rotate-1 transition-transform duration-300">
            <div className="w-full h-full relative border-2 border-zinc-600 overflow-hidden bg-zinc-800">
              <Image 
                src="/profile.jpg" 
                alt="Diba Makki" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-lime-500 -z-10 blur-2xl opacity-40"></div>
        </div>
      </motion.div>
    </section>
  );
}
