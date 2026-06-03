import { gql } from '@apollo/client';

export const getUserDataQuery = gql`
  query user($clerkId: String!) {
    user(where: { clerkId: $clerkId }) {
      id
      clerkId
      email
      username
    }
  }
`;
