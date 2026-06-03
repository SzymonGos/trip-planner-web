import { gql } from '@apollo/client';

export const updateUserRouteCountMutationQuery = gql`
  mutation UpdateUser($updateUserWhere: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $updateUserWhere, data: $data) {
      id
      googleMapsRouteCount
    }
  }
`;
