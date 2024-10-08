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
        className="max-w-2xl text-center"
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
        <p className="mb-4 text-xl text-gray-300 sm:text-2xl">
          {`Oops! We couldn't find the paste you're looking for.`}
        </p>
        <p className="mb-8 text-lg text-gray-400">
          This paste might be private or no longer exist. Double-check the URL
          or try accessing it from your saved pastes.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <Link href="/">
            <Button className="transform rounded-lg bg-indigo-500 px-6 py-3 text-lg font-bold text-white transition-colors duration-300 hover:scale-105 hover:bg-indigo-600">
              Go Back Home
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{' '}
            <a href="/contact" className="text-indigo-400 hover:underline">
              contact support
            </a>
            .
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
