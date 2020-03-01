import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TTool, TStore } from "core/types";
import css from "./Deck.scss";

import ToolCard from "../ToolCard/ToolCard";
import Nameplate from "../Nameplate/Nameplate";

const Deck: React.FC = () => {
  const { tabs } = useSelector((store: TStore) => store.home);
  const dispatch = useDispatch();

  const tools: Array<TTool> = [
    {
      id: "coolors",
      label: "Coolors",
      cat: "design",
      sub_cat: "colors",
      external: false,
      url: "coolors.co/browser/latest/1"
    },
    {
      id: "ihateregex",
      label: "iHateRegex",
      cat: "dev",
      sub_cat: "regex",
      external: false,
      url: "ihateregex.io"
    }
  ];

  const onClickTool = (tool: TTool) => {
    if (tabs.findIndex((i) => i.id === tool.id) === -1) {
      dispatch({ type: "ADD_TAB", payload: tool });
    }

    dispatch({ type: "SET_CURRENT_TAB_ID", payload: tool.id });
  };

  return (
    <div>
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
    </div>
  );
};

export default Deck;
