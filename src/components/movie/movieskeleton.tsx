import { Card, Skeleton } from '@nextui-org/react';

export function MovieSkeleton() {
  return (
    <Card
      className="dark w-[75vw] sm:w-[37vw] md:w-[36vw] xl:w-[26vw] 2xl:w-[23.15vw] h-96 rounded-xl space-y-5 p-4"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className="h-96 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
