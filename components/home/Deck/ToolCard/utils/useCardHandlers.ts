import * as React from "react";
import { AnimatedValue, SetUpdateFn } from "react-spring";

const useCardHandlers = (spring: AnimatedValue<any>, setSpring: SetUpdateFn<any>, clicked: boolean) => {
  const [initial, setInitial] = React.useState([0, 0]);
  const refCard = React.useRef<any>(null);

  const animate = (clientX: number, clientY: number, width: number, height: number) => {
    let drag = [0, 0];

    if (initial[0] === 0 && initial[1] === 0) {
      setInitial([clientX, clientY]);
    } else {
      drag = [clientX - initial[0], clientY - initial[1]];
    }

    setSpring({
      x: (drag[1] / height) * 30 * -1,
      y: (drag[0] / width) * 30
    });

    !clicked ? setSpring({ s: 1.1 }) : null;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { width, height } = refCard.current.getBoundingClientRect();

    animate(clientX, clientY, width, height);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    const { width, height } = refCard.current.getBoundingClientRect();

    animate(clientX, clientY, width, height);
  };

  const onLeave = () => {
    if (initial[0] === 0 && initial[1] === 0) {
      setInitial([0, 0]);
    }

    setSpring({ x: 0, y: 0 });

    !clicked ? setSpring({ s: 1 }) : null;
  };

  return {
    ref: refCard,
    onMouseMove,
    onTouchMove,
    onMouseLeave: onLeave,
    onTouchEnd: onLeave
  };
};

export default useCardHandlers;
