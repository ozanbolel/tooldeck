import * as React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import { Icon } from "core/elements";
import { TTool } from "core/types";
import css from "./ToolCard.module.scss";

import useCardHandlers from "./utils/useCardHandlers";

type TToolCard = React.FC<{
  id: string;
  external?: boolean;
  className?: string;
  onClick?: Function;
}>;

const ToolCard: TToolCard = ({ id, external, className, onClick }) => {
  const [spring, setSpring] = useSpring(() => ({ x: 0, y: 0, s: 1 }));
  const cardHandlers = useCardHandlers(spring, setSpring);

  const renderInner = () =>
    React.useMemo(
      () => (
        <div className={css.inner}>
          <img className={css.cover} src={`/static/${id}.jpg`} draggable="false" />

          {external ? (
            <div className={css.innerExternal}>
              <Icon name="link" className={css.innerExternalIcon} />
            </div>
          ) : null}
        </div>
      ),
      [id, external]
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
