import * as React from "react";
import ToolCard from "../ToolCard/ToolCard";
import ToolDetails from "../ToolDetails/ToolDetails";
import { Button } from "core/elements";
import { useModal, getTimeAgo } from "core/tools";
import { TTool } from "core/types";
import useIsToolAdded from "../utils/useIsToolAdded";
import isToolNew from "../utils/isToolNew";
import css from "./ToolGridItem.module.scss";

type TToolGridItem = React.FC<{
  tool: TTool;
  index: number;
  promote?: string;
}>;

const ToolGridItem: TToolGridItem = ({ tool, index, promote }) => {
  const { isAdded, setIsAdded, onClickAdd, loading } = useIsToolAdded(tool.id);
  const modal = useModal();

  const onClickView = () => modal(ToolDetails, { autoclose: true, payload: { tool, isAdded, callback: () => setIsAdded(true) } });

  return (
    <div className={css.item} style={{ animationDelay: index * 0.02 + "s" }}>
      <ToolCard iconUrl={tool.iconUrl} coverUrl={tool.coverUrl} className={css.cover} onClick={() => onClickView()} />

      <div className={css.info}>
        {isToolNew(tool.createdAt) ? <div className={css.new}>NEW</div> : null}

        <div className={css.label}>{tool.label}</div>

        {promote ? (
          <div className={css.promote}>
            {promote === "users" ? <span>Added by </span> : null}
            {promote === "stars" ? <span>Starred by </span> : null}
            {promote !== "new" ? (
              <>
                <span className={css.bold}>{(tool as any)[promote]} </span>
                <span>users.</span>
              </>
            ) : (
              <span>Arrived {getTimeAgo(tool.createdAt)}.</span>
            )}
          </div>
        ) : null}

        <div className={css.desc}>{tool.shortDesc}</div>

        <div className={css.actions}>
          <Button label={isAdded ? "ADDED" : "ADD"} className={css.button} onClick={() => onClickAdd()} loading={loading} disabled={isAdded} />
          <Button label="VIEW" className={css.button} onClick={() => onClickView()} />
        </div>
      </div>
    </div>
  );
};

export default ToolGridItem;
