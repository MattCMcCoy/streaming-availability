'use client';

import { createContext, useState } from 'react';

import { Nav } from '../Nav';

export const SidebarContext = createContext({
  email: '',
  password: ''
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSigninContext] = useState({
    email: '',
    password: ''
  });

  return (
    <SidebarContext.Provider value={isSigninContext}>
      <div className="h-[100vh]">
        <Nav />
        {children}
      </div>
    </SidebarContext.Provider>
  );
}
