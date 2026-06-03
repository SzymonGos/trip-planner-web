import { gql } from '@apollo/client';

export const getUserCompletedTripsQuery = gql`
  query completedTrips($id: ID!) {
    trips(where: { creator: { id: { equals: $id } } }) {
      id
      distance
      status
    }
  }
`;
