import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import './styles/globals.css';

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
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
