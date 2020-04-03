import * as React from "react";
import css from "./Header.module.scss";
import { TextChanger } from "core/elements";
import LoginButtons, { TLoginButtonsController } from "../LoginButtons/LoginButtons";

const Header: React.FC<{ controller: TLoginButtonsController }> = ({ controller }) => {
  return (
    <div id="header" className={css.header}>
      <div className={css.bg}>
        <div className={css.bgShade} />
      </div>

      <TextChanger data={["Color Palettes", "Code Snippets", "Utilities"]} containerClassName={css.changerContainer} textClassName={css.changer} />

      <div className={css.motto}>A place for your favorite tools.</div>

      <div className={css.login}>
        <LoginButtons controller={controller} />
      </div>
    </div>
  );
};

export default Header;
