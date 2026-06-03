import { gql } from '@apollo/client';

export const updateUserMutationQuery = gql`
  mutation updateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      username
      email
      profileImage {
        id
        publicUrl
        publicUrlTransformed
      }
    }
  }
`;
