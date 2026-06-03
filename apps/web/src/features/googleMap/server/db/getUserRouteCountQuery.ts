import { gql } from '@apollo/client';

export const getUserRouteCountQuery = gql`
  query GetUserRouteCount($id: ID!) {
    user(where: { id: $id }) {
      id
      googleMapsRouteCount
      googleMapsRouteResetDate
    }
  }
`;
