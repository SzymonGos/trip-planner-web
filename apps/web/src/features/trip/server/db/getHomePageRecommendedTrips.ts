import { gql } from '@apollo/client';

export const getHomePageRecommededTripsQuery = gql`
  query trips {
    trips(take: 4) {
      id
      title
      description
      origin
      destination
      creator {
        id
        username
        profileImage {
          id
          publicUrl
          publicUrlTransformed
        }
      }
      distance
      estimatedDuration
      createdAt
      tripImages {
        id
        image {
          id
          publicUrl
          publicUrlTransformed
        }
      }
      status
    }
  }
`;
