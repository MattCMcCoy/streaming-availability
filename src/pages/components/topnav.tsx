import Link from 'next/link';

export function TopNav() {
  return (
    <div className="pl-5 mt-10">
      <Link href="/">
        <div className="font-extrabold tracking-tight text-white text-[2rem]">
          Streaming
          <span className="text-[hsl(280,100%,70%)]"> Availability</span>
        </div>
      </Link>
    </div>
  );
}
