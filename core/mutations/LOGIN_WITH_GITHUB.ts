import { gql } from "apollo-boost";

export const LOGIN_WITH_GITHUB = gql`
  mutation($code: String) {
    loginWithGithub(code: $code)
  }
`;
