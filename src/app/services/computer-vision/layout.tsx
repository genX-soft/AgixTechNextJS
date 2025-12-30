import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Computer Vision AI Solutions | Image & Video Intelligence',
  description: 'Deploy computer vision AI for image analysis, video intelligence, and automated visual inspection.',
  keywords: ['computer vision AI', 'image recognition AI', 'enterprise computer vision solutions', 'ai image and video analysis', 'visual inspection ai systems'],
  openGraph: {
    title: 'Computer Vision AI Solutions | Image & Video Intelligence | AGIX Technologies',
    description: 'Deploy computer vision AI for image analysis, video intelligence, and automated visual inspection.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
