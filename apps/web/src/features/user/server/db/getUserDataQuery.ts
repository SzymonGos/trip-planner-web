import { gql } from '@apollo/client';

export const getUserDataQuery = gql`
  query user($id: ID!) {
    user(where: { id: $id }) {
      id
      email
      username
      profileImage {
        id
        filename
        publicUrl
        publicUrlTransformed
      }
      createdAt
    }
  }
`;

export const getUserDataByUsernameQuery = gql`
  query user($username: String!) {
    user(where: { username: $username }) {
      id
      username
    }
  }
`;
