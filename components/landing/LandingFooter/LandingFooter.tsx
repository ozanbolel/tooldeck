import * as React from "react";
import { isProduction } from "core/config";
import ReactGA from "react-ga";
import css from "./LandingFooter.module.scss";

const LandingFooter: React.FC = () => {
  return (
    <div className={css.footer}>
      <div>
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

      <div>ToolDeck © 2020</div>
    </div>
  );
};

export default LandingFooter;
