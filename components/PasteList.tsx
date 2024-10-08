import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudIcon, HardDriveIcon, CodeIcon } from 'lucide-react';
import Link from 'next/link';
import { type PasteData } from '../lib/types/types';
import { formatISODate } from '@/app/lib/utils';

interface PasteListProps {
  pastes: PasteData[];
  loading: boolean;
}

const PasteList = memo(({ pastes, loading }: PasteListProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full mt-8 text-center text-gray-400"
          >
            Loading pastes...
          </motion.p>
        ) : (
          <>
            {pastes.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full mt-8 text-center text-gray-400"
              >
                No pastes found.
              </motion.p>
            ) : (
              pastes.map(paste => (
                <motion.div
                  key={paste.pastelink_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/paste/${paste.pastelink_id}`} className="block">
                    <div className="rounded-lg bg-gray-800/50 p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-700/50 hover:shadow-lg">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="truncate font-semibold text-indigo-400">
                          {paste.paste_title}
                        </span>
                        {paste.storage_type === 'cloud' ? (
                          <CloudIcon className="h-4 w-4 text-indigo-400" />
                        ) : (
                          <HardDriveIcon className="h-4 w-4 text-indigo-400" />
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <CodeIcon className="mr-1 h-4 w-4" />
                        <span>{paste.paste_type}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {formatISODate(paste.createdAt)}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

PasteList.displayName = 'PasteList';

export default PasteList;
