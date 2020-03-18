import * as React from "react";
import css from "./Index.scss";

const Index: React.FC = () => {
  return (
    <a href="https://github.com/login/oauth/authorize?client_id=1bb4dcdce67b173ece58" target="_self">
      <button className={css.withGithub}>Login with GitHub</button>
    </a>
  );
};

export default Index;
