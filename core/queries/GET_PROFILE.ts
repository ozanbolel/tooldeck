import { gql } from "apollo-boost";

export const GET_PROFILE = gql`
  query($userId: String) {
    profile(userId: $userId) {
      name
      avatarUrl
      twitterId
      githubId
    }
  }
`;
