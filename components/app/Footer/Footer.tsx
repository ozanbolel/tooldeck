import * as React from "react";
import css from "./Footer.module.scss";
import { useSelector } from "react-redux";
import { TStore } from "core/types";
import { isProduction } from "core/config";
import ReactGA from "react-ga";

const Footer: React.FC = () => {
  const currentTabId = useSelector((store: TStore) => store.tabs.currentTabId);

  return (
    <div className={css.footer}>
      <div className={currentTabId !== "" ? css.hidden : undefined}>
        {/*         <a
          href="https://twitter.com/tooldeckhq"
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            if (isProduction) {
              ReactGA.event({ category: "Behavior", action: "Twitter Link Clicked" });
            }
          }}
        >
          Follow on Twitter
        </a> */}

        <a
          href="https://blacklivesmatter.com"
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            if (isProduction) {
              ReactGA.event({ category: "Behavior", action: "BLM Link Clicked" });
            }
          }}
        >
          #BlackLivesMatter
        </a>
      </div>

      <div>ToolDeck v2.1</div>
    </div>
  );
};

export default Footer;
