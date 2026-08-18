'use client';

import React, { type FC } from 'react';
import { ProfileCardContainer } from './ProfileCardContainer';
import { Container } from '@/components/Container/Container';
import { StatisticsCardsContainer } from './StatisticsCardsContainer';
import { UserTripsListContainer } from './UserTripsListContainer';
import { Footer } from '@/components/Footer/Footer';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';
import { useQuery } from '@tanstack/react-query';
import { getUserByUsernameQuery } from '@/features/user/server/queries/getUserByUsernameQuery';

type TUserPageContainerProps = {
  username: string;
};

const UserPageContainer: FC<TUserPageContainerProps> = ({ username }) => {
  const { authUserId } = useAuthenticatedUser();
  const { data, isPending } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserByUsernameQuery(username),
  });

  const isOwnProfile = authUserId === data?.id;

  return (
    <div className="min-h-svh pt-14">
      <Container className="h-full mt-10 px-0 grid grid-cols-4 lg:grid-cols-12 gap-8">
        <div className="col-span-full lg:col-span-3">
          <ProfileCardContainer
            profileImage={data?.profileImagePublicId}
            username={username}
            isOwnProfile={isOwnProfile}
            createdAt={data?.createdAt}
            isLoading={isPending}
          />
          {/* <ProfileCardContainer userId={data.id} /> */}
        </div>
        <div className="col-span-full lg:col-span-9">
          {/* <StatisticsCardsContainer userId={data?.id} trips={data?.trips} /> */}
          {/* <UserTripsListContainer userId={data?.id} username={data?.username} /> */}
        </div>
        <div className="mt-auto col-span-full">
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default UserPageContainer;
