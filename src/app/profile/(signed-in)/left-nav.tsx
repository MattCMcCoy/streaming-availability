'use client';

import Link from 'next/link';

import { $path } from 'next-typesafe-url';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '../../lib/components/navigation-menu';

export function LeftNav() {
  return (
    <div className="mr-14 mt-10 h-[80vh]">
      <NavigationMenu orientation="vertical" className="ml-16">
        <NavigationMenuList className="flex-col items-start space-x-0 space-y-2">
          <NavigationMenuItem>
            <Link
              href={$path({
                route: '/profile'
              })}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className="text-xl text-white hover:underline">
                Profile
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={$path({
                route: '/profile/interactions'
              })}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className="text-xl text-white hover:underline">
                Interactions
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={$path({
                route: '/profile/following'
              })}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className="text-xl text-white hover:underline">
                Following
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={$path({
                route: '/profile/followers'
              })}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className="text-xl text-white hover:underline">
                Followers
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="text-xl text-white hover:underline">
                Settings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
