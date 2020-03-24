import { gql } from "apollo-boost";

export const GET_USER = gql`
  {
    user {
      name
      avatarUrl
    }
    deck {
      toolIds
    }
  }
`;
