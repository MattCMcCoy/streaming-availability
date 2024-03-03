import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType
} from 'next';
import { getServerSession } from 'next-auth';
import {
  type ClientSafeProvider,
  getCsrfToken,
  getProviders,
  signIn
} from 'next-auth/react';

import { BsDiscord, BsGithub, BsGoogle } from 'react-icons/bs';
import { GiPopcorn } from 'react-icons/gi';
import { authOptions } from '~/server/auth';

import { TopNav } from '../components/topnav';
import { InputForm } from './auth/form';

export default function SignIn({
  providers,
  csrfToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <TopNav />
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-5 align-middle">
        <GiPopcorn size={80} color="white" />
        <div className="flex flex-col">
          <InputForm csrfToken={csrfToken} />
        </div>
        <div className="border-t pt-4">
          {Object.values(providers)
            .filter((p) => p.name !== 'Credentials')
            .map((provider) => {
              const buttonStyle = getProviderButtonStyle(provider);
              return (
                <div key={provider.name}>
                  <button
                    className={`flex items-center w-52 mb-2 p-2 font-semibold ${buttonStyle.style}`}
                    onClick={() => signIn(provider.id)}
                    disabled={buttonStyle.disabled}
                  >
                    {buttonStyle.icon && (
                      <div className="w-10">{buttonStyle.icon}</div>
                    )}
                    Sign in with {provider.name}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

const getProviderButtonStyle = (provider: ClientSafeProvider) => {
  switch (provider.name) {
    case 'Discord':
      return {
        style: 'rounded-lg bg-indigo-600 text-white hover:bg-indigo-500',
        icon: <BsDiscord size={19} color="white" />
      };
    case 'GitHub':
      return {
        style: 'rounded-lg bg-gray-800 text-white hover:bg-gray-700',
        icon: <BsGithub size={19} color="white" />
      };
    case 'Google':
      return {
        style: 'rounded-lg bg-red-300 text-white',
        icon: <BsGoogle size={19} color="white" />,
        disabled: true
      };
    case 'Credentials':
      return {
        style: 'rounded-lg bg-gray-500 text-white w-52'
      };
    default:
      throw new Error(`Unknown provider: ${provider.name}`);
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const csrfToken = await getCsrfToken(context);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], csrfToken }
  };
}
