import * as React from "react";
import css from "./TextChanger.module.scss";

type TTextChanger = React.FC<{
  data: string[];
  containerClassName: string;
  textClassName: string;
}>;

export const TextChanger: TTextChanger = ({ data, containerClassName, textClassName }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    let newIndex: number;

    if (currentIndex !== data.length - 1) {
      if (currentIndex + 2 > data.length) {
        newIndex = data.length - 1;
      } else {
        newIndex = currentIndex + 1;
      }
    } else {
      newIndex = 0;
    }

    const timeout = setTimeout(() => {
      setCurrentIndex(newIndex);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className={css.container + " " + containerClassName}>
      {data.map((text: string, index) => (
        <div className={css.text + " " + textClassName + (currentIndex !== index ? " " + css.hidden : "")}>{text}</div>
      ))}
    </div>
  );
};
