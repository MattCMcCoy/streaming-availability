'use client';

import { usePathname, useRouter } from 'next/navigation';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

export function RegisterBreadcrumb() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <Breadcrumbs className="self-start">
        <BreadcrumbItem
          onClick={() => router.push('/login')}
          color="secondary"
          size="lg"
        >
          Home
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => router.push('/register')}
          isCurrent={pathname === '/register'}
          color="secondary"
          size="lg"
        >
          Register
        </BreadcrumbItem>
        <BreadcrumbItem
          isCurrent={pathname === '/register/profile'}
          isDisabled
          color="secondary"
          size="lg"
        >
          Create Profile
        </BreadcrumbItem>
      </Breadcrumbs>
    </>
  );
}
