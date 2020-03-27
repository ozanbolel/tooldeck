import * as React from "react";
import ToolCard from "../ToolCard/ToolCard";
import ToolDetails from "../ToolDetails/ToolDetails";
import { Button } from "core/elements";
import { useModal } from "core/tools";
import { TTool } from "core/types";
import useIsToolAdded from "../utils/useIsToolAdded";
import css from "./ToolGridItem.module.scss";

type TToolGridItem = React.FC<{
  tool: TTool;
}>;

const ToolGridItem: TToolGridItem = ({ tool }) => {
  const { isAdded, setIsAdded, onClickAdd, loading } = useIsToolAdded(tool.id);
  const modal = useModal();

  const onClickView = () => modal(ToolDetails, { autoclose: true, payload: { tool, isAdded, callback: () => setIsAdded(true) } });

  return (
    <div key={tool.id} className={css.item}>
      <ToolCard src={tool.coverUrl || tool.iconUrl} className={css.cover} onClick={() => onClickView()} />

      <div className={css.info}>
        <div className={css.label}>{tool.label}</div>
        <div className={css.desc}>{tool.desc}</div>

        <Button label={isAdded ? "ADDED" : "ADD"} className={css.button} onClick={() => onClickAdd()} loading={loading} disabled={isAdded} />
        <Button label="VIEW" className={css.button} onClick={() => onClickView()} />
      </div>
    </div>
  );
};

export default ToolGridItem;
