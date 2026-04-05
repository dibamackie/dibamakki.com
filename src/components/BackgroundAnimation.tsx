'use client';

import { motion } from 'framer-motion';

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Roaming Gradient Blobs */}
      <motion.div
        animate={{
          x: ['-20%', '10%', '-5%', '-20%'],
          y: ['0%', '30%', '-10%', '0%'],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[10%] left-[20%] w-[40rem] h-[40rem] bg-lime-500/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: ['20%', '-10%', '15%', '20%'],
          y: ['10%', '-30%', '20%', '10%'],
          scale: [0.8, 1.1, 1, 0.8],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-zinc-600/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: ['0%', '20%', '-20%', '0%'],
          y: ['-20%', '10%', '20%', '-20%'],
          rotate: [0, 90, 180, 360],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[40%] left-[50%] w-[30rem] h-[30rem] bg-pink-500/5 rounded-full blur-[150px]"
      />
      
      {/* CRT Scanline Effect */}
      <motion.div
        animate={{ y: ['-100vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 w-full h-[5px] bg-lime-500/5 opacity-50 shadow-[0_0_20px_rgba(132,204,22,0.3)] z-50"
      />
    </div>
  );
}
