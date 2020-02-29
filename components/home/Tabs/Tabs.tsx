import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "core/types";
import css from "./Tabs.scss";

const Tabs: React.FC = () => {
  const { tabs, currentTabId } = useSelector((store: Store) => store.home);
  const dispatch = useDispatch();

  const closeTab = (id: string) => {
    const indexTab = tabs.findIndex((i) => i.id === id);

    if (indexTab === 0) {
      setTimeout(() => dispatch({ type: "SET_CURRENT_TAB_ID", payload: "" }), 0);
    } else {
      setTimeout(() => dispatch({ type: "SET_CURRENT_TAB_ID", payload: tabs[indexTab - 1].id }), 0);
    }

    dispatch({ type: "REMOVE_TAB", payload: id });
  };

  return (
    <div className={css.tabContainer}>
      <div className={css.tab + (currentTabId === "" ? " " + css.tabActive : "")} onClick={() => dispatch({ type: "SET_CURRENT_TAB_ID", payload: "" })}>
        Deck
      </div>

      {tabs.map((i) => (
        <div
          key={i.id}
          className={css.tab + (currentTabId === i.id ? " " + css.tabActive : "")}
          onClick={() => dispatch({ type: "SET_CURRENT_TAB_ID", payload: i.id })}
        >
          {i.label}

          <span onClick={() => closeTab(i.id)}>&nbsp;&nbsp;&nbsp;X</span>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
