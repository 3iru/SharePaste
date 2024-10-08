'use client';

import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbutton from '@/components/ui/Navbutton';
import { type PasteData } from '@/lib/types/types';

export default function SharedPastePage({ paste }: { paste: PasteData }) {
  const formattedDate = new Date(paste.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
            {paste.paste_title}
          </h1>
          <Navbutton href={'/'}>Create New Paste</Navbutton>
        </div>
        <div className="overflow-hidden rounded-lg bg-gray-800 shadow-lg">
          <SyntaxHighlighter
            language={paste.paste_type ?? 'text'}
            style={atomDark}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }}
            lineNumberStyle={{
              minWidth: '3em',
              paddingRight: '1em',
              textAlign: 'right',
              userSelect: 'none',
            }}
          >
            {paste.paste_content ?? ''}
          </SyntaxHighlighter>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Language: {paste.paste_type} • Created: {formattedDate}
          </p>
          <p className="text-sm text-gray-400">
            {paste.paste_content.split('\n').length} lines
          </p>
        </div>
      </motion.div>
    </div>
  );
}
