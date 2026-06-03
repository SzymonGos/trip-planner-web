import { Footer } from '@/components/Footer/Footer';
import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="h-svh bg-tp-white-100 flex flex-col">
    <div className="flex items-center justify-center px-4">{children}</div>
    <Footer />
  </div>
);

export default AuthLayout;
