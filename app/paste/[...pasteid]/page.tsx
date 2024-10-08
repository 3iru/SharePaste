'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ShareIcon, TrashIcon, CopyIcon } from 'lucide-react';
import { usePastes } from '@/app/lib/context/PasteContext';
import { type PasteData } from '@/lib/types/types';
import NotFoundPage from '../not-found';
import ActionButton from '@/components/ui/ActionButton';
import { handleCopy, handleShare, handleDelete } from '../utils';
import { useRouter } from 'next/navigation';
import { formatISODate } from '@/app/lib/utils';
import LoadingFallback from '@/app/loading';

type Params = {
  pasteid: string;
  slug?: string;
};

export default function PasteDataPage({ params }: { params: Params }) {
  const { pasteData, userId, revalidatePastedata } = usePastes();
  const pasteid = params.pasteid[0];
  const router = useRouter();
  const [fetchedpaste, setFetchedPaste] = useState<PasteData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaste = pasteData?.find(data => pasteid === data.pastelink_id);
    if (fetchPaste) {
      setFetchedPaste(fetchPaste);
    }
    setLoading(false);
  }, [pasteData, pasteid]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (!fetchedpaste) {
    return <NotFoundPage />;
  }

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
            {fetchedpaste.paste_title}
          </h1>
          <div className="flex space-x-2">
            <ActionButton
              onClick={() => handleShare(fetchedpaste, userId, pasteid)}
              className="bg-indigo-500 transition-colors duration-300 hover:bg-indigo-600"
              icon={<ShareIcon className="mr-2 h-5 w-5" />}
            >
              Share
            </ActionButton>
            <ActionButton
              onClick={() => handleCopy(fetchedpaste)}
              className="bg-green-500 transition-colors duration-300 hover:bg-green-600"
              icon={<CopyIcon className="mr-2 h-5 w-5" />}
            >
              Copy
            </ActionButton>
            <ActionButton
              onClick={async () => {
                handleDelete(
                  fetchedpaste,
                  userId,
                  pasteid,
                  revalidatePastedata
                );
                router.push('/saved');
              }}
              className="transition-colors duration-300 hover:bg-red-600"
              variant="destructive"
              icon={<TrashIcon className="mr-2 h-5 w-5" />}
            >
              Delete
            </ActionButton>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-gray-800 shadow-lg">
          <SyntaxHighlighter
            language={fetchedpaste.paste_type ?? 'text'}
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
            {fetchedpaste.paste_content ?? ''}
          </SyntaxHighlighter>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Language: {fetchedpaste.paste_type} • Created:{' '}
            {formatISODate(fetchedpaste.createdAt)}
          </p>
          <p className="text-sm text-gray-400">
            {fetchedpaste.paste_content.split('\n').length} lines
          </p>
        </div>
      </motion.div>
    </div>
  );
}
