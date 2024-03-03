'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { toast } from '~/components/ui/use-toast';

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

interface RegisterProps {
  csrfToken: string | undefined;
  currForm: UseFormReturn<
    {
      email: string;
      password: string;
    },
    undefined
  >;
}

export default function Register({ csrfToken, currForm }: RegisterProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: currForm.getValues().email,
      password: currForm.getValues().password,
      confirmPassword: '',
      username: '',
      imageURL: ''
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
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
                <FormDescription className="text-wrap w-56">
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
                <FormDescription className="text-wrap w-56">
                  This is the picture that will display next to your profile.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Button
          className="text-white w-full hover:bg-streamingpurple font-semibold"
          type="submit"
        >
          Create An Account
        </Button>
      </Form>
    </form>
  );
}
