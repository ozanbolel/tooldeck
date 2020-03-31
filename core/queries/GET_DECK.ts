import { gql } from "apollo-boost";

export const GET_DECK = gql`
  {
    deck {
      toolIds
    }
  }
`;
