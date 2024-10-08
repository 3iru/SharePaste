'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import rickroll from '@/public/rickroll.gif';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Image
          src={rickroll}
          width={200}
          height={200}
          alt="404 Not Found"
          className="mx-auto mb-8"
          unoptimized
        />
        <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        <p className="mb-8 text-xl text-gray-300 sm:text-2xl">
          {`Oops! The paste you're looking for doesn't exist.`}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link href="/">
            <Button className="transform rounded-lg bg-indigo-500 px-6 py-3 text-lg font-bold text-white transition-colors duration-300 hover:scale-105 hover:bg-indigo-600">
              Go Back Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
