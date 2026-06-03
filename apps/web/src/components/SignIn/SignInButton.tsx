'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import cx from 'classnames';
import { getSanitizedRedirectUrl } from '@/features/aichat/helpers/getSanitizedRedirectUrl';
import { usePathname } from 'next/navigation';

type TSignInButtonProps = {
  className?: string;
};

export const SignInButton: FC<TSignInButtonProps> = ({ className }) => {
  const pathname = usePathname();

  return (
    <Link href={getSanitizedRedirectUrl(pathname)}>
      <Button
        size="sm"
        className={cx('mt-2 bg-zinc-400 hover:bg-zinc-500 text-white w-[200px]', className)}
        data-testid="sign-in-button"
      >
        Sign In
      </Button>
    </Link>
  );
};
