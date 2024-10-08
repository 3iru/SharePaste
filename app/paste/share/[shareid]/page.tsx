import NotFoundPage from '../../not-found';
import { getsharedpastedata } from '@/app/lib/action';
import SharedPastePage from '@/components/SharedPastePage';
import { type SimpleResponse } from '@/lib/types/types';

type Params = {
  shareid: string;
};

export default async function PasteDataPage({ params }: { params: Params }) {
  const shareId = params.shareid;

  const data: SimpleResponse = await getsharedpastedata(shareId);

  if (!data.success || !data.paste_data || data.paste_data.length === 0) {
    return <NotFoundPage />;
  }
  const paste = data.paste_data[0];

  return <SharedPastePage paste={paste} />;
}
