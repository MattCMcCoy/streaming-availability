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
    >
      <CarouselContent>
        {Array.from({ length: 40 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card like={index % 2 == 0} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
