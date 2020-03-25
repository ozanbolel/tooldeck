import * as React from "react";
import { useModal } from "core/tools";
import { TTool } from "core/types";
import { tools } from "core/data";
import css from "./Explore.module.scss";
import ToolCard from "../ToolCard/ToolCard";
import ToolDetails from "../ToolDetails/ToolDetails";
import { Button } from "core/elements";

const Explore: React.FC = () => {
  const modal = useModal();

  const onClickView = (tool: TTool) => modal(ToolDetails, { autoclose: true, payload: { tool } });

  return (
    <>
      <div className={css.section}>
        <div className={css.title}>For Developers</div>

        <div className={css.grid}>
          {tools.map((tool) => (
            <div key={tool.id} className={css.gridItem}>
              <ToolCard src={tool.coverUrl || tool.iconUrl} className={css.gridItemCover} onClick={() => onClickView(tool)} />

              <div className={css.gridItemInfo}>
                <div className={css.label}>{tool.label}</div>
                <div className={css.desc}>{tool.desc}</div>

                <Button label="VIEW" className={css.button} onClick={() => onClickView(tool)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
