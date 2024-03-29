import Link from 'next/link';

export function Logo() {
  return (
    <div className="pl-5">
      <Link href="/">
        <div className="inline-block bg-gradient-to-r from-streamingpurple via-[#e6c43d] to-white bg-clip-text text-[2rem] font-extrabold tracking-tight text-transparent">
          Popcorn Streaming
        </div>
      </Link>
    </div>
  );
}
