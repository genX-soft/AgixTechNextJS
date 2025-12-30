import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Engine - AI Blog Topic Generator | AGIX',
  description: 'Generate strategic blog topics for authority building using AI-powered keyword research and content clustering. Build topical authority with high-volume keywords.',
  keywords: ['content strategy', 'blog topics', 'SEO', 'topical authority', 'keyword research', 'content marketing'],
};

export default function ContentEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
