import * as React from "react";
import css from "./Button.module.scss";
import { Icon } from "../Icon/Icon";

type TButton = React.FC<{
  label: string;
  iconName?: string;
  className?: string;
  onClick?: Function;
}>;

export const Button: TButton = ({ label, iconName, className, onClick }) => {
  return (
    <div className={css.button + (className ? " " + className : "")} onClick={onClick ? () => onClick() : undefined}>
      {label}
      {iconName ? <Icon name={iconName} /> : null}
    </div>
  );
};
