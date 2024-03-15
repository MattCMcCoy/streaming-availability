import { getServerAuthSession } from '~/server/auth';

import { FollowingList } from './list';

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div>
      <div className="mx-auto flex w-[60vw] flex-col border-b border-streaminggold text-3xl font-bold text-white">
        <h1>Following</h1>
      </div>
      <FollowingList userId={session?.user.id ?? ''} />
    </div>
  );
}
