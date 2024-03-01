import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType
} from 'next';

import { getServerSession } from 'next-auth';

import { type ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { BsDiscord } from 'react-icons/bs';
import { GiPopcorn } from 'react-icons/gi';
import { authOptions } from '~/server/auth';

export default function SignIn({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-5 bg-gradient-to-b from-[#2e026d] to-[#15162c] align-middle">
      <GiPopcorn size={80} color="white" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <SignInButton {...provider} />
        </div>
      ))}
    </div>
  );
}

const SignInButton = (provider: ClientSafeProvider) => {
  const specialButton: {
    icon: JSX.Element;
    style: string;
  } = {
    icon: <></>,
    style: ''
  };
  switch (provider.name) {
    case 'Discord':
      specialButton.icon = <BsDiscord size={19} color="white" />;
      specialButton.style = 'rounded-lg bg-indigo-500 text-white';
      break;
    default:
      throw new Error(`Unknown provider: ${provider.name}`);
  }

  return (
    <button
      className={`flex items-center p-2 font-semibold ${specialButton.style}`}
      onClick={() => signIn(provider.id)}
    >
      <div className="pr-2">{specialButton.icon}</div>
      Sign in with {provider.name}
    </button>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] }
  };
}
