'use client';

import Image from 'next/image';
import Link from 'next/link';

import { type Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

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
import { $path } from 'next-typesafe-url';
import { api } from '~/trpc/react';

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
} from '../lib/components/dropdown-menu';

export function Auth({ session }: { session: Session | null }) {
  const user = api.user.getUser.useQuery({ userId: session?.user?.id ?? '' });
  if (!session) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full p-1 px-1 font-semibold text-white no-underline transition hover:bg-white/20 focus:outline-none">
          <Image
            src={user.data?.image ?? ''}
            alt=""
            className="h-12 w-12 rounded-full border-none fill-none"
            width={96}
            height={96}
          />
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
              className="flex flex-row"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
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
