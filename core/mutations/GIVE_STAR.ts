import { gql } from "apollo-boost";

export const GIVE_STAR = gql`
  mutation($toolId: String) {
    giveStar(toolId: $toolId)
  }
`;
