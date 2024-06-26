import LayoutProviders from '~/layout-providers';
import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

import { Toaster } from './lib/components/toast/toaster';

export const metadata = {
  title: 'Popcorn Streaming',
  description:
    'A place to find where to stream your favorite movies and shows.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-[#15162c] font-sans`}>
        <TRPCReactProvider>
          <LayoutProviders>{children}</LayoutProviders>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
