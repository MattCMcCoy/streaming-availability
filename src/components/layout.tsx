import { Inter as FontSans } from 'next/font/google';

import { Toaster } from './ui/toaster';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export default function Layout({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <main className="bg-gradient-to-b from-[#2e026d] to-[#15162c] overflow-auto h-screen font-sans">
      {children}
      <Toaster />
    </main>
  );
}
