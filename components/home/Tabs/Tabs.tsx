import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "core/elements";
import { TStore } from "core/types";
import css from "./Tabs.module.scss";
import { useRouter } from "next/router";

const Tabs: React.FC = () => {
  const { opened: tabs, currentTabId } = useSelector((store: TStore) => store.tabs);
  const [tabWidth, setTabWidth] = React.useState(0);
  const refInnerTabs = React.useRef<any>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    const numTabs = tabs.length;

    if (numTabs !== 0) {
      const calculateTabWidth = () => {
        const maxTabWidth = 175;
        const widthInnerTabs = refInnerTabs.current.getBoundingClientRect().width;

        if (widthInnerTabs - numTabs * maxTabWidth > 0) {
          setTabWidth(maxTabWidth);
        } else {
          setTabWidth(widthInnerTabs / numTabs);
        }
      };

      calculateTabWidth();

      window.addEventListener("resize", calculateTabWidth, { passive: true });
      return () => window.removeEventListener("resize", calculateTabWidth);
    }
  }, [tabs]);

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
    dispatch({ type: "SET_CURRENT_TAB_ID", payload: id });
  };

  const renderTabs = () =>
    tabs.map((i) => (
      <div key={i.id} className={css.tab + (currentTabId === i.id ? " " + css.tabActive : "")} style={{ width: tabWidth }} onClick={() => onClickTab(i.id)}>
        <span>{i.label}</span>

        <div className={css.tabCloseIcon} onClick={() => closeTab(i.id)}>
          <Icon name="x" />
        </div>
      </div>
    ));

  return (
    <div className={css.container + (currentTabId !== "" ? " " + css.borderNone : "")}>
      <div className={css.innerDeck}>
        <div
          className={css.tab + " " + css.tabDeck + (currentTabId === "" ? " " + css.tabActive : "")}
          onClick={() => dispatch({ type: "SET_CURRENT_TAB_ID", payload: "" })}
        >
          <img src="/static/logo/logo-96.png" draggable="false" />
          <span>{router.pathname.split("/")[1] === "deck" ? "Deck" : "Explore"}</span>
        </div>
      </div>

      <div ref={refInnerTabs} className={css.innerTabs}>
        {renderTabs()}
      </div>
    </div>
  );
};

export default Tabs;
