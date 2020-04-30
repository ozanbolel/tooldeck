import * as React from "react";
import css from "./Footer.module.scss";

const Footer: React.FC = () => {
  const randomNum = React.useMemo(() => Math.random(), []);

  return (
    <div className={css.footer}>
      <div>
        {randomNum > 0.55 ? (
          <a href="https://twitter.com/oznbll" target="_blank" rel="noreferrer">
            Follow Me on Twitter
          </a>
        ) : (
          "#StaySafe"
        )}
      </div>
      <div>ToolDeck v1.3</div>
    </div>
  );
};

export default Footer;
