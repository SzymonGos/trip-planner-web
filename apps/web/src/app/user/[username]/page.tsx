import React from 'react';
import UserPageContainer from '@/features/user/components/UserPageContainer';

type UserPageProps = {
  params: Promise<{
    username: string;
  }>;
};

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  return <UserPageContainer username={username} />;
};
export default UserPage;
