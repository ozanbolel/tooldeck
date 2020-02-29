import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "core/types";
import { Nest } from "core/elements";
import css from "./Deck.scss";

import ToolCard from "./ToolCard/ToolCard";
import Nameplate from "./Nameplate/Nameplate";

type tab = {
  id: string;
  label: string;
  url: string;
};

const Deck: React.FC = () => {
  const { tabs, currentTabId } = useSelector((store: Store) => store.home);
  const dispatch = useDispatch();

  const tools: Array<tab> = [
    {
      id: "coolors",
      label: "Coolors",
      url: "coolors.co/browser/latest/1"
    },
    {
      id: "ihateregex",
      label: "iHateRegex",
      url: "ihateregex.io"
    }
  ];

  const onClickTool = (tab: tab) => {
    if (tabs.findIndex((i) => i.id === tab.id) === -1) {
      dispatch({ type: "ADD_TAB", payload: tab });
    }

    dispatch({ type: "SET_CURRENT_TAB_ID", payload: tab.id });
  };

  return (
    <Nest className={currentTabId !== "" ? css.hidden : undefined}>
      <div className={css.section}>
        <div className={css.grid}>
          {tools.map((i) => (
            <div key={i.id} className={css.gridItemContainer}>
              <div className={css.gridItemShadow} />

              <ToolCard className={css.gridItemCard} tool={i} onClick={() => onClickTool(i)} />
              <Nameplate className={css.gridItemPlate} label={i.label} />
            </div>
          ))}
        </div>
      </div>
    </Nest>
  );
};

export default Deck;
