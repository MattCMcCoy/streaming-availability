import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server';

import { RegisterBreadcrumb } from '../breadcrumb';
import Redirect from './redirect';
import { RegisterForm } from './register-form';

export default async function Page() {
  const session = await getServerAuthSession();
  const user = await api.user.getUser.query({ userId: session?.user.id ?? '' });

  return user?.role ? (
    <Redirect />
  ) : (
    <div className="mx-auto flex h-[80vh] w-fit flex-col items-center justify-center space-y-5 self-center align-middle">
      <div className="flex flex-col">
        <RegisterBreadcrumb />
        <RegisterForm session={session} />
      </div>
    </div>
  );
}
