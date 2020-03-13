import * as React from "react";
import { Icon } from "core/elements";
import css from "./Nameplate.scss";

type TNameplate = React.FC<{
  label: string;
  className?: string;
  explore?: boolean;
  onClickDel?: Function;
}>;

const Nameplate: TNameplate = ({ label, className, explore, onClickDel }) => {
  return (
    <div className={css.container + (className ? " " + className : "")}>
      <span className={css.label}>{label}</span>

      {!explore ? (
        <span className={css.label + " " + css.options} onClick={onClickDel ? () => onClickDel() : undefined}>
          <Icon name="trash-2" className={css.optionsIcon} />
        </span>
      ) : null}
    </div>
  );
};

export default Nameplate;
