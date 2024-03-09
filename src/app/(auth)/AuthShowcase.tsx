import { getServerAuthSession } from '~/server/auth';

import { Auth, SignInButton } from './Auth';

export async function AuthShowcase() {
  const session = await getServerAuthSession();
  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-4">
      {session ? <DropdownMenuDemo /> : <SignInButton />}
    </div>
  );
}

export async function DropdownMenuDemo() {
  const session = await getServerAuthSession();

  if (!session) return null;

  return <Auth session={session} />;
}
