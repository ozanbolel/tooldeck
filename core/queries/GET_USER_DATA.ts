import { gql } from "apollo-boost";

export const GET_USER_DATA = gql`
  {
    user {
      name
      avatarUrl
      role
    }
    deck {
      toolIds
    }
  }
`;
