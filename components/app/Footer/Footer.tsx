import * as React from "react";
import css from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={css.footer}>
      <div>#StaySafe</div>
      <div>ToolDeck v1.1</div>
    </div>
  );
};

export default Footer;
