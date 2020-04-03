import * as React from "react";
import css from "./Header.module.scss";
import { TextChanger } from "core/elements";
import LoginButtons from "../LoginButtons/LoginButtons";

const Header: React.FC = () => {
  return (
    <div className={css.header}>
      <div className={css.bg}>
        <div className={css.bgShade} />
      </div>

      <TextChanger data={["Color Palettes", "Code Snippets", "Utilities"]} containerClassName={css.changerContainer} textClassName={css.changer} />

      <div className={css.motto}>A place for your favorite tools.</div>

      <div className={css.login}>
        <LoginButtons />
      </div>
    </div>
  );
};

export default Header;
