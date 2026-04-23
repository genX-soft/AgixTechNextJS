import { redirect } from 'next/navigation';

export default async function RedirectOldBlog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Redirect old root-level blog URLs (or typos) to /insights/
  redirect(`/insights/${slug}/`);
}
