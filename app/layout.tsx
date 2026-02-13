import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Exit Ready — Is Your Business Ready to Sell?',
  description:
    'Free exit readiness assessment. Answer 7 questions and get your sellability score. Find out what it takes to make your business acquisition-ready.',
  keywords: [
    'exit readiness',
    'business valuation',
    'sell my business',
    'business acquisition',
    'M&A readiness',
    'sellability score',
    'business broker',
    'exit planning',
  ],
  openGraph: {
    title: 'Exit Ready — Is Your Business Ready to Sell?',
    description: 'Free exit readiness scorecard. 7 questions, instant results.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
