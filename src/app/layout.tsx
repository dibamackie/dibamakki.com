import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import ChatWidget from '@/components/ChatWidget'; // <-- NEW
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Diba Makki | Developer • Designer • Builder',
  description: 'Portfolio of Diba Makki, a creative full-stack developer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} scroll-smooth dark antialiased`}>
      <body className="min-h-screen bg-[#050505] text-zinc-50 selection:bg-lime-500 selection:text-zinc-950 flex flex-col font-sans overflow-x-hidden">
        {children}
        <ChatWidget />
        <SpeedInsights />
      </body>
    </html>
  );
}
