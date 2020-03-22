import { gql } from "apollo-boost";

export const LOGIN_WITH_TWITTER = gql`
  mutation($oauth_token: String, $oauth_verifier: String) {
    loginWithTwitter(oauth_token: $oauth_token, oauth_verifier: $oauth_verifier)
  }
`;
