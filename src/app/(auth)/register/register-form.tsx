'use client';

import { useContext } from 'react';
import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { type Session } from 'next-auth';
import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@nextui-org/react';
import { PersonIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '~/trpc/react';

import { Button } from '../../lib/components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../lib/components/form';
import { Input } from '../../lib/components/input';
import { SignInContext } from '../context';

const FormSchema = z.object({
  username: z.string().min(1, { message: 'This field has to be filled.' }),
  imageURL: z.string().url('This is not a valid URL.'),
  role: z.string()
});

export function RegisterForm({ session }: { session: Session | null }) {
  const [selected, setSelected] = React.useState(false);
  const router = useRouter();
  const context = useContext(SignInContext);

  const { mutate: registerUserMutation } = api.auth.register.useMutation();
  const { mutate: updateUserMutation } = api.user.updateUser.useMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: session?.user.name ?? '',
      imageURL: session?.user.image ?? ''
    }
  });

  React.useEffect(() => {
    form.setValue('role', selected ? 'CRITIC' : 'USER');
  }, [form, selected]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    if (session?.user) {
      updateUserMutation({
        data: {
          image: data.imageURL ?? session.user.image,
          name: data.username ?? session.user.name,
          email: session.user.email ?? '',
          password: '',
          role: selected ? 'CRITIC' : 'USER'
        },
        userId: session.user.id
      });

      router.push('/');
      return;
    }
    registerUserMutation({
      ...context,
      ...data,
      role: selected ? 'CRITIC' : 'USER'
    });
    new Promise((r) => setTimeout(r, 1000))
      .then(() => {
        signIn('credentials', {
          email: context.email,
          password: context.password,
          callbackUrl: '/'
        }).catch((error) => {
          console.error('Failed to sign in', error);
        });
      })
      .catch((error) => console.error('Failed to sign in', error));
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className="mb-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    className="border border-white bg-transparent text-white"
                    placeholder="example"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="w-56 text-wrap">
                  This is how your name will appear to other users.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div>
          {form.getValues().imageURL ? (
            <Image
              src={form.getValues().imageURL ?? ''}
              alt=""
              className="mx-auto mb-2 mt-5 rounded-2xl"
              draggable={false}
              width={96}
              height={96}
              onError={(e) => (e.currentTarget.src = '')}
            />
          ) : (
            <div className="mx-auto mb-2 mt-5 h-[64px] w-[96px] rounded-2xl bg-gray-300">
              <PersonIcon className="m-auto h-16 w-16 text-gray-500" />
            </div>
          )}
          <FormField
            control={form.control}
            name="imageURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Profile Image</FormLabel>
                <FormControl>
                  <Input
                    className="border border-white bg-transparent text-white"
                    placeholder="example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="w-56 text-wrap">
                  This is the picture that will display next to your profile.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10">
          <FormField
            control={form.control}
            name="role"
            render={({}) => (
              <FormItem>
                <FormControl>
                  <Checkbox isSelected={selected} onValueChange={setSelected} />
                </FormControl>
                <FormLabel className="mr-2 text-white">
                  Are you a movie Critic?
                </FormLabel>
                <FormMessage />
                <FormDescription className="w-56 text-wrap">
                  This role can be changed in the settings at any time.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        <Button
          className="w-full font-semibold text-white hover:bg-streamingpurple"
          type="submit"
          disabled={
            (!form.formState.isDirty || !form.formState.isValid) && !session
          }
        >
          Create An Account
        </Button>
      </Form>
    </form>
  );
}
