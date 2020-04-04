import * as React from "react";
import css from "./Login.module.scss";
import LoginButtons, { TLoginButtonsController } from "../LoginButtons/LoginButtons";

const Login: React.FC<{ controller: TLoginButtonsController }> = ({ controller }) => {
  return (
    <div className={css.login}>
      <LoginButtons controller={controller} />
    </div>
  );
};

export default Login;
