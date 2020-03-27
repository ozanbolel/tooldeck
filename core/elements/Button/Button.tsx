import * as React from "react";
import css from "./Button.module.scss";
import { Icon } from "../Icon/Icon";
import { Loading } from "../Loading/Loading";

type TButtonIcon = {
  name: string;
  position: "left" | "right";
  className?: string;
};

type TButton = React.FC<{
  label: string;
  icon?: TButtonIcon;
  loading?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: Function;
  disabled?: boolean;
}>;

export const Button: TButton = ({ label, icon, style, className, loading, onClick, disabled }) => {
  return (
    <button
      className={css.button + (className ? " " + className : "")}
      style={style}
      onClick={onClick ? () => onClick() : undefined}
      disabled={loading || disabled}
    >
      {icon?.position === "left" ? <Icon name={icon.name} className={icon.className} /> : null}

      {label}

      {icon?.position === "right" ? <Icon name={icon.name} className={icon.className} /> : null}

      <div className={css.shade + (loading ? " " + css.active : "")} />

      {loading ? (
        <div className={css.loader}>
          <Loading className={css.loaderIcon} />
        </div>
      ) : null}
    </button>
  );
};
