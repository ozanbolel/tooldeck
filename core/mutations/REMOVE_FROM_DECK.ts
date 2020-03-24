import { gql } from "apollo-boost";

export const REMOVE_FROM_DECK = gql`
  mutation($toolId: String) {
    removeFromDeck(toolId: $toolId)
  }
`;
