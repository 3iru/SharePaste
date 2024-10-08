import { toast } from '@/components/ui/use-toast';
import {
  createnewpaste,
  deletePasteByLinkId,
  makePastePublic,
} from '../lib/action';
import { PasteData } from '@/lib/types/types';
import { createPasteInfo } from '../lib/utils';

export const showToast = (
  description: string,
  variant: 'default' | 'destructive' = 'default'
) => {
  toast({ description, variant });
};

export const handleShare = async (
  fetchedpaste: PasteData,
  userId: string,
  pasteid: string
) => {
  if (fetchedpaste?.storage_type === 'local') {
    alert(
      'You cannot share local pastes. Please save your paste to the cloud to share it.'
    );
    return;
  }
  if (fetchedpaste?.shareId) {
    navigator.clipboard
      .writeText(`${window.location.host}/paste/share/${fetchedpaste.shareId}`)
      .then(() => {
        showToast('Link copied to your clipboard! Ready to share.');
      });

    return;
  }

  try {
    const data = await makePastePublic(userId, pasteid);
    if (data.status !== 200) {
      return showToast(data.message, 'destructive');
    }
    navigator.clipboard
      .writeText(`${window.location.host}/paste/share/${data.shareId}`)
      .then(() => {
        showToast('Link copied to your clipboard! Ready to share.');
      });
  } catch (error) {
    showToast((error as Error).message || 'An unknown error occurred');
  }
};

export const handleCopy = (fetchedpaste: PasteData) => {
  if (fetchedpaste) {
    navigator.clipboard.writeText(fetchedpaste.paste_content).then(() => {
      showToast('Paste copied to clipboard');
    });
  }
};

export const handleDelete = async (
  fetchedpaste: PasteData,
  userId: string,
  pasteid: string,
  revalidatePastedata: () => Promise<PasteData[] | undefined>
) => {
  if (!fetchedpaste) throw new Error();

  const { storage_type: filetype } = fetchedpaste;

  try {
    if (filetype === 'local') {
      const storedData = JSON.parse(localStorage.getItem('paste_data') ?? '[]');
      const pasteDataArray = storedData.paste_data;

      if (!Array.isArray(pasteDataArray) || pasteDataArray.length === 0) {
        throw new Error('Paste not found');
      }

      const updatedData = pasteDataArray.filter(
        (data: PasteData) => data.pastelink_id !== pasteid
      );

      localStorage.setItem(
        'paste_data',
        JSON.stringify({ paste_data: updatedData })
      );
      showToast('Paste deleted successfully!', 'destructive');
    } else if (filetype === 'cloud') {
      const response = await deletePasteByLinkId(userId, pasteid);
      if (response.status !== 200) {
        throw new Error('Paste not found');
      }
      showToast('Paste deleted successfully!', 'destructive');
    }
  } catch (error) {
    showToast((error as Error).message || 'An unknown error occurred');
  }
  await revalidatePastedata();
};

export function savePasteOnLocal(filename: string, textcontext: string) {
  if (!filename || !textcontext) {
    alert('Filename and text content cannot be empty.');
    return;
  }
  const pasteData = createPasteInfo(filename, textcontext, 'local');
  const pasteContent = localStorage.getItem('paste_data');
  if (pasteContent) {
    try {
      const pastecontentobj = JSON.parse(pasteContent);
      pastecontentobj.paste_data.push(pasteData);
      localStorage.setItem('paste_data', JSON.stringify(pastecontentobj));
      toast({
        description: 'Your paste saved successfully.',
      });
    } catch (error) {
      toast({
        description: 'something went wrong.',
        variant: 'destructive',
      });
    }
  }
}

export async function savePasteOnCloud(
  filename: string,
  textcontext: string,
  userId: string
) {
  if (!filename || !textcontext) {
    alert('Filename and text content cannot be empty.');
    return;
  }
  try {
    if (!userId) {
      throw new Error('User id not found.');
    }

    const newpasteData = createPasteInfo(filename, textcontext, 'cloud');
    const data = await createnewpaste(newpasteData, userId);
    if (!data.success) throw new Error('Failed to create Paste.');
    toast({
      description: 'Your paste saved successfully.',
    });
  } catch (error) {
    toast({
      description: (error as Error).message || 'An unknown error occurred',
      variant: 'destructive',
    });
  }
}
