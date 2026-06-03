import { gql } from '@apollo/client';

export const deleteUserMutationQuery = gql`
  mutation DeleteUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      isDeleted
      deletedAt
    }
  }
`;
