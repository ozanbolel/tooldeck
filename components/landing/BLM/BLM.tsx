import * as React from "react";
import css from "./BLM.module.scss";

const BLM: React.FC = () => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);

  React.useEffect(() => {
    const timeReady = 4000;

    setTimeout(() => {
      setIsClosing(true);
    }, timeReady);

    setTimeout(() => {
      setIsHidden(true);
    }, timeReady + 600);
  }, []);

  if (!isHidden) {
    return (
      <div className={css.container + (isClosing ? " " + css.closing : "")}>
        <div className={css.text} style={{ animationDelay: "0.6s" }}>
          BLACK
        </div>

        <div className={css.text} style={{ animationDelay: "1s" }}>
          LIVES
        </div>

        <div className={css.text + " " + css.longerDuration} style={{ animationDelay: "1.6s" }}>
          MATTER
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default BLM;
