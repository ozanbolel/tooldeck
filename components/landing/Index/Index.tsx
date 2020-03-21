import * as React from "react";
import css from "./Index.module.scss";
import { oauth } from "core/config";

const Index: React.FC = () => {
  return (
    <a href={`https://github.com/login/oauth/authorize?client_id=${oauth.github.clientId}`} target="_self">
      <button className={css.withGithub}>Login with GitHub</button>
    </a>
  );
};

export default Index;
