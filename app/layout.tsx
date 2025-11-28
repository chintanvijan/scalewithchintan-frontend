import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Scale with Chintan | System Design & Software Architecture',
    template: '%s | Scale with Chintan',
  },
  description:
    'Technical blog covering system design, software architecture, scalability, and distributed systems. Learn best practices for building scalable applications.',
  keywords: [
    'system design',
    'software architecture',
    'scalability',
    'distributed systems',
    'microservices',
    'cloud architecture',
    'performance optimization',
    'tech blog',
  ],
  authors: [{ name: 'Chintan' }],
  creator: 'Chintan',
  publisher: 'Scale with Chintan',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://scalewithchintan.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Scale with Chintan',
    title: 'Scale with Chintan | System Design & Software Architecture',
    description:
      'Technical blog covering system design, software architecture, scalability, and distributed systems.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Scale with Chintan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scale with Chintan | System Design & Software Architecture',
    description:
      'Technical blog covering system design, software architecture, scalability, and distributed systems.',
    images: ['/og-image.png'],
    creator: '@scalewithchintan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
