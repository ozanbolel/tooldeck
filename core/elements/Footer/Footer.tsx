import * as React from "react";
import css from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <div className={css.footer}>
      <div>#StayHome</div>
      <div>ToolDeck v1.0</div>
    </div>
  );
};
