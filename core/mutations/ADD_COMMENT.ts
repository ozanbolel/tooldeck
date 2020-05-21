import { gql } from "apollo-boost";

export const ADD_COMMENT = gql`
  mutation($toolId: String, $text: String) {
    addComment(toolId: $toolId, text: $text)
  }
`;
