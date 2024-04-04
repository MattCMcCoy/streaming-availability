import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions
} from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import { decode, encode } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { env } from '~/env';
import { db } from '~/server/db';

import { type UserRole } from './api/models/User';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: UserRole;
    } & DefaultSession['user'];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  jwt: { encode, decode },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: '',
      clientSecret: ''
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const exists = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!exists) {
          console.log('Email not found');
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          exists.password ?? ''
        );

        if (!passwordMatch) {
          console.log('Password does not match');
          return null;
        }

        return exists;
      }
    })
  ],

  // TODO: Add custom error page (https://next-auth.js.org/configuration/pages#error-redirect)
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  callbacks: {
    jwt: ({ token, account, user }) => {
      if (account) {
        token.account = account;
        token.id = user?.id;
      }

      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        role: token.role
      }
    })
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
