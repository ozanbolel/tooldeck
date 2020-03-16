import * as React from "react";
import css from "./Nest.scss";

type TNest = React.FC<{
  className?: string;
  noVerticalPadding?: boolean;
}>;

export const Nest: TNest = ({ children, className, noVerticalPadding }) => {
  return <div className={css.nest + (className ? " " + className : "") + (noVerticalPadding ? " " + css.noVerticalPadding : "")}>{children}</div>;
};
