import React, { FC, ReactNode } from 'react';
import { DirectionsProvider } from '../contexts/DirectionsContext';
import { ClerkProvider } from '@clerk/nextjs';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CLERK_PUBLISHABLE_KEY } from '../config';
import QueryProvider from './QueryProvider';

type TProvidersProps = {
  children: ReactNode;
};

export const Providers: FC<TProvidersProps> = ({ children }) => (
  <>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <QueryProvider>
        <DirectionsProvider>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </DirectionsProvider>
      </QueryProvider>
    </ClerkProvider>
  </>
);
