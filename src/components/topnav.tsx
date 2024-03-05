import Link from 'next/link';

export function TopNav() {
  return (
    <div className="pl-5 mt-10">
      <Link href="/">
        <div className="font-extrabold tracking-tight text-[2rem] bg-gradient-to-r from-streamingpurple via-[#c6c0ca] to-white inline-block text-transparent bg-clip-text">
          Popcorn Streaming
        </div>
      </Link>
    </div>
  );
}
