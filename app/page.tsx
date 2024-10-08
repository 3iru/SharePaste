'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  CloudIcon,
  HardDriveIcon,
  LockIcon,
  CodeIcon,
  ShareIcon,
  UserIcon,
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <CloudIcon className="h-6 w-6" />,
      title: 'Cloud Save',
      description:
        'Store your pastes securely in the cloud for easy access anywhere.',
    },
    {
      icon: <HardDriveIcon className="h-6 w-6" />,
      title: 'Local Save',
      description: 'Keep your pastes private with local storage option.',
    },
    {
      icon: <LockIcon className="h-6 w-6" />,
      title: 'Privacy Focused',
      description:
        "Your data stays yours. We don't store any personal information.",
    },
    {
      icon: <CodeIcon className="h-6 w-6" />,
      title: 'Syntax Highlighting',
      description: 'Beautiful code highlighting for over 100 languages.',
    },
    {
      icon: <ShareIcon className="h-6 w-6" />,
      title: 'Shareable Pastes',
      description: 'Share your pastes easily with a simple link.',
    },
    {
      icon: <UserIcon className="h-6 w-6" />,
      title: 'No Login Required',
      description: 'Start pasting immediately, no account needed.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100">
      <nav className="sticky top-0 z-10 bg-gray-800 bg-opacity-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold">SharePaste</span>
            </div>
            <div className="flex space-x-4">
              <a
                href="#home"
                className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
              >
                Home
              </a>
              <a
                href="#features"
                className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
              >
                Features
              </a>
              <a
                href="#cta"
                className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          id="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              SharePaste
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-300 sm:text-2xl">
            The simplest way to share code snippets and text online
          </p>
          <Link href="/paste/new">
            <button className="group relative overflow-hidden rounded-md border border-b-4 border-violet-400 bg-violet-950 px-4 py-2 font-medium text-violet-400 outline-none duration-300 hover:border-b hover:border-t-4 hover:brightness-150 active:opacity-75">
              <span className="absolute -top-[150%] left-0 inline-flex h-[5px] w-80 rounded-md bg-violet-400 opacity-50 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] shadow-violet-400 duration-500 group-hover:top-[150%]"></span>
              Create New Paste
            </button>
          </Link>
        </motion.div>

        <motion.div
          id="features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <h2 className="mb-12 text-center text-3xl font-bold">Features</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="mb-4 text-indigo-400">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Ready to start sharing?</h2>
          <p className="mb-8 text-xl text-gray-300">
            No sign-up required. Just paste and share!
          </p>
          <Link href="/paste/new">
            <Button className="transform rounded-lg bg-purple-500 px-6 py-3 text-lg font-bold text-white transition-colors duration-300 hover:scale-105 hover:bg-purple-600">
              Try SharePaste Now
            </Button>
          </Link>
        </motion.div>
      </div>

      <footer className="mt-20 bg-gray-800 bg-opacity-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 text-center md:mb-0 md:text-left">
              <h3 className="text-xl font-bold text-indigo-400">SharePaste</h3>
              <p className="text-gray-400">
                © 2024 SharePaste. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
