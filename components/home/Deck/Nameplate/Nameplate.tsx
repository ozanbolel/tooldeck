import * as React from "react";
import css from "./Nameplate.scss";

type TNameplate = React.FC<{
  label: string;
  className?: string;
}>;

const Nameplate: TNameplate = ({ label, className }) => {
  return (
    <div className={css.container + (className ? " " + className : "")}>
      <div className={css.label}>{label}</div>
    </div>
  );
};

export default Nameplate;
