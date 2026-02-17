import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get('secret') !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  const uid = searchParams.get('uid'); // e.g., api::blog.blog
  const documentId = searchParams.get('documentId');
  const status = searchParams.get('status'); // 'draft' or 'published'

  if (!uid || !documentId) redirect('/');

  const collection = uid.split('.').pop(); // 'blog'

  // Enable draft mode only for drafts
  if (status === 'draft') {
    (await draftMode()).enable();
  } else {
    (await draftMode()).disable(); // optional: explicitly disable for published
  }

  redirect(`/preview/${collection}/${documentId}`);
}
