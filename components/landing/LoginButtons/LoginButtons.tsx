import * as React from "react";
import { oauth } from "core/config";
import { useMutation } from "@apollo/react-hooks";
import { GET_TWITTER_TOKEN } from "core/mutations";
import { Button } from "core/elements";
import css from "./LoginButtons.module.scss";

export type TLoginButtonsController = {
  isGithubClicked: boolean;
  setIsGithubClicked: Function;
  isTwitterClicked: boolean;
  setIsTwitterClicked: Function;
};

type TLoginButtons = React.FC<{
  controller: TLoginButtonsController;
}>;

const LoginButtons: TLoginButtons = ({ controller }) => {
  const [getTwitterToken] = useMutation(GET_TWITTER_TOKEN);
  const { isGithubClicked, setIsGithubClicked, isTwitterClicked, setIsTwitterClicked } = controller;

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
    <>
      <div className={css.login}>
        <Button
          label="Login with Twitter"
          icon={{ name: "twitter", position: "left", className: css.icon }}
          className={css.withTwitter}
          onClick={() => onClickTwitter()}
          loading={isTwitterClicked}
          disabled={isTwitterClicked || isGithubClicked}
        />

        <Button
          label="Login with GitHub"
          icon={{ name: "github", position: "left", className: css.icon }}
          className={css.withGithub}
          onClick={() => onClickGithub()}
          loading={isGithubClicked}
          disabled={isTwitterClicked || isGithubClicked}
        />
      </div>
    </>
  );
};

export default LoginButtons;
