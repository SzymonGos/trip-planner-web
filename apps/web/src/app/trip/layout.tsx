import React, { ReactNode } from 'react';
import { TripPageLayoutContainer } from '@/features/trip/TripPageLayoutContainer';

const TripPageLayout = ({ children }: { children: ReactNode }) => (
  <TripPageLayoutContainer>{children}</TripPageLayoutContainer>
);
export default TripPageLayout;
