import { Nav } from '../(nav)/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
