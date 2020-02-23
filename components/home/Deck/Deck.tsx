import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { store } from "core/store";
import css from "./Deck.scss";

type tab = {
  id: string;
  title: string;
  url: string;
};

const Deck: React.FC = () => {
  const { tabs, currentTabId } = useSelector((store: store) => store.home);
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
    <div style={currentTabId !== "" ? { display: "none" } : {}}>
      {tools.map((i) => (
        <button key={i.id} onClick={() => onClickTool(i)}>
          {i.title}
        </button>
      ))}
    </div>
  );
};

export default Deck;
