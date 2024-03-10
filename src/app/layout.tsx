import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

import { Toaster } from './lib/components/toast/toaster';

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
      <body className={`bg-[#15162c] font-sans`}>
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
