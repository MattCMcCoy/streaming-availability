'use client';

import Image from 'next/image';

import { useSession } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as Separator from '@radix-ui/react-separator';
import { type DynamicRoute } from 'next-typesafe-url';
import { useRouteParams } from 'next-typesafe-url/pages';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthShowcase } from '~/auth/AuthShowcase';
import { TopNav } from '~/components/topnav';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form';
import { Textarea } from '~/components/ui/textarea';
import { toast } from '~/components/ui/use-toast';
import { UserProfile } from '~/components/UserProfile';
import { env } from '~/env';
import { api } from '~/utils/api';

const Route = {
  routeParams: z.object({
    did: z.number()
  })
} satisfies DynamicRoute;

export type RouteType = typeof Route;

const FormSchema = z.object({
  message: z.string().min(1, {
    message: 'You must type something to be able to send!'
  })
});

export default function MovieDetails() {
  const { data: sessionData } = useSession();

  const routeParams = useRouteParams(Route.routeParams);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const { data, isLoading, isError, error } = api.tmdb.details.useQuery(
    routeParams.data?.did ?? -1
  );

  const { mutate: createCommentMutation } =
    api.comment.createComment.useMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: {JSON.stringify(error?.message)}</div>;
  }

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });

    if (!sessionData) {
      toast({
        title: 'ERROR!',
        className: 'bg-red-800',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Sign In to Post a Comment!</code>
          </pre>
        )
      });
      return;
    }

    createCommentMutation({
      message: formData.message,
      movieId: data.id,
      createdById: sessionData?.user.id
    });
  };

  return (
    <>
      <div className="flex">
        <TopNav />
        <div className="ml-auto mr-10">
          <AuthShowcase />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex ml-auto shadow-streaminggold shadow-2xl border border-streaminggold bg-streamingpurple/10 p-10 rounded h-fit w-fit">
          <div className="w-[20vw] bg-slate-700 rounded-lg my-auto h-[30vh] mr-5 relative">
            {data.poster_path ?? data.backdrop_path ? (
              <Image
                src={`${env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${data.poster_path ?? data.backdrop_path}`}
                draggable={false}
                alt=""
                fill
                sizes="100% 100%"
                aria-label="movie poster"
                className="rounded-lg"
              />
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className="pt-10 w-[20vw] border-b h-fit border-streaminggold">
              <div className="text-3xl text-white">{data.title}</div>
            </div>
            <div className="pt-10 w-[20vw] h-fit">
              <div className="text-white text-xl">{data.overview}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[20vw] ml-24 mr-10 bg-streamingpurple/5 rounded-lg border-white/25 shadow-lg shadow-black border">
          <div className=" overflow-y-auto rounded-2xl">
            <div className="text-white pt-2 rounded-3xl h-[60vh] flex flex-col">
              {sessionData && (
                <div className="flex flex-col m-3 rounded-lg bg-black-300 h-fit">
                  <div className="p-3">
                    <UserProfile
                      image={sessionData.user.image ?? ''}
                      name={sessionData.user.name ?? ''}
                      handle={sessionData.user.name ?? ''}
                    />
                    <Separator.Root className="bg-white/15 h-1 w-full my-2" />
                    <UserProfile
                      image={sessionData.user.image ?? ''}
                      name={sessionData.user.name ?? ''}
                      handle={sessionData.user.name ?? ''}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                disabled={!sessionData}
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="border-streamingpurple text-white"
                        placeholder="Type something!"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="text-white w-full disabled:cursor-not-allowed hover:bg-streamingpurple font-semibold"
                type="submit"
                disabled={
                  !form.formState.isDirty ||
                  !form.formState.isValid ||
                  !sessionData
                }
              >
                Post
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
