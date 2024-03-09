'use server';

import { api } from '~/trpc/server';

export async function GetSignInStatus({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  const emailExists = await api.auth.emailExists.query({ email });
  const emailMatchesPassword = await api.auth.signin.query({ email, password });

  return { emailExists, emailMatchesPassword };
}
