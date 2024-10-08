'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <div className="relative">
        <motion.div
          className="h-20 w-20 rounded-full border-4 border-indigo-500"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            borderRadius: ['50%', '30%', '50%'],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute left-0 top-0 h-20 w-20 rounded-full border-t-4 border-purple-500"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 1.5,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-bold text-white"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <Image width={50} height={50} src="/logo-final.png" alt="logo" />
        </motion.div>
      </div>
      <motion.p
        className="absolute bottom-10 mt-4 text-xl text-indigo-300"
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
