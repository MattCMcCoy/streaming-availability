import { getServerAuthSession } from '~/server/auth';

import { EditProfile } from './edit-profile';

export default async function Page() {
  const session = await getServerAuthSession();
  return (
    <div className="">
      <div className="mx-auto flex w-[60vw] flex-col border-b border-streaminggold text-3xl font-bold text-white">
        <h1>Profile</h1>
      </div>
      <EditProfile session={session} />
    </div>
  );
}
