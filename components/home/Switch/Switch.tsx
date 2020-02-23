import * as React from "react";
import css from "./Switch.scss";

import Deck from "../Deck/Deck";
import WebFrame from "../WebFrame/WebFrame";

const Switch: React.FC = () => {
  return (
    <div className={css.switch}>
      <Deck />
      <WebFrame />
    </div>
  );
};

export default Switch;
