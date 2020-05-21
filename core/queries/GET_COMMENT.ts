import { gql } from "apollo-boost";

export const GET_COMMENT = gql`
  query($commentId: String) {
    comment(commentId: $commentId) {
      text
    }
  }
`;
