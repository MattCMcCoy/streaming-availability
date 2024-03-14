import { Nav } from '~/app/(nav)/navbar';
import { getServerAuthSession } from '~/server/auth';

import { LeftNav } from '../left-nav';
import { FollowingList } from './following-list';

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div>
      <Nav />
      <div className="mt-5 flex flex-row">
        <LeftNav />
        <div className="">
          <div className="mx-auto flex w-[60vw] flex-col border-b border-streaminggold text-3xl font-bold text-white">
            <h1>Following</h1>
          </div>
          <FollowingList userId={session?.user.id ?? ''} />
        </div>
      </div>
    </div>
  );
}
