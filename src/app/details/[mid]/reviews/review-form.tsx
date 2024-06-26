'use client';

import { type Session } from 'next-auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/app/lib/components/button';
import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger
} from '~/app/lib/components/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '~/app/lib/components/form';
import { toast } from '~/app/lib/components/toast/use-toast';
import { api } from '~/trpc/react';

interface ReviewFormProps {
  movieId: number;
  session: Session | null;
  type: string;
}

const FormSchema = z.object({
  header: z.string().min(1, {
    message: 'You must type something to be able to send!'
  }),
  message: z.string().min(1, {
    message: 'You must type something to be able to send!'
  })
});

export function ReviewForm({ movieId, session, type }: ReviewFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const comments = api.comment.getCommentsByMovieId.useQuery({
    movieId: movieId,
    type: type.toUpperCase()
  });

  const { mutate: createCommentMutation } =
    api.comment.createComment.useMutation({
      async onSuccess() {
        try {
          await comments.refetch();
        } catch (error) {
          console.error(error);
        }

        form.reset({ header: '', message: '' });

        toast({
          title: 'SUCCESS!',
          className: 'bg-green-800',
          description: 'Your review has been posted!'
        });
      }
    });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    if (!session) {
      toast({
        title: 'ERROR!',
        className: 'bg-red-800',
        description: 'Sign In to Post a Review!'
      });
      return;
    }

    createCommentMutation({
      header: formData.header,
      message: formData.message,
      movieId: movieId,
      createdById: session.user.id ?? ''
    });
  };
  return (
    <DrawerContent className="w-[40vw] min-w-[400px]">
      <DrawerHeader className="">
        <div className="flex flex-row">
          <div className="text-3xl font-semibold">Add a review</div>
        </div>
      </DrawerHeader>
      <DrawerFooter className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              disabled={!session}
              control={form.control}
              name="header"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="h-10 rounded-lg text-white"
                      placeholder="Write a headline for your review!"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={!session}
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="rounded-lg text-white"
                      placeholder="Write your review here!"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DrawerTrigger asChild>
              <Button
                className="mt-2 w-full
                    font-semibold text-white hover:bg-streamingpurple disabled:cursor-not-allowed"
                type="submit"
                disabled={
                  !form.formState.isDirty || !form.formState.isValid || !session
                }
              >
                Post
              </Button>
            </DrawerTrigger>
          </form>
        </Form>
      </DrawerFooter>
    </DrawerContent>
  );
}
