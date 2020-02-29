import * as React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import useCardHandlers from "./utils/useCardHandlers";
import css from "./ToolCard.scss";

type TToolCard = React.FC<{
  tool: any;
  className?: string;
  onClick?: Function;
}>;

const ToolCard: TToolCard = ({ tool, className, onClick }) => {
  const [spring, setSpring] = useSpring(() => ({ x: 0, y: 0, s: 1 }));
  const cardHandlers = useCardHandlers(spring, setSpring);

  const renderInner = () =>
    React.useMemo(
      () => (
        <div className={css.inner}>
          <img className={css.cover} src={`/static/${tool.id}.jpg`} />
        </div>
      ),
      [JSON.stringify(tool)]
    );

  return (
    <animated.div
      className={css.card + (className ? " " + className : "")}
      style={{
        transform: interpolate([spring.x, spring.y, spring.s], (x, y, s) => `perspective(50em) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`)
      }}
      onClick={onClick ? () => onClick() : undefined}
      {...cardHandlers}
    >
      {renderInner()}
    </animated.div>
  );
};

export default ToolCard;
