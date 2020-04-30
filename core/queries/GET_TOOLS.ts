import { gql } from "apollo-boost";

export const GET_TOOLS = gql`
  {
    tools {
      id
      label
      shortDesc
      desc
      cat
      subCat
      url
      iconUrl
      coverUrl
      external
      users
      stars
      createdAt
    }
  }
`;
