import * as React from "react";
import { isProduction } from "core/config";
import { Button } from "core/elements";
import ReactGA from "react-ga";
import css from "./InstallBanner.module.scss";

const InstallBanner: React.FC = () => {
  const [prompt, setPrompt] = React.useState<any>();

  React.useEffect(() => {
    const INSTALL_PROMPT = localStorage.getItem("INSTALL_PROMPT");

    if (!INSTALL_PROMPT) {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();

        setPrompt(event);
      });

      window.addEventListener("appinstalled", (event) => {
        setPrompt(null);

        if (isProduction) {
          ReactGA.event({ category: "App", action: "Installed" });
        }
      });
    }
  }, []);

  const onClickHide = () => {
    localStorage.setItem("INSTALL_PROMPT", new Date().getTime().toString());

    setPrompt(null);
  };

  if (prompt) {
    return (
      <div className={css.container}>
        <div className={css.inner}>
          <div className={css.text}>Install ToolDeck to Boost Your Productivity 🚀</div>
          <div className={css.desc}>With its in-app tabs, ToolDeck works best when installed.</div>

          <div className={css.actions}>
            <Button icon={{ name: "download", position: "left" }} label="INSTALL" className={css.button} onClick={() => prompt.prompt()} />

            <button className={css.hide} onClick={() => onClickHide()}>
              HIDE
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default InstallBanner;
