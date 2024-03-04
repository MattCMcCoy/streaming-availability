import Head from 'next/head';
import Image from 'next/image';

import { HeartIcon } from 'lucide-react';
import { GiPopcorn } from 'react-icons/gi';
import { RiNetflixFill } from 'react-icons/ri';
import { AuthShowcase } from '~/auth/AuthShowcase';
import { CarouselSize } from '~/components/movie/carousel';

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
      <div className=" flex flex-col items-end gap-2 pr-10">
        <AuthShowcase />
      </div>
      <main className="flex max-h-screen flex-col">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          <GiPopcorn size={80} color="white" />
          <h1 className="text-5xl text-center font-extrabold tracking-tight text-white sm:text-[5rem]">
            Streaming
            <span className="text-[hsl(280,100%,70%)]"> Availability</span>
          </h1>
          <div className="flex flex-grow flex-col space-y-5">
            <CarouselSize />
            <CarouselSize />
          </div>
        </div>
      </main>
    </>
  );
}

export function Card() {
  return (
    <div>
      <div className="relative overflow-hidden w-96 h-96">
        <Image
          src="https://static1.squarespace.com/static/5a78ab8490badee028bef0e9/t/5d840e597d51593a02b10357/1568935527866/Interstellar.jpg?format=1500w"
          alt=""
          fill
          className="rounded-lg"
        />
        <div className="absolute mt-auto flex pt-64 z-20 pl-5 font-sans  flex-col">
          <div className="text-3xl text-white font-bold">Intersteller</div>
          <div className="text-white">2011</div>
        </div>
        <div className="absolute bottom-0 left-0 p-5 z-40">
          <RiNetflixFill size={30} className="text-red-500" />
        </div>
        <div className="absolute bottom-0 right-0 p-5 z-40">
          <HeartIcon size={30} className="text-green-100 hover:fill-red-500" />
        </div>
        <div className="absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_40.82%,rgba(0,0,0,0.00)_81.44%)] rounded-lg" />
      </div>
    </div>
  );
}
