import * as React from "react";
import { useSelector } from "react-redux";
import { TStore } from "core/types";
import { Web } from "core/elements";
import css from "./WebFrame.scss";

const WebFrame: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  const tabs = useSelector((store: TStore) => store.tabs.opened);
  const currentTabId = useSelector((store: TStore) => store.tabs.currentTabId);

  return (
    <div className={css.webFrame + (hidden ? " " + css.hidden : "")}>
      {tabs.map((i) => (
        <Web key={i.id} url={i.url} show={currentTabId === i.id} />
      ))}
    </div>
  );
};

export default WebFrame;
