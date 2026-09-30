'use client';

import React from 'react';
import { Container } from '@/components/Container/Container';
import { TripsList } from './TripsList';
import { getTripsQuery } from '../../server/queries/getTripsQuery';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { MultipleTripCardsLoader } from '../MultipleTripCardsLoader';

export const TripsLlistContainer = () => {
  const { data, isPending, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['trips'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getTripsQuery(pageParam),
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
  });

  const trips = data?.pages.flatMap((page) => page.content) ?? [];

  if (isPending) return <MultipleTripCardsLoader count={6} />;

  return (
    <Container>
      <div className="mt-10 w-full grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <TripsList trips={trips} />
        {hasNextPage && (
          <div className="col-span-full">
            <Button type="button" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};
