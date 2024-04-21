'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { type Session } from 'next-auth';

import { api } from '~/trpc/react';

import { toast } from '../lib/components/toast/use-toast';

export default function UserTable({ session }: { session: Session | null }) {
  const router = useRouter();
  const { data: user } = api.user.getUser.useQuery({
    userId: session?.user.id ?? ''
  });

  const { data: users } = api.user.getUsers.useQuery();

  useEffect(() => {
    console.log(user);
    if (user && user.role !== 'ADMIN') {
      router.push('/');

      toast({
        title: 'You are not authorized to view this page.',
        variant: 'destructive'
      });
    }
  }, [router, user]);

  if (!session) {
    router.push('/');

    toast({
      title: 'You are not authorized to view this page.',
      variant: 'destructive'
    });

    return null;
  }

  return (
    user &&
    user.role === 'ADMIN' && (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u, index) => (
              <tr
                className={
                  index % 2 == 0
                    ? 'border-b border-gray-800 bg-gray-800 text-white'
                    : 'border-b border-gray-900 bg-gray-900 text-white'
                }
                key={u.id}
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-white"
                >
                  {u.id}
                </th>
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.role}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
