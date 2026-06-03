import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/lib/providers/providers';
import { NavbarContainer } from '@/features/navbar/NavbarContainer';

export const metadata: Metadata = {
  title: 'Routetripper',
  description:
    'Routetripper is a trip planning platform that allows you to plan your trips and share them with your friends and family.',
  icons: {
    icon: '/routetripper.png',
  },
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body>
      <Providers>
        <NavbarContainer />
        {children}
      </Providers>
    </body>
  </html>
);
export default RootLayout;
