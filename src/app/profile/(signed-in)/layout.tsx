import { Nav } from '~/app/(nav)/navbar';

import { LeftNav } from './left-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav />
      <div className="mt-5 flex flex-row">
        <LeftNav />
        {children}
      </div>
    </div>
  );
}
