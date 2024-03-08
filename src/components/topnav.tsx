import Link from 'next/link';

import { $path } from 'next-typesafe-url';

export function TopNav() {
  return (
    <div className="pl-5 mt-10">
      <Link
        href={$path({
          route: '/'
        })}
      >
        <div className="font-extrabold tracking-tight text-[2rem] bg-gradient-to-r from-streamingpurple via-[#e6c43d] to-white inline-block text-transparent bg-clip-text">
          Popcorn Streaming
        </div>
      </Link>
    </div>
  );
}
