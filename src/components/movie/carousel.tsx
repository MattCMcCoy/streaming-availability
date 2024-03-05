import * as React from 'react';

import { type Movie } from '~/server/api/models/tmdb';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { Card } from './card';

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
      <div className="flex flex-row w-full justify-center">
        <CarouselPrevious className="absolute left-0" />
        <CarouselContent className="space-x-3">
          {props.data?.map((movie, index) => (
            <CarouselItem key={index}>
              <Card data={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute right-0" />
      </div>
    </Carousel>
  );
}
