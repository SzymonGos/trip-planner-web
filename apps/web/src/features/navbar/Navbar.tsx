'use client';

import React from 'react';
import { NavbarSignInLink } from './NavbarSignInLink';
import { useUser } from '@clerk/nextjs';
import { UserMenu } from './UserMenu';
import Link from 'next/link';

import { Container } from '@/components/Container/Container';
import cx from 'classnames';
import { useScrollY } from '@/hooks/useScrollY';
import { usePathname } from 'next/navigation';
import { isFullWidthNavbar } from '@/lib/utils';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { navbarLinks } from './config';

interface NavbarClientProps {
  userName?: string | null;
  clerkId?: string | null;
}

export const Navbar = ({ userName, clerkId }: NavbarClientProps) => {
  const { isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();
  const isTripPages = pathname.startsWith('/trip/');
  const scrollY = useScrollY();

  return (
    <div
      data-testid="navbar"
      className={cx('fixed top-0 z-50 w-full py-6 font-primary font-medium', {
        'transition-colors duration-100 bg-tp-white-100 border-b-tp-gray-100 shadow-md': scrollY > 0,
        'border-b-tp-gray-100 bg-tp-white-100 shadow-md': isTripPages && scrollY >= 0,
      })}
    >
      <Container
        className={cx('flex', {
          '!max-w-none': isFullWidthNavbar(pathname),
        })}
      >
        <div data-testid="navbar-logo" className="flex items-center w-[150px] md:w-[200px]">
          <Link href="/">
            <Image src="/logo/routetripper-logo-2.svg" alt="route tripper logo" width={200} height={40} />
          </Link>
        </div>

        <div data-testid="navbar-navigation" className="flex gap-3 items-center ml-auto">
          <ul data-testid="navbar-links" className="flex gap-3">
            {navbarLinks.map((link) => (
              <li key={link.id} className={cx({ 'hidden md:block': !link.mobile })}>
                <Link href={link.url} className="hover:text-zinc-600" data-testid={`navbar-link-${link.id}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {isLoaded ? (
            <div data-testid="navbar-user-section" className="md:min-w-[157px] h-[38px]">
              {isSignedIn && userName ? (
                <UserMenu userName={userName} clerkId={clerkId} />
              ) : (
                <div data-testid="navbar-sign-in" className="flex items-center justify-center md:w-[157px] h-[38px]">
                  <NavbarSignInLink />
                </div>
              )}
            </div>
          ) : (
            <Skeleton data-testid="navbar-loading-skeleton" className="w-[56px] md:w-[157px] h-[38px]" />
          )}
        </div>
      </Container>
    </div>
  );
};
