import * as React from "react";
import { Icon } from "core/elements";
import css from "./Nameplate.module.scss";

type TNameplate = React.FC<{
  label: string;
  className?: string;
  onClickDel?: Function;
}>;

const Nameplate: TNameplate = ({ label, className, onClickDel }) => {
  return (
    <div className={css.container + (className ? " " + className : "")}>
      <div className={css.label}>
        <span>{label}</span>
      </div>

      {onClickDel ? (
        <div className={css.options} onClick={() => onClickDel()}>
          <Icon name="trash-2" className={css.icon} />
        </div>
      ) : null}
    </div>
  );
};

export default Nameplate;
