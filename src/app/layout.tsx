import { Inter } from 'next/font/google';

import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata = {
  title: 'Popcorn Streaming',
  description:
    'A place to find where to stream your favorite movies and shows.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} bg-gradient-to-b from-[#15162c] via-[#15162c] to-[#53357b]`}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}