import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

import { GiPopcorn } from 'react-icons/gi';
import { Input } from '~/components/ui/input';
import { api } from '~/utils/api';

export default function Home() {
  const hello = api.post.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <Head>
        <title>Streaming Availability</title>
        <meta
          name="description"
          content="A platform for discovering where a movie is streaming"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-end gap-2 pr-10">
        <AuthShowcase />
      </div>
      <main className="flex max-h-screen flex-col">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <GiPopcorn size={80} color="white" />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Streaming
            <span className="text-[hsl(280,100%,70%)]"> Availability</span>
          </h1>
          <Input
            className="border-white bg-transparent rounded-full w-[50vh] text-lg text-white"
            type="text"
            placeholder="Search"
          />
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-5">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? `Sign Out ${sessionData.user.name}` : 'Sign in'}
      </button>
    </div>
  );
}
