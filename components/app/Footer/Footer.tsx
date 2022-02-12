import * as React from "react";
import css from "./Footer.module.scss";
import { useSelector } from "react-redux";
import { TStore } from "core/types";
import { isProduction } from "core/config";
import ReactGA from "react-ga";

const Footer: React.FC = () => {
  const { currentTabId, opened } = useSelector((store: TStore) => store.tabs);

  const currentTab = React.useCallback(
    opened.find((i) => i.id === currentTabId),
    [currentTabId]
  );

  return (
    <div className={css.footer}>
      {currentTabId === "" ? (
        <>
          <div>
            <a
              href="https://twitter.com/ozanbll"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                if (isProduction) {
                  ReactGA.event({ category: "Behavior", action: "Twitter Link Clicked" });
                }
              }}
            >
              Follow Me on Twitter
            </a>
          </div>

          <div>ToolDeck v2.4</div>
        </>
      ) : (
        <div>
          <span>Browsing: </span>
          <a href={"https://" + currentTab?.url} target="_blank" rel="noreferrer">
            {currentTab?.url}
          </a>
        </div>
      )}
    </div>
  );
};

export default Footer;
