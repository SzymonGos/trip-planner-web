'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { Container } from '@/components/Container/Container';
import { UserTripsListContainer } from '@/features/user/components/UserTripsListContainer';
import { Footer } from '@/components/Footer/Footer';
import { getUserDataByUsernameQuery } from '@/features/user/server/db/getUserDataQuery';
import { ProfileCardContainer } from '@/features/user/components/ProfileCardContainer';
import { StatisticsCardsContainer } from '@/features/user/components/StatisticsCardsContainer';

const UserPage = ({ params }: { params: { username: string } }) => {
  const { data } = useQuery(getUserDataByUsernameQuery, {
    variables: {
      username: params?.username?.trim(),
    },
  });

  return (
    <div className="min-h-svh pt-14">
      <Container className="h-full mt-10 px-0 grid grid-cols-4 lg:grid-cols-12 gap-8">
        <div className="col-span-full lg:col-span-3">
          <ProfileCardContainer userId={data?.user?.id} />
        </div>
        <div className="col-span-full lg:col-span-9">
          <StatisticsCardsContainer userId={data?.user?.id} />
          <UserTripsListContainer userId={data?.user?.id} username={data?.user?.username} />
        </div>
        <div className="mt-auto col-span-full">
          <Footer />
        </div>
      </Container>
    </div>
  );
};
export default UserPage;
