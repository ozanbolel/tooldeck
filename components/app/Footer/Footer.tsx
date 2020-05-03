import * as React from "react";
import css from "./Footer.module.scss";
import { useSelector } from "react-redux";
import { TStore } from "core/types";
import { useRouter } from "next/router";
import { isProduction } from "core/config";
import ReactGA from "react-ga";

const Footer: React.FC = () => {
  const currentTabId = useSelector((store: TStore) => store.tabs.currentTabId);
  const router = useRouter();

  const randomNum = React.useMemo(() => Math.random(), [currentTabId !== "", router.pathname]);

  return (
    <div className={css.footer}>
      <div className={currentTabId !== "" ? css.hidden : undefined}>
        {randomNum > 0.55 ? (
          <a
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
          </a>
        ) : (
          "#StaySafe"
        )}
      </div>

      <div>ToolDeck v1.3.2</div>
    </div>
  );
};

export default Footer;
