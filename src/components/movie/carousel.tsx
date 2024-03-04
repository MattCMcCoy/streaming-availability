import * as React from 'react';

import { Card } from '~/pages';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className="xl:max-w-4xl 2xl:max-w-7xl lg:max-w-4xl max-w-sm w-full"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="2xl:basis-1/3 lg:basis-1/2">
            <Card />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
