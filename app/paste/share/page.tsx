import { redirect } from 'next/navigation';

function page() {
  return redirect('/paste/new');
}

export default page;
