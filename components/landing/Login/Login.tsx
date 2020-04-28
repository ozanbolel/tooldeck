import * as React from "react";
import css from "./Login.module.scss";
import LoginButtons, { TLoginButtonsController } from "../LoginButtons/LoginButtons";

const Login: React.FC<{ controller: TLoginButtonsController }> = ({ controller }) => {
  return (
    <>
      <div className={css.login}>
        <div className={css.title}>Get Started</div>

        <div className={css.divider} />

        <div className={css.loginButtons}>
          <LoginButtons controller={controller} />
        </div>
      </div>

      <div className={css.info}>
        * Social integrations are for authentication purposes only. ToolDeck does <span className={css.highlight}>not</span> use your account in any other way.
      </div>
    </>
  );
};

export default Login;
