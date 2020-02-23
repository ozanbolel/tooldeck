import * as React from "react";
import { useSelector } from "react-redux";
import { store } from "core/store";
import { Web } from "core/elements";
import css from "./WebFrame.scss";

const WebFrame: React.FC = () => {
  const { tabs, currentTabId } = useSelector((store: store) => store.home);

  return (
    <div className={css.webFrame} style={currentTabId === "" ? { display: "none" } : {}}>
      {tabs.map((i) => (
        <Web key={i.id} url={i.url} show={currentTabId === i.id} />
      ))}
    </div>
  );
};

export default WebFrame;
