'use client';

import { useContext } from 'react';

import Image from 'next/image';

import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '~/trpc/react';

import { Button } from '../../components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../components/form';
import { Input } from '../../components/input';
import { SignInContext } from '../context';

const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .email('This is not a valid email.'),
    password: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .min(8, 'This is not a valid password.'),
    confirmPassword: z.string(),
    username: z.string().min(1, { message: 'This field has to be filled.' }),
    imageURL: z.string().url('This is not a valid URL.')
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword']
    }
  );

export function RegisterForm() {
  const context = useContext(SignInContext);
  const { mutate: registerUserMutation } = api.auth.register.useMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: context.email,
      password: context.password,
      confirmPassword: '',
      username: '',
      imageURL: ''
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    registerUserMutation(data);

    new Promise((r) => setTimeout(r, 1000))
      .then(() => {
        signIn('credentials', {
          email: data.email,
          password: data.password,
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
        <div className="mb-2">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Confirm Password</FormLabel>
                <FormControl>
                  <Input
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
        <div className="mb-2">
          {form.getValues().imageURL && (
            <div className="rounded-full p-1 pl-20 font-semibold text-white no-underline transition focus:outline-none">
              <Image
                src={form.getValues().imageURL ?? ''}
                alt=""
                className="h-12 w-12 rounded-full border-none fill-none"
                width={96}
                height={96}
              />
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
        <Button
          className="w-full font-semibold text-white hover:bg-streamingpurple"
          type="submit"
          disabled={!form.formState.isDirty || !form.formState.isValid}
        >
          Create An Account
        </Button>
      </Form>
    </form>
  );
}
