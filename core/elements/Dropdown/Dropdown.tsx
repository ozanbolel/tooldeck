import * as React from "react";
import css from "./Dropdown.module.scss";
import { Icon } from "../Icon/Icon";

type TDropdown = React.FC<{
  options: { label: string; value: any }[];
  value: any;
  onChange?: (value: any) => any;
  style?: React.CSSProperties;
  className?: string;
}>;

export const Dropdown: TDropdown = ({ options, value, onChange, style, className }) => {
  return (
    <div className={css.container + (className ? " " + className : "")} style={style ? style : undefined}>
      <select className={css.dropdown} value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined}>
        {options.map((option) => (
          <option key={option.label + "-" + option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Icon name="chevron-down" />
    </div>
  );
};
