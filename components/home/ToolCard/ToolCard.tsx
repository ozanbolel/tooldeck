import * as React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import useCardHandlers from "./utils/useCardHandlers";
import css from "./ToolCard.scss";

const ToolCard: React.FC<{ title: string; onClick?: Function }> = ({ title, onClick }) => {
  const [spring, setSpring] = useSpring(() => ({ x: 0, y: 0, s: 1, config: { mass: 5, tension: 300, friction: 25 } }));
  const [clicked, setClicked] = React.useState(false);
  const cardHandlers = useCardHandlers(spring, setSpring, clicked);

  const onClickCard = () => {
    setClicked(true);
    setSpring({ s: 0.2 });

    setTimeout(() => {
      setClicked(false);
      setSpring({ s: 1.1 });
    }, 60);

    onClick ? setTimeout(() => onClick(), 600) : null;
  };

  const renderInner = () =>
    React.useMemo(
      () => (
        <div className={css.inner}>
          <h1>{title}</h1>
        </div>
      ),
      [title]
    );

  return (
    <animated.div
      className={css.card}
      style={{
        transform: interpolate([spring.x, spring.y, spring.s], (x, y, s) => `perspective(50em) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`)
      }}
      onClick={() => onClickCard()}
      {...cardHandlers}
    >
      {renderInner()}
    </animated.div>
  );
};

export default ToolCard;
