import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "core/types";
import { Nest } from "core/elements";
import ToolCard from "../ToolCard/ToolCard";
import css from "./Deck.scss";

type tab = {
  id: string;
  title: string;
  url: string;
};

const Deck: React.FC = () => {
  const { tabs, currentTabId } = useSelector((store: Store) => store.home);
  const dispatch = useDispatch();

  const tools: Array<tab> = [
    {
      id: "1",
      title: "Coolors",
      url: "coolors.co/browser/latest/1"
    },
    {
      id: "2",
      title: "iHateRegex",
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
            <ToolCard key={i.id} title={i.title} onClick={() => onClickTool(i)} />
          ))}
        </div>
      </div>

      <div className={css.section}>
        <div className={css.grid}>
          {tools.map((i) => (
            <ToolCard key={i.id} title={i.title} onClick={() => onClickTool(i)} />
          ))}
        </div>
      </div>
    </Nest>
  );
};

export default Deck;
