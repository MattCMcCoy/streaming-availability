import React from 'react';

import { type Movie } from '~/server/api/models/tmdb/Movie';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { Card } from './Card';
import { MovieSkeleton } from './MovieSkeleton';

interface MovieCarouselProps {
  data: Movie[];
}

export function MovieCarousel(props: MovieCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
    >
      <div className="flex w-full flex-row justify-center">
        {props.data.length > 0 && (
          <CarouselPrevious className="absolute left-0" />
        )}
        <CarouselContent className="md:space-x-4">
          {props.data.length > 0 ? (
            props.data.map((movie, index) => (
              <CarouselItem key={index}>
                <Card data={movie} />
              </CarouselItem>
            ))
          ) : (
            <>
              <CarouselItem className="hidden sm:block">
                <MovieSkeleton />
              </CarouselItem>
              <CarouselItem className="hidden md:block">
                <MovieSkeleton />
              </CarouselItem>
              <CarouselItem className="hidden lg:block">
                <MovieSkeleton />
              </CarouselItem>
              <CarouselItem className="">
                <MovieSkeleton />
              </CarouselItem>
            </>
          )}
        </CarouselContent>
        {props.data.length > 0 && <CarouselNext className="absolute right-0" />}
      </div>
    </Carousel>
  );
}
