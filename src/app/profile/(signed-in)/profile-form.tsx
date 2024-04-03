'use client';

import React from 'react';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox } from '@nextui-org/react';
import { type User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '~/trpc/react';

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
import { toast } from '../../lib/components/toast/use-toast';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().optional(),
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  image: z.string().url('This is not a valid URL.'),
  role: z.string()
});

export function EditProfileForm({ user }: { user: User }) {
  const [selected, setSelected] = React.useState(user.role === 'CRITIC');
  const utils = api.useUtils();
  const { mutate: updateUserMutation } = api.user.updateUser.useMutation({
    onSuccess: () => {
      utils.user.getUser
        .invalidate({ userId: user.id })
        .then(() => {
          console.log('User updated successfully.');
        })
        .catch((error) => {
          console.error(error);
        });
      toast({
        color: 'green',
        title: 'Success',
        description: 'Profile updated successfully.'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message
      });
    }
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: user.email ?? '',
      password: user.password ?? '',
      name: user.name ?? '',
      image: user.image ?? '',
      role: selected ? 'CRITIC' : 'USER'
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateUserMutation({
      userId: user.id,
      data
    });
  }

  return (
    <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className="mb-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="border border-white bg-transparent text-white"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-2">
          <FormField
            control={form.control}
            name="name"
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
                <FormDescription className="text-wrap">
                  This is how your name will appear to other users.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        {user.password && (
          <div className="mb-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      className="border border-white bg-transparent text-white"
                      placeholder="example123"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <div className="mb-2">
          {form.getValues().image && (
            <div className="m-3 w-fit rounded-full border border-streamingpurple p-1 font-semibold text-white no-underline transition focus:outline-none">
              <Image
                src={form.getValues().image ?? ''}
                alt=""
                className="h-12 w-12 rounded-full border-none fill-none"
                width={96}
                height={96}
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="image"
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
                <FormDescription className="text-wrap">
                  This is the picture that will display next to your profile.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="mt-10">
            <FormField
              control={form.control}
              name="role"
              render={({}) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      isSelected={selected}
                      onValueChange={setSelected}
                    />
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
        </div>
        <Button
          className="ml-auto w-32 bg-streamingpurple font-semibold text-white hover:bg-gray-300/20 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-white disabled:hover:bg-transparent"
          type="submit"
          disabled={!form.formState.isDirty && !form.formState.isValid}
        >
          Save Profile
        </Button>
      </Form>
    </form>
  );
}
