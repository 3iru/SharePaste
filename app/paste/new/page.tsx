'use client';

import { createnewuser } from '@/app/lib/action';
import { isValidUUID } from '@/app/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CloudIcon, HardDriveIcon, RefreshCwIcon } from 'lucide-react';
import Navbutton from '@/components/ui/Navbutton';
import { savePasteOnCloud, savePasteOnLocal } from '../utils';

function Page() {
  const [filename, setFilename] = useState('');
  const [textcontext, settextcontext] = useState('');
  const [userId, setuserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedUserId = localStorage.getItem('userId');
      const pasteData = localStorage.getItem('paste_data');

      if (!isValidUUID(storedUserId ?? '') || !pasteData) {
        try {
          const response = await createnewuser();
          if (!response.userId) {
            throw new Error();
          }
          const newUserId = response.userId;
          setuserId(newUserId);

          localStorage.setItem('userId', newUserId);

          const defaultData = {
            paste_data: [],
          };
          localStorage.setItem('paste_data', JSON.stringify(defaultData));
        } catch (error) {
          console.error('Error creating new user:', error);
          toast({
            description: 'Failed to create new user.',
            variant: 'destructive',
          });
        }
      } else {
        setuserId(storedUserId);
      }
    };

    fetchToken();
  }, []);

  const handleReset = () => {
    setFilename('');
    settextcontext('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-center text-3xl font-bold text-transparent">
            Create New Paste
          </h1>
          <Navbutton href={'/saved'}>See Saved pastes</Navbutton>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="filename"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Filename
            </label>
            <Input
              id="filename"
              type="text"
              placeholder="Enter filename"
              value={filename}
              onChange={e => setFilename(e.target.value)}
              className="w-full border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Paste Content
            </label>
            <Textarea
              id="content"
              placeholder="Enter your paste content here..."
              value={textcontext}
              onChange={e => settextcontext(e.target.value)}
              className="h-[60vh] w-full resize-none border-gray-700 bg-gray-800/50 font-mono text-white placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => savePasteOnLocal(filename, textcontext)}
            className="bg-green-500 transition-colors duration-300 hover:bg-green-600"
          >
            <HardDriveIcon className="mr-2 h-5 w-5" />
            Save Locally
          </Button>
          <Button
            onClick={() => {
              savePasteOnCloud(filename, textcontext, userId ?? '');
            }}
            className="bg-indigo-500 transition-colors duration-300 hover:bg-indigo-600"
          >
            <CloudIcon className="mr-2 h-5 w-5" />
            Save to Cloud
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-gray-400 bg-slate-500 text-gray-300 transition-colors duration-300 hover:bg-gray-700/30"
          >
            <RefreshCwIcon className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default Page;
