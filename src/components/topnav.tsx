import Link from 'next/link';

import { $path } from 'next-typesafe-url';

export function TopNav() {
  return (
    <div className="mt-10 pl-5">
      <Link
        href={$path({
          route: '/'
        })}
      >
        <div className="inline-block bg-gradient-to-r from-streamingpurple via-[#e6c43d] to-white bg-clip-text text-[2rem] font-extrabold tracking-tight text-transparent">
          Popcorn Streaming
        </div>
      </Link>
    </div>
  );
}
