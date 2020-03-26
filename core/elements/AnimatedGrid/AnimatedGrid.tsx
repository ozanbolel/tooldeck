import * as React from "react";
import css from "./AnimatedGrid.module.scss";

type TAnimatedGrid = React.FC<{}>;

export const AnimatedGrid: TAnimatedGrid = ({ children }) => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [num, setNum] = React.useState(0);
  const [gap, setGap] = React.useState(0);
  const refGrid = React.useRef<any>(null);
  const refItem = React.useRef<any>(null);

  React.useEffect(() => {
    const childrenLength = (children as any).length;

    if (childrenLength !== 0) {
      const setDimensions = () => {
        const { innerWidth } = window;

        let newNum;
        let newGap;

        if (innerWidth > 1440) {
          newNum = 4;
          newGap = 80;
        } else if (innerWidth > 1280) {
          newNum = 3;
          newGap = 80;
        } else if (innerWidth > 1024) {
          newNum = 2;
          newGap = 80;
        } else {
          newNum = 1;
          newGap = 40;
        }

        const widthGrid = refGrid.current.getBoundingClientRect().width;
        const heightItem = refItem.current.getBoundingClientRect().height;

        setWidth((widthGrid - (newNum - 1) * newGap) / newNum);
        setHeight(heightItem);

        setNum(newNum);
        setGap(newGap);
      };

      if (width === 0) {
        setDimensions();
      }

      window.addEventListener("resize", setDimensions, { passive: true });
      return () => window.removeEventListener("resize", setDimensions);
    }
  }, [children]);

  return (
    <div ref={refGrid} className={css.grid}>
      {React.Children.map(children, (child, index) => {
        const top = ((index + 1) / num > 1 ? ((index / num) as any).toFixed() : 0) * (height + gap);
        const left = (index % num) * (width + gap);

        return (
          <div ref={index === 0 ? refItem : undefined} className={css.item} style={{ top, left, width }}>
            {child}
          </div>
        );
      })}
    </div>
  );
};
