import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Tomorrow, Permanent_Marker } from 'next/font/google';
import './styles/tailwind.css';
import './styles/globals.scss';

const tomorrow = Tomorrow({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-tomorrow'
});

const marker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker'
});

export const metadata: Metadata = {
  title: 'Friday Album',
  description: 'A group listening concept'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marker.variable} ${tomorrow.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
