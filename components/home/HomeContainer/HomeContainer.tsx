import * as React from "react";
import css from "./HomeContainer.scss";

import Tabs from "../Tabs/Tabs";
import Switch from "../Switch/Switch";

const HomeContainer: React.FC = () => {
  return (
    <div className={css.home}>
      <div className={css.tabs}>
        <Tabs />
      </div>

      <div className={css.switch}>
        <Switch />
      </div>
    </div>
  );
};

export default HomeContainer;
