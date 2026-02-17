import { getEmployee } from '@/app/services/teamService';
import Detail from './detail';
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const blogs = await getEmployee();
    return blogs?.data?.map((b: any) => ({
      id: b.slug,
    }));
  } catch (err) {
    console.warn('generateStaticParams: failed to fetch Employee', err);
    return [];
  }
}
export default async function Page({ params }: any) {
  const slug = await params;
  return <Detail slug={slug?.id} />;
}
