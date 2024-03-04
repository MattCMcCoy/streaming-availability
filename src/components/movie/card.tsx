import Image from 'next/image';

import Brazil from 'country-flag-icons/react/3x2/BR';
import US from 'country-flag-icons/react/3x2/US';
import { HeartIcon } from 'lucide-react';
import { RiNetflixFill } from 'react-icons/ri';

export function Card({ like }: { like: boolean }) {
  return (
    <div>
      <div className="relative overflow-hidden w-[75vw] sm:w-[37vw] md:w-[37vw] xl:w-[26.3vw] 2xl:w-[23.3vw] h-96">
        <Image
          src="https://static1.squarespace.com/static/5a78ab8490badee028bef0e9/t/5d840e597d51593a02b10357/1568935527866/Interstellar.jpg?format=1500w"
          alt=""
          fill
          className="rounded-lg"
        />
        <div className="absolute mt-auto flex pt-64 z-20 pl-5 font-sans  flex-col">
          <div className="text-3xl text-white font-bold font-sans">
            Intersteller
          </div>
          <div className="text-white text-lg mt-[-10px]">2011</div>
        </div>
        <div className="absolute bottom-0 left-0 pl-3 pb-2 z-40 flex flex-col">
          <RiNetflixFill size={30} className="text-red-500" />
          <div className="flex flex-row space-x-2 pl-1">
            <US title="United States" className="h-8 w-8" />
            <Brazil title="Brazil" className="h-8 w-8" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 p-5 z-40">
          <HeartIcon
            size={25}
            className={
              like
                ? 'fill-red-500 text-red-500 hover:fill-transparent hover:text-white'
                : 'text-white hover:fill-red-500 hover:text-red-500'
            }
          />
        </div>
        <div className="absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_40.82%,rgba(0,0,0,0.00)_81.44%)] rounded-lg" />
      </div>
    </div>
  );
}
