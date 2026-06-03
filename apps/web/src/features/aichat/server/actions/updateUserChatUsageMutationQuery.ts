import { gql } from '@apollo/client';

export const updateUserChatUsageMutationQuery = gql`
  mutation UpdateUser($updateUserWhere: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $updateUserWhere, data: $data) {
      aiChatUsageCount
    }
  }
`;
