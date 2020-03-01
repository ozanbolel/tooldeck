import * as React from "react";
import { useSelector } from "react-redux";
import { TStore } from "core/types";
import css from "./HomeContainer.scss";

import Tabs from "../Tabs/Tabs";
import DeckContainer from "../DeckContainer/DeckContainer";
import WebFrame from "../WebFrame/WebFrame";

const HomeContainer: React.FC = () => {
  const currentTabId = useSelector((store: TStore) => store.home.currentTabId);

  return (
    <div className={css.home}>
      <div className={css.tabs}>
        <Tabs />
      </div>

      <div className={css.switch}>
        <DeckContainer hidden={currentTabId !== ""} />
        <WebFrame hidden={currentTabId === ""} />
      </div>
    </div>
  );
};

export default HomeContainer;
