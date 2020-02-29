import * as React from "react";
import css from "./Nest.scss";

type TNest = React.FC<{
  className: string;
}>;

export const Nest: TNest = ({ children, className }) => {
  return <div className={css.nest + (className ? " " + className : "")}>{children}</div>;
};
