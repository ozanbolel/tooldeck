import { gql } from "apollo-boost";

export const UPDATE_TOOL = gql`
  mutation(
    $toolId: String
    $label: String
    $shortDesc: String
    $desc: String
    $cat: String
    $url: String
    $iconUrl: String
    $coverUrl: String
    $external: Boolean
  ) {
    updateTool(
      toolId: $toolId
      label: $label
      shortDesc: $shortDesc
      desc: $desc
      cat: $cat
      url: $url
      iconUrl: $iconUrl
      coverUrl: $coverUrl
      external: $external
    )
  }
`;
