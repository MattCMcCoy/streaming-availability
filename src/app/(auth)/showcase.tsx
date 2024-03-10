import { getServerAuthSession } from '~/server/auth';

import { Auth, SignInButton } from './auth';

export async function AuthShowcase() {
  const session = await getServerAuthSession();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session ? <DropdownMenuDemo /> : <SignInButton />}
    </div>
  );
}

export async function DropdownMenuDemo() {
  const session = await getServerAuthSession();

  if (!session) return null;

  return <Auth session={session} />;
}
