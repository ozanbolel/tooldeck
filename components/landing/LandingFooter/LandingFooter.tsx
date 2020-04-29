import * as React from "react";
import css from "./LandingFooter.module.scss";

const LandingFooter: React.FC = () => {
  return (
    <div className={css.footer}>
      <div>
        <a href="https://twitter.com/oznbll" target="_blank" rel="noreferrer">
          Follow Me on Twitter
        </a>
      </div>

      <div>ToolDeck © 2020</div>
    </div>
  );
};

export default LandingFooter;
