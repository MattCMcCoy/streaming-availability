'use client';

import { type BuiltInProviderType } from 'next-auth/providers/index';
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn
} from 'next-auth/react';

import { BsDiscord, BsGithub, BsGoogle } from 'react-icons/bs';
import { Button } from '~/app/components/button';

export function ProviderButtons({
  providers
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  if (providers === null) return null;
  return (
    <>
      {Object.values(providers)
        .filter((p) => !p.name.includes('credentials'))
        .map((provider) => {
          const buttonStyle = getProviderButtonStyle(provider);
          return (
            <div key={provider.name}>
              <Button
                className={`mb-4 flex w-52 items-center p-2 font-semibold ${buttonStyle.style}`}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
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
    </>
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
