import { gql } from "apollo-boost";

export const GET_COMMENTS = gql`
  query($toolId: String) {
    comments(toolId: $toolId) {
      id
      userId
      text
      createdAt
    }
  }
`;
