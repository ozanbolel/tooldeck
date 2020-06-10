import * as React from "react";
import css from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={css.container}>
      <div className={css.text}>This page could not be found.</div>
    </div>
  );
};

export default NotFound;
