import * as React from "react";
import css from "./Header.module.scss";
import { TextChanger } from "core/elements";
import LoginButtons, { TLoginButtonsController } from "../LoginButtons/LoginButtons";
import { categories } from "core/config";

const Header: React.FC<{ controller: TLoginButtonsController }> = ({ controller }) => {
  return (
    <div id="header" className={css.header}>
      <div className={css.bg}>
        <div className={css.bgShade} />
      </div>

      <TextChanger data={categories.map((i) => i.label)} containerClassName={css.changerContainer} textClassName={css.changer} />

      <div className={css.motto}>Launchpad for your favorite tools.</div>

      <div className={css.divider} />

      <LoginButtons controller={controller} />
    </div>
  );
};

export default Header;
