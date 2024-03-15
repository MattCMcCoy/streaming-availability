import { getServerAuthSession } from '~/server/auth';

import { Interactions } from './interactions';

export default async function Page() {
  const session = await getServerAuthSession();
  return (
    <div>
      <div className="mx-auto flex w-[60vw] flex-col border-b border-streaminggold text-3xl font-bold text-white">
        <h1>Interactions</h1>
      </div>
      <Interactions userID={session?.user.id ?? ''} />
    </div>
  );
}
