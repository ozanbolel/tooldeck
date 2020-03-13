import * as React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import { Icon } from "core/elements";
import { TTool } from "core/types";
import css from "./ToolCard.scss";

import useCardHandlers from "./utils/useCardHandlers";

type TToolCard = React.FC<{
  tool: TTool;
  className?: string;
  explore?: boolean;
  onClick?: Function;
}>;

const ToolCard: TToolCard = ({ tool, className, explore, onClick }) => {
  const [spring, setSpring] = useSpring(() => ({ x: 0, y: 0, s: 1 }));
  const cardHandlers = useCardHandlers(spring, setSpring);

  const renderInner = () =>
    React.useMemo(
      () => (
        <div className={css.inner}>
          <img className={css.cover} src={`/static/${tool.id}.jpg`} draggable="false" />

          {!explore && tool.external ? (
            <div className={css.innerExternal}>
              <Icon name="link" className={css.innerExternalIcon} />
            </div>
          ) : null}

          {explore ? <div className={css.innerAdd}>Add to Deck</div> : null}
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
