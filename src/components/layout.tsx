import { Inter as FontSans, Inter } from 'next/font/google';
import Head from 'next/head';

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
    <>
      <Head>
        <title>Popcorn Streaming</title>
        <meta
          name="description"
          content="A platform for discovering where a movie is streaming"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-inter h-screen overflow-auto bg-gradient-to-b from-[#15162c] via-[#15162c] to-[#53357b] font-sans">
        {children}
        <Toaster />
      </main>
    </>
  );
}
