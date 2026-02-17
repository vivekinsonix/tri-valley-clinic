import Details from '../Details';

export default async function ({ params }: any) {
  const slug = await params;

  return <Details slug={slug} />;
}
