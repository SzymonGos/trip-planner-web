import { gql } from '@apollo/client';

export const getUserTripsQuery = gql`
  query trips($id: ID!) {
    trips(where: { creator: { id: { equals: $id } } }) {
      id
      title
      origin
      destination
      creator {
        id
        username
        profileImage {
          id
        }
      }
      tripImages {
        id
        image {
          id
        }
      }
      description
      distance
      estimatedDuration
      status
      createdAt
    }
  }
`;
