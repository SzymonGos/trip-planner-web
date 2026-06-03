import { Container } from '@/components/Container/Container';
import React from 'react';
import { UserSettingsContainer } from '@/features/user/components/UserSettingsContainer';
import { forceSignIn } from '@/lib/auth/forceSignIn';
import { Footer } from '@/components/Footer/Footer';

const UserSettingsPage = async () => {
  await forceSignIn('/user/settings');

  return (
    <section className="mt-40">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-10 text-4xl">Personal Information</h1>
          <UserSettingsContainer />
        </div>
      </Container>
      <Footer />
    </section>
  );
};

export default UserSettingsPage;
