import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "core/elements";
import { TTool, TStore } from "core/types";
import { tools } from "core/data";
import css from "./Deck.scss";

import ToolCard from "../ToolCard/ToolCard";
import Nameplate from "../Nameplate/Nameplate";

const Deck: React.FC = () => {
  const tabs = useSelector((store: TStore) => store.tabs.opened);
  const addedToolIds = useSelector((store: TStore) => store.deck.toolIds);
  const dispatch = useDispatch();

  const onClickTool = (tool: TTool) => {
    if (!tool.external) {
      if (tabs.findIndex((i) => i.id === tool.id) === -1) {
        dispatch({ type: "ADD_TAB", payload: tool });
      }

      dispatch({ type: "SET_CURRENT_TAB_ID", payload: tool.id });
    } else {
      window.open("https://" + tool.url);
    }
  };

  const renderAddedTools = () => {
    let addedTools = [];

    for (let index = 0; index < addedToolIds.length; index++) {
      addedTools.push(tools.find((tool) => tool.id === addedToolIds[index]));
    }

    return addedTools.map((tool: any) => {
      return (
        <div key={tool.id} className={css.gridItemContainer}>
          <div className={css.gridItemShadow} />

          <ToolCard className={css.gridItemCard} tool={tool} onClick={() => onClickTool(tool)} />
          <Nameplate className={css.gridItemPlate} label={tool.label} onClickDel={() => dispatch({ type: "REMOVE_TOOL_ID", payload: tool.id })} />
        </div>
      );
    });
  };

  if (addedToolIds.length !== 0) {
    return (
      <div className={css.section}>
        <div className={css.grid}>{renderAddedTools()}</div>
      </div>
    );
  } else {
    return (
      <div className={css.empty}>
        <img src="/static/taken.svg" className={css.emptyImg} draggable="false" />

        <div className={css.emptyText}>Looks like aliens stole all the tools 😕</div>
        <div className={css.emptyText}>Don't worry, we have plenty 😉</div>
        <div className={css.emptyTextHightlight}>
          Click to Explore <Icon name="arrow-right" className={css.emptyTextHightlightIcon} />
        </div>
      </div>
    );
  }
};

export default Deck;
