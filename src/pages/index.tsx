import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  User,
  UserPlus,
  Users
} from 'lucide-react';
import { GiPopcorn } from 'react-icons/gi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';

export default function Home() {
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
      {sessionData ? (
        <DropdownMenuDemo />
      ) : (
        <button
          className="rounded-full bg-white/10 p-2 px-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => void signIn()}
        >
          Sign in
        </button>
      )}
    </div>
  );
}

export function DropdownMenuDemo() {
  const { data: sessionData } = useSession();

  if (!sessionData) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full p-1 px-1 font-semibold text-white no-underline transition hover:bg-white/20 focus:outline-none">
          <Image
            src={sessionData.user.image ?? ''}
            alt=""
            className="w-12 h-12 rounded-full border-none fill-none"
            width={96}
            height={96}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-10">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Friends</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Add A Friend</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Username</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
