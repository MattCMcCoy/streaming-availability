import Head from 'next/head';

import { GiPopcorn } from 'react-icons/gi';
import { CarouselSize } from '~/components/movie/carousel';
import { api } from '~/utils/api';

import { AuthShowcase } from '../auth/AuthShowcase';

export default function Home() {
  const { data } = api.watchMode.listTitles.useQuery({ sort_by: 'title_asc' });

  console.log(data);
  return (
    <div id="home">
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
          <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-streamingpurple via-[#b167d7] to-white inline-block text-transparent bg-clip-text">
            Streaming Availability
          </h1>
          <div className="flex flex-grow flex-col space-y-5 pb-20">
            <div className="text-white text-3xl font-bold font-sans">
              WHATS COMING OUT
              <CarouselSize />
            </div>
            <div className="text-white text-3xl font-bold font-sans">
              WHATS POPULAR
              <CarouselSize />
            </div>
            <div className="text-white text-3xl font-bold font-sans">
              WHATS POPULAR WITH FRIENDS
              <CarouselSize />
            </div>
            <div className="text-white text-3xl font-bold font-sans">
              YOUR FAVORITES
              <CarouselSize />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
