'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getuserpastedata } from '../action';
import { type PasteData } from '../../../lib/types/types';

type PasteContextValue = {
  userId: string;
  pasteData: PasteData[] | undefined;
  loading: boolean;
  revalidatePastedata: () => Promise<PasteData[] | undefined>;
};

const PasteContext = createContext<PasteContextValue | null>(null);

export function usePastes() {
  const context = useContext(PasteContext);
  if (!context) {
    throw new Error('PasteContext was used outside of the PasteProvider');
  }
  return context;
}

export function PasteProvider({ children }: { children: React.ReactNode }) {
  const [pasteData, setPasteData] = useState<PasteData[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLocalStoragePasteData = () => {
    const localPaste = localStorage.getItem('paste_data');
    return localPaste ? JSON.parse(localPaste) : [];
  };

  const fetchCloudPasteData = async (userId: string) => {
    if (!userId) {
      console.error('User ID is not defined.');
      return [];
    }

    try {
      const cloudPaste = await getuserpastedata(userId);
      if (!cloudPaste || !cloudPaste.paste_data) {
        console.error('No paste data returned for user:', userId);
        return [];
      }
      return cloudPaste.paste_data;
    } catch (error) {
      console.error('Failed to fetch cloud paste data:', error);
      return [];
    }
  };

  const combinedPasteData = useCallback(async (userId: string) => {
    setLoading(true);
    const [localData, cloudData] = await Promise.all([
      fetchLocalStoragePasteData(),
      fetchCloudPasteData(userId),
    ]);
    const dataMap = new Map<string, PasteData>();

    [...localData.paste_data, ...cloudData].forEach(item => {
      if (item) {
        dataMap.set(item.pastelink_id, item);
      }
    });

    const uniqueData = Array.from(dataMap.values()).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setPasteData(uniqueData);
    setLoading(false);
    return uniqueData;
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      combinedPasteData(storedUserId);
    }
  }, [combinedPasteData]);

  const revalidatePastedata = useCallback(async () => {
    if (userId) {
      return await combinedPasteData(userId);
    }
    return [];
  }, [userId, combinedPasteData]);

  return (
    <PasteContext.Provider
      value={{ userId, pasteData, loading, revalidatePastedata }}
    >
      {children}
    </PasteContext.Provider>
  );
}

export default PasteProvider;
