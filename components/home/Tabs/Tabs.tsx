import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TStore } from "core/types";
import css from "./Tabs.scss";

const Tabs: React.FC = () => {
  const { tabs, currentTabId } = useSelector((store: TStore) => store.home);
  const dispatch = useDispatch();

  const closeTab = (id: string) => {
    const deletedTabIndex = tabs.findIndex((i) => i.id === id);

    dispatch({ type: "REMOVE_TAB", payload: id });

    let newCurrentTabId = "";

    if (deletedTabIndex === 0) {
      if (tabs.length !== 1) {
        newCurrentTabId = tabs[1].id;
      }
    } else {
      newCurrentTabId = tabs[deletedTabIndex - 1].id;
    }

    setTimeout(() => dispatch({ type: "SET_CURRENT_TAB_ID", payload: newCurrentTabId }), 0);
  };

  const onClickTab = (id: string) => {
    const { pathname, search } = window.location;

    (history as any).replaceState(null, null, pathname + search);

    dispatch({ type: "SET_CURRENT_TAB_ID", payload: id });
  };

  return (
    <div className={css.tabContainer + (currentTabId !== "" ? " " + css.borderNone : "")}>
      <div className={css.tab + (currentTabId === "" ? " " + css.tabActive : "")} onClick={() => dispatch({ type: "SET_CURRENT_TAB_ID", payload: "" })}>
        Deck
      </div>

      {tabs.map((i) => (
        <div key={i.id} className={css.tab + (currentTabId === i.id ? " " + css.tabActive : "")} onClick={() => onClickTab(i.id)}>
          {i.label}

          <span onClick={() => closeTab(i.id)}>&nbsp;&nbsp;&nbsp;X</span>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
