import * as React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import css from "./ToolCard.scss";

const ToolCard: React.FC<{ title: string; onClick: Function }> = ({ title, onClick }) => {
  const [spring, setSpring] = useSpring(() => ({ x: 0, y: 0, s: 1, config: { mass: 5, tension: 300, friction: 25 } }));
  const refCard = React.useRef<any>(null);

  const [initial, setInitial] = React.useState([0, 0]);

  const onMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { width, height } = refCard.current.getBoundingClientRect();

    let drag = [0, 0];

    if (initial[0] === 0 && initial[1] === 0) {
      setInitial([clientX, clientY]);
    } else {
      drag = [clientX - initial[0], clientY - initial[1]];
    }

    setSpring({
      x: (drag[1] / height) * 30 * -1,
      y: (drag[0] / width) * 30,
      s: 1.1
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setSpring({
      x: -(e.touches[0].clientY - window.innerHeight / 4) / 20,
      y: (e.touches[0].clientX - window.innerWidth / 4) / 20,
      s: 1.1
    });
  };

  const onMouseLeave = () => {
    if (initial[0] === 0 && initial[1] === 0) {
      setInitial([0, 0]);
    }

    setSpring({ x: 0, y: 0, s: 1 });
  };

  const renderInner = () => React.useMemo(() => <h1>{title}</h1>, []);

  return (
    <animated.div
      ref={refCard}
      className={css.card}
      style={{
        transform: interpolate([spring.x, spring.y, spring.s], (x, y, s) => `perspective(50em) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`)
      }}
      onClick={() => onClick()}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseLeave}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {renderInner()}
    </animated.div>
  );
};

export default ToolCard;
