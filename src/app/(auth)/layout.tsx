'use client';

import { useState } from 'react';

import { Nav } from '../navbar';
import { SignInContext } from './context';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSigninContext] = useState({
    email: '',
    password: ''
  });

  return (
    <SignInContext.Provider value={isSigninContext}>
      <div className="h-[100vh]">
        <Nav />
        {children}
      </div>
    </SignInContext.Provider>
  );
}
