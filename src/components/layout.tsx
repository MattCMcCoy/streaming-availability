import { Inter as FontSans, Inter } from 'next/font/google';

import { Toaster } from './ui/toaster';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export default function Layout({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <main className="bg-gradient-to-b to-[#2e026d] from-[#15162c] overflow-auto h-screen font-sans font-inter">
      {children}
      <Toaster />
    </main>
  );
}
