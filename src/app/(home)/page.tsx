import { AuthShowcase } from '../(auth)/AuthShowcase';
import { MovieCategories } from './MovieList';

export default async function Home() {
  return (
    <div className="h-full pb-10">
      <div className="flex flex-col items-end gap-2 pr-10">
        <AuthShowcase />
      </div>
      <div className="flex w-full flex-col">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          <h1 className="inline-block bg-gradient-to-r from-streamingpurple via-streaminggold to-white bg-clip-text text-center text-5xl font-extrabold text-transparent">
            Popcorn Streaming
          </h1>
        </div>
        <div className="flex flex-grow flex-col space-y-5 self-center">
          <MovieCategories />
        </div>
      </div>
    </div>
  );
}
