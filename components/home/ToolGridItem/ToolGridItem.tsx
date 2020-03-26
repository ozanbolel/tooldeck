import * as React from "react";
import ToolCard from "../ToolCard/ToolCard";
import ToolDetails from "../ToolDetails/ToolDetails";
import { Button } from "core/elements";
import { useModal } from "core/tools";
import { TTool } from "core/types";
import css from "./ToolGridItem.module.scss";

type TToolGridItem = React.FC<{
  tool: TTool;
}>;

const ToolGridItem: TToolGridItem = ({ tool }) => {
  const modal = useModal();

  const onClickView = (tool: TTool) => modal(ToolDetails, { autoclose: true, payload: { tool } });

  return (
    <div key={tool.id} className={css.item}>
      <ToolCard src={tool.coverUrl || tool.iconUrl} className={css.cover} onClick={() => onClickView(tool)} />

      <div className={css.info}>
        <div className={css.label}>{tool.label}</div>
        <div className={css.desc}>{tool.desc}</div>

        <Button label="ADD" className={css.button} onClick={() => onClickView(tool)} />
        <Button label="VIEW" className={css.button} onClick={() => onClickView(tool)} />
      </div>
    </div>
  );
};

export default ToolGridItem;
