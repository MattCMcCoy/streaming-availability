import { getServerAuthSession } from '~/server/auth';

import { FollowerList } from './list';

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div className="">
      <div className="mx-auto flex w-[60vw] flex-col border-b border-streaminggold text-3xl font-bold text-white">
        <h1>Followers</h1>
      </div>
      <FollowerList userId={session?.user.id ?? ''} />
    </div>
  );
}
