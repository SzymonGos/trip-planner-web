import { gql } from '@apollo/client';

export const getTripQuery = gql`
  query trip($id: ID!) {
    trip(where: { id: $id }) {
      id
      title
      description
      origin
      destination
      createdAt
      tripImages {
        id
        image {
          id
          filename
        }
      }
      distance
      estimatedDuration
      status
      creator {
        id
        username
        profileImage {
          id
        }
      }
    }
  }
`;
