import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { HttpLink } from '@apollo/client';
import { GRAPHQL_API_URL } from './config';

export const { getClient, query, PreloadQuery } = registerApolloClient(
  () =>
    new ApolloClient({
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              trips: {
                merge(_, incoming) {
                  return incoming;
                },
              },
            },
          },
        },
      }),
      link: new HttpLink({
        uri: GRAPHQL_API_URL,
        credentials: 'include',
      }),
    }),
);
