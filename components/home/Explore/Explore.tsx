import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TStore } from "core/types";
import { tools } from "core/data";
import css from "./Explore.scss";

import ToolCard from "../ToolCard/ToolCard";
import Nameplate from "../Nameplate/Nameplate";

const Explore: React.FC = () => {
  const addedToolIds = useSelector((store: TStore) => store.deck.toolIds);
  const dispatch = useDispatch();

  const onClickTool = (id: string) => {
    if (addedToolIds.findIndex((i) => i === id) === -1) {
      dispatch({ type: "ADD_TOOL", payload: id });
    }
  };

  return (
    <>
      <div className={css.section}>
        <div className={css.sectionTitle}>For Developers</div>

        <div className={css.grid}>
          {tools.map((i) => (
            <div key={i.id} className={css.gridItemContainer}>
              <div className={css.gridItemShadow} />

              <ToolCard className={css.gridItemCard} tool={i} onClick={() => onClickTool(i.id)} explore />
              <Nameplate className={css.gridItemPlate} label={i.label} />
            </div>
          ))}
        </div>
      </div>

      <div className={css.section}>
        <div className={css.sectionTitle}>For Designers</div>

        <div className={css.grid}>
          {tools.map((i) => (
            <div key={i.id} className={css.gridItemContainer}>
              <div className={css.gridItemShadow} />

              <ToolCard className={css.gridItemCard} tool={i} onClick={() => onClickTool(i.id)} explore />
              <Nameplate className={css.gridItemPlate} label={i.label} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
