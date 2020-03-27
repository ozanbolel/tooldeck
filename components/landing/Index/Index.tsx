import * as React from "react";
import css from "./Index.module.scss";
import { oauth } from "core/config";
import { useMutation } from "@apollo/react-hooks";
import { GET_TWITTER_TOKEN } from "core/mutations";
import { Icon, Button } from "core/elements";

const Index: React.FC = () => {
  const [getTwitterToken] = useMutation(GET_TWITTER_TOKEN);
  const [isGithubClicked, setIsGithubClicked] = React.useState(false);
  const [isTwitterClicked, setIsTwitterClicked] = React.useState(false);

  const onClickGithub = () => {
    setIsGithubClicked(true);

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${oauth.github.clientId}`;
  };

  const onClickTwitter = async () => {
    setIsTwitterClicked(true);

    const { data } = await getTwitterToken();

    window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${data.getTwitterToken}`;
  };

  return (
    <div className={css.container}>
      <div className={css.title}>Welcome to ToolDeck</div>

      <div className={css.desc}>We don't have a landing page, but we have login buttons...</div>

      <div className={css.login}>
        <Button
          label="Login with GitHub"
          icon={{ name: "github", position: "left", className: css.icon }}
          className={css.withGithub}
          onClick={() => onClickGithub()}
          loading={isGithubClicked}
          disabled={isTwitterClicked || isGithubClicked}
        />

        <Button
          label="Login with Twitter"
          icon={{ name: "twitter", position: "left", className: css.icon }}
          className={css.withTwitter}
          onClick={() => onClickTwitter()}
          loading={isTwitterClicked}
          disabled={isTwitterClicked || isGithubClicked}
        />
      </div>
    </div>
  );
};

export default Index;
