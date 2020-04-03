import * as React from "react";
import css from "./Topbar.module.scss";

const Topbar: React.FC = () => {
  return (
    <div className={css.topbar}>
      <div>
        <img src="/favicon.png" className={css.logo} draggable="false" />
      </div>
    </div>
  );
};

export default Topbar;
