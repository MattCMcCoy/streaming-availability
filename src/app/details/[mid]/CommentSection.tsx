'use client';

import { type Session } from 'next-auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@nextui-org/react';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import * as Separator from '@radix-ui/react-separator';
import { HeartIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/app/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger
} from '~/app/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '~/app/components/ui/form';
import { toast } from '~/app/components/ui/use-toast';
import { api } from '~/trpc/react';

import { UserProfile } from './UserProfile';

interface CommentSectionProps {
  movieId: number;
  session: Session | null;
}

const FormSchema = z.object({
  message: z.string().min(1, {
    message: 'You must type something to be able to send!'
  })
});

export function CommentSection({ movieId, session }: CommentSectionProps) {
  const comments = api.comment.getCommentsByMovieId.useQuery({
    movieId: movieId
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const { mutate: createCommentMutation } =
    api.comment.createComment.useMutation({
      async onSuccess() {
        try {
          await comments.refetch();
        } catch (error) {
          console.error(error);
        }

        form.reset({ message: '' });

        toast({
          title: 'SUCCESS!',
          className: 'bg-green-800',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Comment Created!</code>
            </pre>
          )
        });
      }
    });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    if (!session) {
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
      movieId: movieId,
      createdById: session.user.id ?? ''
    });
  };

  return (
    <>
      <div className="ml-auto mr-3 block lg:hidden">
        <Drawer modal>
          <div className="absolute bottom-10 left-0 flex w-full flex-row rounded-lg border-t border-streamingpurple pt-2">
            <DrawerTrigger asChild>
              <div className="ml-auto flex">
                <ChatBubbleIcon className="h-8 w-8 text-gray-400 hover:text-streamingpurple" />
              </div>
            </DrawerTrigger>
            <HeartIcon className="ml-2 mr-2 h-8 w-8 text-gray-400 hover:text-streamingpurple" />
          </div>
          <DrawerContent className="bg-[#1d132a]">
            <DrawerHeader className="dark">
              <div className="flex flex-col rounded-lg border border-streamingpurple bg-streamingpurple/5 text-left shadow-lg shadow-black lg:ml-24  lg:mr-10 lg:w-[20vw]">
                <div className=" overflow-y-auto rounded-2xl">
                  <div className="flex h-[60vh] flex-col rounded-3xl pt-2 text-white">
                    <div className="bg-black-300 m-3 flex h-fit flex-col rounded-lg">
                      <div className="p-3">
                        {comments.data?.map((comment, index) => (
                          <>
                            <UserProfile key={index} comment={comment} />
                            <Separator.Root className="my-2 h-1 w-full bg-white/15" />
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerHeader>
            <DrawerFooter className="dark">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    disabled={!session}
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="rounded-lg border border-streamingpurple text-white"
                            placeholder="Type something!"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    className="mt-2 w-full
                    font-semibold text-white hover:bg-streamingpurple disabled:cursor-not-allowed"
                    type="submit"
                    disabled={
                      !form.formState.isDirty ||
                      !form.formState.isValid ||
                      !session
                    }
                  >
                    Post
                  </Button>
                </form>
              </Form>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div
        className="hidden flex-col rounded-lg
        border border-white/25 bg-streamingpurple/5 shadow-md shadow-black lg:ml-24 lg:mr-10 lg:flex lg:w-[40vw] xl:w-[30vw] 2xl:w-[25vw]"
      >
        <div className=" overflow-y-auto rounded-2xl">
          <div className="flex h-[60vh] flex-col rounded-3xl pt-2 text-white">
            <div className="bg-black-300 m-3 flex h-fit flex-col rounded-lg">
              <div className="p-3">
                {comments.data?.map((comment, index) => (
                  <>
                    <UserProfile key={index} comment={comment} />
                    <Separator.Root className="my-2 h-1 w-full bg-white/15" />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              disabled={!session}
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="rounded-none text-white dark"
                      placeholder="Type something!"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="w-full rounded-none font-semibold text-white hover:bg-streamingpurple disabled:cursor-not-allowed"
              type="submit"
              disabled={
                !form.formState.isDirty || !form.formState.isValid || !session
              }
            >
              Post
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
