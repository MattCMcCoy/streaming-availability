import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { Card } from './card';

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
    >
      <div className="flex flex-row w-full justify-center">
        <CarouselPrevious className="absolute sm:left-0 left-9" />
        <CarouselContent>
          {Array.from({ length: 40 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card like={index % 2 == 0} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute sm:right-0 right-9" />
      </div>
    </Carousel>
  );
}
