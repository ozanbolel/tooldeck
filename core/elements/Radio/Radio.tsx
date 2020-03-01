import * as React from "react";
import css from "./Radio.scss";

type TItem = {
  label: string;
  value: string;
};

type TRadio = React.FC<{
  items: Array<TItem>;
  initial?: string;
  value?: string;
  onChange?: Function;
}>;

export const Radio: TRadio = ({ items, initial, value, onChange }) => {
  const [localValue, setLocalValue] = React.useState(initial ? initial : "");

  if (value) {
    React.useEffect(() => setLocalValue(value), [value]);
  }

  const controller = (newLocalValue: string) => {
    setLocalValue(newLocalValue);

    onChange ? onChange(newLocalValue) : null;
  };

  return (
    <div className={css.container}>
      {items.map((i) => (
        <div key={i.value} className={css.item + (i.value === localValue ? " " + css.selected : "")} onClick={() => controller(i.value)}>
          {i.label}
        </div>
      ))}
    </div>
  );
};
