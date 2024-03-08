import { useSession } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@nextui-org/react';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import * as Separator from '@radix-ui/react-separator';
import { HeartIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '~/utils/api';

import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger
} from '../ui/drawer';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { toast } from '../ui/use-toast';
import { UserProfile } from '../UserProfile';

interface CommentSectionProps {
  movieId: number;
}

const FormSchema = z.object({
  message: z.string().min(1, {
    message: 'You must type something to be able to send!'
  })
});

export function CommentSection({ movieId }: CommentSectionProps) {
  const { data: sessionData } = useSession();
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
      movieId: movieId,
      createdById: sessionData.user.id ?? ''
    });
  };

  return (
    <>
      <div className="ml-auto mr-3 lg:hidden block">
        <Drawer modal>
          <div className="flex flex-row bottom-10 absolute left-0 border-t pt-2 rounded-lg border-streamingpurple w-full">
            <DrawerTrigger asChild>
              <div className="flex ml-auto">
                <ChatBubbleIcon className="w-8 h-8 text-gray-400 hover:text-streamingpurple" />
              </div>
            </DrawerTrigger>
            <HeartIcon className="w-8 h-8 ml-2 mr-2 text-gray-400 hover:text-streamingpurple" />
          </div>
          <DrawerContent className="bg-[#1d132a]">
            <DrawerHeader className="dark">
              <div className="flex text-left flex-col lg:w-[20vw] lg:ml-24 lg:mr-10 bg-streamingpurple/5 border-streamingpurple border rounded-lg  shadow-lg shadow-black">
                <div className=" overflow-y-auto rounded-2xl">
                  <div className="text-white pt-2 rounded-3xl h-[60vh] flex flex-col">
                    <div className="flex flex-col m-3 rounded-lg bg-black-300 h-fit">
                      <div className="p-3">
                        {comments.data?.map((comment, index) => (
                          <>
                            <UserProfile key={index} comment={comment} />
                            <Separator.Root className="bg-white/15 h-1 w-full my-2" />
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
                    disabled={!sessionData}
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="border-streamingpurple border rounded-lg text-white"
                            placeholder="Type something!"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    className="text-white w-full
                    mt-2 disabled:cursor-not-allowed hover:bg-streamingpurple font-semibold"
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
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div
        className="hidden lg:flex flex-col lg:w-[40vw]
        xl:w-[30vw] 2xl:w-[25vw] lg:ml-24 lg:mr-10 bg-streamingpurple/5 rounded-lg border-white/25 shadow-md shadow-black border"
      >
        <div className=" overflow-y-auto rounded-2xl">
          <div className="text-white pt-2 rounded-3xl h-[60vh] flex flex-col">
            <div className="flex flex-col m-3 rounded-lg bg-black-300 h-fit">
              <div className="p-3">
                {comments.data?.map((comment, index) => (
                  <>
                    <UserProfile key={index} comment={comment} />
                    <Separator.Root className="bg-white/15 h-1 w-full my-2" />
                  </>
                ))}
              </div>
            </div>
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
                      className="border-streamingpurple text-white border rounded-lg dark"
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
    </>
  );
}
