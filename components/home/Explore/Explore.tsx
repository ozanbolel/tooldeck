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
      dispatch({ type: "ADD_TOOL_ID", payload: id });
    }
  };

  return (
    <>
      <div className={css.section}>
        <div className={css.sectionTitle}>Develop with Ease</div>

        <div className={css.grid}>
          {tools.map((i) => {
            if (i.cat === "dev") {
              return (
                <div key={i.id} className={css.gridItemContainer}>
                  <div className={css.gridItemShadow} />

                  <ToolCard className={css.gridItemCard} tool={i} onClick={() => onClickTool(i.id)} explore />
                  <Nameplate className={css.gridItemPlate} label={i.label} explore />
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className={css.section}>
        <div className={css.sectionTitle}>Power-up Your Designs</div>

        <div className={css.grid}>
          {tools.map((i) => {
            if (i.cat === "design") {
              return (
                <div key={i.id} className={css.gridItemContainer}>
                  <div className={css.gridItemShadow} />

                  <ToolCard className={css.gridItemCard} tool={i} onClick={() => onClickTool(i.id)} explore />
                  <Nameplate className={css.gridItemPlate} label={i.label} explore />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Explore;
