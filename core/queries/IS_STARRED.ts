import { gql } from "apollo-boost";

export const IS_STARRED = gql`
  query($toolId: String) {
    isStarred(toolId: $toolId)
  }
`;
