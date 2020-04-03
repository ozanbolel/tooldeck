import * as React from "react";
import css from "./Promote.module.scss";

const Promote: React.FC = () => {
  return (
    <div className={css.promote}>
      <div className={css.section}>
        <img src="/landing/explore.png" draggable="false" />

        <div className={css.text}>
          <span>Explore New Tools</span>
        </div>
      </div>

      <div className={css.section}>
        <img src="/landing/view.png" draggable="false" />

        <div className={css.text}>
          <span>Preview</span>
        </div>
      </div>

      <div className={css.section}>
        <img src="/landing/add.png" draggable="false" />

        <div className={css.text}>
          <span>Add to Your Deck</span>
        </div>
      </div>

      <div className={css.section}>
        <img src="/landing/launch.png" draggable="false" />

        <div className={css.text}>
          <span>Launch In-App Tabs</span>
        </div>
      </div>
    </div>
  );
};

export default Promote;
