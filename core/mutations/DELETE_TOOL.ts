import { gql } from "apollo-boost";

export const DELETE_TOOL = gql`
  mutation($toolId: String) {
    deleteTool(toolId: $toolId)
  }
`;
