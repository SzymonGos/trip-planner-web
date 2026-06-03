import { gql } from '@apollo/client';

export const getUserIdByClerkIdQuery = gql`
  query getUserIdByClerkId($clerkId: String!) {
    user(where: { clerkId: $clerkId }) {
      id
      username
      profileImage {
        id
      }
    }
  }
`;
