import * as React from "react";
import { useSpring, animated } from "react-spring";
import css from "./AnimatedGrid.module.scss";

type TAnimatedGridItem = React.FC<{
  refItem: React.Ref<any> | undefined;
  child: React.ReactNode;
  index: number;
  dimensions: { width: number; height: number; gap: number; num: number };
}>;

const AnimatedGridItem: TAnimatedGridItem = ({ refItem, child, index, dimensions }) => {
  const [spring, setSpring] = useSpring(() => ({ top: 0, left: 0 }));

  React.useEffect(() => {
    const top = ((index + 1) / dimensions.num > 1 ? ((index / dimensions.num) as any).toFixed() : 0) * (dimensions.height + dimensions.gap);
    const left = (index % dimensions.num) * (dimensions.width + dimensions.gap);

    setSpring({ top, left });
  }, [index, dimensions]);

  const renderChild = () => React.useMemo(() => child, [child]);

  return (
    <animated.div ref={refItem} className={css.item} style={{ top: spring.top, left: spring.left, width: dimensions.width }}>
      {renderChild()}
    </animated.div>
  );
};

export default AnimatedGridItem;
