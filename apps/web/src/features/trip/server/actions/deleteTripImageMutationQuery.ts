import { gql } from '@apollo/client';

export const deleteTripImageMutationQuery = gql`
  mutation deleteTripImage($where: TripImageWhereUniqueInput!) {
    deleteTripImage(where: $where) {
      id
    }
  }
`;
