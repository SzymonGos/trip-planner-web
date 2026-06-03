import { gql } from '@apollo/client';

export const deleteTripMutationQuery = gql`
  mutation deleteTrip($where: TripWhereUniqueInput!) {
    deleteTrip(where: $where) {
      id
      title
      tripImages {
        id
        image {
          id
        }
      }
    }
  }
`;
