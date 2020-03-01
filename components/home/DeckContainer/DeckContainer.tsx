import * as React from "react";
import { Nest, Radio } from "core/elements";
import css from "./DeckContainer.scss";

import Deck from "../Deck/Deck";
import Explore from "../Explore/Explore";

const DeckContainer: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  const [page, setPage] = React.useState("deck");

  React.useEffect(() => {
    const { hash } = window.location;

    if (hash !== "") {
      setPage(hash.split("#")[1]);
    }
  }, []);

  const onChangeRadio = (v: string) => {
    if (v === "deck") {
      const { pathname, search } = window.location;

      (history as any).replaceState(null, null, pathname + search);
    } else {
      window.location.hash = v;
    }

    setPage(v);
  };

  return (
    <Nest className={hidden ? css.hidden : undefined}>
      <div className={css.radio}>
        <Radio
          items={[
            { label: "Deck", value: "deck" },
            { label: "Explore", value: "explore" }
          ]}
          initial="deck"
          value={page}
          onChange={(v: string) => onChangeRadio(v)}
        />
      </div>

      {page === "deck" ? <Deck /> : <Explore />}
    </Nest>
  );
};

export default DeckContainer;
