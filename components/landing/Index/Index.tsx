import * as React from "react";
import css from "./Index.module.scss";
import { oauth } from "core/config";
import { useMutation } from "@apollo/react-hooks";
import { GET_TWITTER_TOKEN } from "core/mutations";
import { Icon } from "core/elements";

const Index: React.FC = () => {
  const [getTwitterToken, { data }] = useMutation(GET_TWITTER_TOKEN);

  const onClickGithub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${oauth.github.clientId}`;
  };

  const onClickTwitter = () => {
    getTwitterToken();
  };

  React.useEffect(() => {
    if (data) {
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${data.getTwitterToken}`;
    }
  }, [data]);

  return (
    <div className={css.container}>
      <div className={css.title}>Welcome to ToolDeck</div>

      <div className={css.desc}>We don't have a landing page, just login for now...</div>

      <div className={css.login}>
        <button className={css.withGithub} onClick={() => onClickGithub()}>
          <Icon name="github" /> Login with GitHub
        </button>

        <button className={css.withTwitter} onClick={() => onClickTwitter()}>
          <Icon name="twitter" />
          Login with Twitter
        </button>
      </div>
    </div>
  );
};

export default Index;
