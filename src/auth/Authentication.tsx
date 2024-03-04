'use client';

import { signIn, useSession } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '~/utils/api';

import Register from './Register';
import SignIn from './SignIn';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .min(8, 'This is not a valid password.')
});

export function InputForm({
  setShowRegisterUserForm,
  showRegisterUserForm
}: {
  setShowRegisterUserForm: (show: boolean) => void;
  showRegisterUserForm: boolean;
}) {
  const session = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { data: signInQuery } = api.auth.signin.useQuery(form.getValues());

  const signInUser = async (data: { email: string; password: string }) => {
    if (signInQuery !== null && signInQuery !== undefined) {
      signIn('credentials', {
        email: data.email,
        password: data.password
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error('Failed to sign in', error);
        });
      console.log(session.data?.user.name);
      return 'Signed in!';
    }

    setShowRegisterUserForm(true);
    return;
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    signInUser(data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return !showRegisterUserForm ? (
    <SignIn form={form} onSubmit={onSubmit} />
  ) : (
    <Register currForm={form} />
  );
}
