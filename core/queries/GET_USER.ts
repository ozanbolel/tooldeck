import { gql } from "apollo-boost";

export const GET_USER = gql`
  {
    user {
      id
      name
      avatarUrl
      role
    }
  }
`;
