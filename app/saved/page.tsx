'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon } from 'lucide-react';
import { usePastes } from '../lib/context/PasteContext';
import { type PasteData } from '../../lib/types/types';
import Navbutton from '@/components/ui/Navbutton';
import PasteList from '@/components/PasteList';

export default function SavedPastesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { pasteData, revalidatePastedata, loading } = usePastes();
  const [filteredPastes, setFilteredPastes] = useState<PasteData[]>([]);

  useEffect(() => {
    revalidatePastedata();
  }, [revalidatePastedata]);

  useEffect(() => {
    setFilteredPastes(pasteData || []);
  }, [pasteData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered =
        pasteData?.filter(
          paste =>
            (paste.paste_title
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
              paste.paste_type
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) &&
            (activeTab === 'all' || paste.storage_type === activeTab)
        ) || [];
      setFilteredPastes(filtered);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, pasteData, activeTab]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6 text-gray-100 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-center text-3xl font-bold text-transparent">
            Your Saved Pastes
          </h1>
          <Navbutton href={'/paste/new'}>Create New Paste</Navbutton>
        </div>

        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search pastes..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
            className="flex-grow border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
            aria-label="Search pastes"
          />
          <Button
            className="bg-indigo-500 transition-colors duration-300 hover:bg-indigo-600"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger value="all">All Pastes</TabsTrigger>
            <TabsTrigger value="cloud">Cloud</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <PasteList pastes={filteredPastes} loading={loading} />
          </TabsContent>
          <TabsContent value="cloud">
            <PasteList
              pastes={filteredPastes.filter(
                paste => paste.storage_type === 'cloud'
              )}
              loading={loading}
            />
          </TabsContent>
          <TabsContent value="local">
            <PasteList
              pastes={filteredPastes.filter(
                paste => paste.storage_type === 'local'
              )}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
