import { getProviders } from 'next-auth/react';

import LogInForm from './login-form';
import { ProviderButtons } from './provider-buttons';

export default async function Page() {
  const providers = await getProviders();

  return (
    <div className="mx-auto flex h-[80vh] w-fit flex-col items-center justify-center space-y-5 self-center align-middle">
      <div className="flex flex-col">
        <LogInForm />
      </div>
      <div className="flex">
        <div className="mr-2 mt-3 w-10 border-t border-white" />
        <p className="text-lg text-white">Or Sign In With</p>
        <div className="ml-2 mt-3 w-10 border-t border-white" />
      </div>
      <div className="pt-4">
        <ProviderButtons providers={providers} />
      </div>
    </div>
  );
}
