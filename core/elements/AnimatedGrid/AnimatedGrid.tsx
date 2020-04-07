import * as React from "react";
import css from "./AnimatedGrid.module.scss";
import AnimatedGridItem from "./AnimatedGridItem";

type TAnimatedGrid = React.FC<{
  columns: [number, number, number, number, number];
  gap: [number, number, number, number, number];
}>;

export const AnimatedGrid: TAnimatedGrid = ({ children, columns, gap }) => {
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

        if (innerWidth > 1600) {
          newNum = columns[0];
          newGap = gap[0];
        } else if (innerWidth > 1280) {
          newNum = columns[1];
          newGap = gap[1];
        } else if (innerWidth > 1024) {
          newNum = columns[2];
          newGap = gap[2];
        } else if (innerWidth > 720) {
          newNum = columns[3];
          newGap = gap[3];
        } else {
          newNum = columns[4];
          newGap = gap[4];
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

      window.addEventListener("resize", resizeOps);
      return () => window.removeEventListener("resize", resizeOps);
    }
  }, [children]);

  const containerHeight = React.useMemo(() => {
    if (dimensions.num !== 0) {
      const lastIndex = (children as any).length - 1;
      const numRows = Math.trunc(lastIndex / dimensions.num) + 1;

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
