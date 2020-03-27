import * as React from "react";
import css from "./AnimatedGrid.module.scss";
import AnimatedGridItem from "./AnimatedGridItem";

export const AnimatedGrid: React.FC = ({ children }) => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0, gap: 0, num: 0 });
  const refGrid = React.useRef<any>(null);
  const refItem = React.useRef<any>(null);

  React.useEffect(() => {
    const childrenLength = (children as any).length;

    if (childrenLength !== 0) {
      const resizeOps = () => {
        const { innerWidth } = window;

        let newNum;
        let newGap;

        if (innerWidth > 1440) {
          newNum = 5;
          newGap = 60;
        } else if (innerWidth > 1280) {
          newNum = 4;
          newGap = 60;
        } else if (innerWidth > 1024) {
          newNum = 3;
          newGap = 60;
        } else if (innerWidth > 720) {
          newNum = 2;
          newGap = 60;
        } else {
          newNum = 1;
          newGap = 60;
        }

        const widthGrid = refGrid.current.getBoundingClientRect().width;
        const heightItem = refItem.current.getBoundingClientRect().height;

        setDimensions({
          width: (widthGrid - (newNum - 1) * newGap) / newNum,
          height: heightItem,
          gap: newGap,
          num: newNum
        });
      };

      if (dimensions.width === 0) {
        resizeOps();
      }

      window.addEventListener("resize", resizeOps, { passive: true });
      return () => window.removeEventListener("resize", resizeOps);
    }
  }, [children]);

  const containerHeight = React.useMemo(() => {
    if (dimensions.num !== 0) {
      const childrenLength = (children as any).length;
      const distance = childrenLength / dimensions.num;
      const numRows = dimensions.num !== 1 ? (distance !== 1 ? 1 + parseInt(distance.toPrecision()) : 1) : childrenLength;

      return numRows * dimensions.height + (numRows - 1) * dimensions.gap;
    } else {
      return 0;
    }
  }, [children, dimensions]);

  const renderChildren = () =>
    React.useMemo(
      () =>
        React.Children.map(children, (child, index) => (
          <AnimatedGridItem refItem={index === 0 ? refItem : undefined} child={child} index={index} dimensions={dimensions} />
        )),
      [children, dimensions]
    );

  return (
    <div ref={refGrid} className={css.grid} style={{ height: containerHeight }}>
      {renderChildren()}
    </div>
  );
};
