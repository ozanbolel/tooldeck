import * as React from "react";
import css from "./Footer.module.scss";
import { useSelector } from "react-redux";
import { TStore } from "core/types";

const Footer: React.FC = () => {
  const currentTabId = useSelector((store: TStore) => store.tabs.currentTabId);

  const randomNum = React.useMemo(() => Math.random(), [currentTabId !== ""]);

  return (
    <div className={css.footer}>
      <div className={currentTabId !== "" ? css.hidden : undefined}>
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
