'use client';

import Image from 'next/image';
import Link from 'next/link';

import { type Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

import { GitHubLogoIcon, PersonIcon } from '@radix-ui/react-icons';
import { LogOut, User, Users } from 'lucide-react';
import { $path } from 'next-typesafe-url';
import { api } from '~/trpc/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../lib/components/dropdown-menu';

export function Auth({ session }: { session: Session | null }) {
  const user = api.user.getUser.useQuery({ userId: session?.user?.id ?? '' });
  if (!session) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full border border-streamingpurple/30 p-1 px-1 font-semibold text-white no-underline transition hover:bg-white/10 focus:outline-none">
          {user.data?.image ? (
            <Image
              src={user.data?.image}
              alt=""
              className="h-12 w-12 rounded-full border-none fill-none"
              width={96}
              height={96}
            />
          ) : (
            <div className="h-12 w-12 items-center justify-center rounded-full bg-gray-300">
              <PersonIcon className="mx-auto h-8 w-8 pt-3 text-gray-500" />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={$path({
                route: '/profile'
              })}
              className="flex w-full flex-row"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={$path({
                route: '/profile/following'
              })}
              className="flex w-full flex-row"
            >
              <Users className="mr-2 h-4 w-4" />
              <span>Following</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => void signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="https://github.com/MattCMcCoy/streaming-availability"
            target="_blank"
            className="flex w-full flex-row"
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SignInButton() {
  return (
    <button
      className="rounded-xl bg-white/10 p-2 px-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={() => void signIn()}
    >
      Sign in
    </button>
  );
}
