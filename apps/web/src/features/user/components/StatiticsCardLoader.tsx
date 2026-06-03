import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const StatiticsCardLoader = () => (
  <div className="grid grid-flow-row lg:grid-flow-col gap-4">
    <Skeleton className="mb-8 h-[100px]" />
    <Skeleton className="mb-8 h-[100px]" />
  </div>
);
