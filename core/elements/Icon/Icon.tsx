import * as React from "react";
import css from "./Icon.scss";

type TIcon = React.FC<{
  name: string;
  style?: React.CSSProperties;
  className?: string;
}>;

export const Icon: TIcon = ({ name, style, className }) => {
  const iconHref = "/static/icons.svg#" + name;

  return (
    <svg className={css.icon + (className ? " " + className : "")} style={style ? style : undefined}>
      <use href={iconHref} xlinkHref={iconHref} />
    </svg>
  );
};
