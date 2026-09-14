import type { Metadata } from 'next';
import { site } from '@/lib/site';
import './globals.css';

const title = `${site.name} | ${site.locality}, ${site.region}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: 'A silver-gray decorative flake floor in a sunlit modern garage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
    images: [site.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
