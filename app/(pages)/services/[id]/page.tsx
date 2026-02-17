import { get_case_studies } from '@/app/services/homePageService';
import Details from './Details';
import { notFound } from 'next/navigation';
export const revalidate = 60;
export const dynamicParams = true;
export async function generateStaticParams() {
  const data = await get_case_studies();

  return data?.data
    ?.map((b: any) => {
      const slug = b.attributes?.slug || b.slug;

      // Ensure slug is a string
      if (!slug || typeof slug !== 'string') return null;

      return {
        id: slug,
      };
    })
    .filter(Boolean) as { id: string }[]; // filter out nulls
}

export default async function (props: any) {
  const resolvedProps = await props;
  const params = await resolvedProps.params;
  const id: string = params?.id;

  if (!id) {
    return notFound();
  }

  return <Details id={id} />;
}
