import { getServerAuthSession } from '~/server/auth';

import { AuthShowcase } from '../(auth)/showcase';
import UserTable from './user-table';

export default async function Admin() {
  const session = await getServerAuthSession();

  return (
    <div className="h-full overflow-hidden pb-10">
      <div className="mt-5 flex flex-col-reverse md:mt-0 md:block">
        <div className="container flex flex-col items-center justify-center">
          <h1 className="inline-block bg-gradient-to-r from-streamingpurple via-streaminggold to-white bg-clip-text pt-5 text-center text-5xl font-extrabold text-transparent">
            Popcorn Streaming
          </h1>
        </div>
        <div className="right-5 top-5 ml-auto mr-5 md:absolute md:ml-0 md:mr-0">
          <AuthShowcase />
        </div>
      </div>
      <div className="mx-auto my-10 w-fit items-center self-center">
        <UserTable session={session} />
      </div>
    </div>
  );
}
