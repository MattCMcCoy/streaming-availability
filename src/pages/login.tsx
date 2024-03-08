import { useState } from 'react';

import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType
} from 'next';

import { getServerSession } from 'next-auth';
import { type ClientSafeProvider, getProviders, signIn } from 'next-auth/react';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { BsDiscord, BsGithub, BsGoogle } from 'react-icons/bs';
import { Button } from '~/components/ui/button';
import { authOptions } from '~/server/auth';

import { InputForm } from '../components/auth/Authentication';
import { TopNav } from '../components/topnav';

export default function LogIn({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [showRegisterUserForm, setShowRegisterUserForm] = useState(false);

  return (
    <div>
      <TopNav />
      <div className="mx-auto flex h-[80vh] w-fit flex-col items-center justify-center space-y-5 self-center align-middle">
        {showRegisterUserForm && (
          <Breadcrumbs className="self-start">
            <BreadcrumbItem
              onClick={() => setShowRegisterUserForm(false)}
              color="secondary"
              size="lg"
            >
              Home
            </BreadcrumbItem>
            <BreadcrumbItem
              isCurrent={showRegisterUserForm}
              color="secondary"
              size="lg"
            >
              Register
            </BreadcrumbItem>
          </Breadcrumbs>
        )}
        <div className="flex flex-col">
          <InputForm
            setShowRegisterUserForm={setShowRegisterUserForm}
            showRegisterUserForm={showRegisterUserForm}
          />
        </div>
        {!showRegisterUserForm && (
          <>
            <div className="flex">
              <div className="mr-2 mt-3 w-10 border-t border-white" />
              <p className="text-lg text-white">Or Sign In With</p>
              <div className="ml-2 mt-3 w-10 border-t border-white" />
            </div>
            <div className="pt-4">
              {Object.values(providers)
                .filter((p) => !p.name.includes('credentials'))
                .map((provider) => {
                  const buttonStyle = getProviderButtonStyle(provider);
                  return (
                    <div key={provider.name}>
                      <Button
                        className={`mb-4 flex w-52 items-center p-2 font-semibold ${buttonStyle.style}`}
                        onClick={() => signIn(provider.id)}
                        disabled={buttonStyle.disabled}
                      >
                        {buttonStyle.icon && (
                          <div className="w-10">{buttonStyle.icon}</div>
                        )}
                        Sign in with {provider.name}
                      </Button>
                    </div>
                  );
                })}
            </div>
          </>
        )}
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
        style: 'rounded-lg bg-red-500 text-white',
        icon: <BsGoogle size={19} color="white" />,
        disabled: true
      };
    default:
      throw new Error(`Unknown provider: ${provider.name}`);
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] }
  };
}
