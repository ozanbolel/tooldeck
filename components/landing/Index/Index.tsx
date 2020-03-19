import * as React from "react";
import css from "./Index.scss";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const USER = gql`
  {
    user {
      name
    }
  }
`;

const Index: React.FC = () => {
  const { data, error } = useQuery(USER, { fetchPolicy: "no-cache" });

  return (
    <a href="https://github.com/login/oauth/authorize?client_id=1bb4dcdce67b173ece58" target="_self">
      <button className={css.withGithub}>Login with GitHub</button>

      <div>name: {data?.user?.name}</div>
    </a>
  );
};

export default Index;
