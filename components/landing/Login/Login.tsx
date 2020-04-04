import * as React from "react";
import css from "./Login.module.scss";
import LoginButtons, { TLoginButtonsController } from "../LoginButtons/LoginButtons";

const Login: React.FC<{ controller: TLoginButtonsController }> = ({ controller }) => {
  return (
    <>
      <div className={css.login}>
        <div className={css.title}>
          Get Started, It's <span className={css.highlight}>Free</span>
        </div>

        <div className={css.divider} />

        <LoginButtons controller={controller} />
      </div>

      <div className={css.info}>
        * Social integrations are for authentication purposes only. ToolDeck does <span className={css.highlight}>not</span> use your account in any other way.
      </div>
    </>
  );
};

export default Login;
