import { gql } from '@apollo/client';

export const getUserUsageQuery = gql`
  query GetUserUsage($id: ID!) {
    user(where: { id: $id }) {
      id
      aiChatUsageCount
      aiChatUsageResetDate
    }
  }
`;
