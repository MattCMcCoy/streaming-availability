'use client';

import { useState } from 'react';

import Link from 'next/link';

import { SearchIcon } from 'lucide-react';
import { $path } from 'next-typesafe-url';

export function SearchBar() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-row items-center space-x-2">
      <input
        type="text"
        className="h-10 w-96 rounded-full border border-white bg-transparent px-2 text-white focus:border focus:border-streamingpurple"
        autoComplete="off"
        placeholder="Search for a movie!"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            window.location.href = $path({
              route: '/search',
              searchParams: {
                title: search
              }
            });
          }
        }}
      />
      <Link
        href={$path({
          route: '/search',
          searchParams: {
            title: search
          }
        })}
      >
        <div className="rounded-full bg-transparent font-semibold text-white hover:text-streamingpurple">
          <SearchIcon />
        </div>
      </Link>
    </div>
  );
}
