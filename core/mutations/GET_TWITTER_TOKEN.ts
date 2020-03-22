import { gql } from "apollo-boost";

export const GET_TWITTER_TOKEN = gql`
  mutation {
    getTwitterToken
  }
`;
