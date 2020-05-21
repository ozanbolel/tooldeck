import { gql } from "apollo-boost";

export const GET_FEED = gql`
  {
    feed {
      id
      type
      userId
      toolId
      commentId
      createdAt
    }
  }
`;
