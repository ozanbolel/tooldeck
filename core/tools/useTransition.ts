import * as React from "react";

type attributes = {
  [x: string]: number | string;
};

type config = {
  instant: boolean;
};

export const useTransition = (initialAttributes: attributes) => {
  const refTransition = React.useRef<any>(null);

  const setAttributesToElement = (currentAttributes: attributes) => {
    const element = refTransition.current;
    const keys = Object.keys(currentAttributes);

    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];

      element.style[currentKey] = currentAttributes[currentKey];
    }
  };

  React.useEffect(() => setAttributesToElement(initialAttributes), []);

  const setTransition = (attributes: attributes, config?: config) => {
    const element = refTransition.current;

    if (config && config.instant) {
      element.style.transition = null;
    } else {
      element.style.transition = "all 0.4s ease-in-out";
    }

    setAttributesToElement(attributes);
  };

  return { refTransition, setTransition };
};
