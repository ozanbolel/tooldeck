import { gql } from "apollo-boost";

export const ADD_TO_DECK = gql`
  mutation($toolId: String) {
    addToDeck(toolId: $toolId)
  }
`;
