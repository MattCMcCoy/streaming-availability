'use client';

import { useState } from 'react';

import { Logo } from '../(nav)/logo';
import { SignInContext } from './context';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSigninContext] = useState({
    email: '',
    password: ''
  });

  return (
    <SignInContext.Provider value={isSigninContext}>
      <div className="h-[100vh]">
        <Logo />
        {children}
      </div>
    </SignInContext.Provider>
  );
}
