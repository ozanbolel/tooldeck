import { gql } from "apollo-boost";

export const LOGOUT = gql`
  mutation {
    logout
  }
`;
