import { gql } from "apollo-boost";

export const CREATE_TOOL = gql`
  mutation($label: String, $shortDesc: String, $desc: String, $cat: String, $url: String, $iconUrl: String, $coverUrl: String, $external: Boolean) {
    createTool(label: $label, shortDesc: $shortDesc, desc: $desc, cat: $cat, url: $url, iconUrl: $iconUrl, coverUrl: $coverUrl, external: $external)
  }
`;
