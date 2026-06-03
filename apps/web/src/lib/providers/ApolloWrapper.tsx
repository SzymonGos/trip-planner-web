'use client';

import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { GRAPHQL_API_URL } from '../config';

const client = () => {
  const uploadLink = createUploadLink({
    uri: GRAPHQL_API_URL,
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
    credentials: 'include',
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: uploadLink,
  });
};

export const ApolloWrapper = ({ children }: React.PropsWithChildren) => (
  <ApolloNextAppProvider makeClient={client}>{children}</ApolloNextAppProvider>
);
