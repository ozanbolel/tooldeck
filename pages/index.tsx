import * as React from "react";
import { NextPage } from "next";
import { useTransition } from "core/tools";

const Deck: NextPage = () => {
  const { refTransition, setTransition } = useTransition({ marginLeft: 0 });

  return (
    <div ref={refTransition} onClick={() => setTransition({ marginLeft: "300px" })}>
      TEXT
    </div>
  );
};

export default Deck;
