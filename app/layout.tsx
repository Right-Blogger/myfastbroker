import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  metadataBase: new URL('https://myfastbroker.news'),
  title: 'MyFastBroker: Compare Brokers. Cut Fees. Invest Confidently',
  description: 'MyFastBroker (myfastbroker.news) provides independent online broker comparisons, fee calculators, commission breakdowns, and expert reviews across stocks, forex, options, and crypto.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    'myfastbroker',
    'myfastbroker.com',
    'myfast broker.com',
    'my fastbroker.com',
    'compare brokers',
    'broker fee calculator',
    'best online stock brokers',
    'forex broker comparison',
    'low commission trading'
  ],
  authors: [{ name: 'MyFastBroker Editorial Team', url: 'https://myfastbroker.news' }],
  openGraph: {
    title: 'MyFastBroker: Compare Brokers. Cut Fees. Invest Confidently',
    description: 'Find the best trading platforms with verified fee structures, regulatory ratings, and zero-commission comparisons on myfastbroker.news.',
    type: 'website',
    url: 'https://myfastbroker.news',
    siteName: 'MyFastBroker',
    images: [
      {
        url: '/logo-badge.png',
        width: 512,
        height: 512,
        alt: 'MyFastBroker Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'MyFastBroker: Compare Brokers. Cut Fees. Invest Confidently',
    description: 'Compare online brokers, calculate hidden fee drag, and choose your ideal trading platform on myfastbroker.news.',
    images: ['/logo-badge.png'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body suppressHydrationWarning className="bg-[#050505] text-[#e5e7eb] min-h-screen antialiased selection:bg-blue-600/30 selection:text-blue-200">{children}</body>
    </html>
  );
}
