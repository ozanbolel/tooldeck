import * as React from "react";
import { Button, Icon, Loading } from "core/elements";
import { TModalComponent, TTool } from "core/types";
import useIsToolAdded from "../utils/useIsToolAdded";
import css from "./ToolDetails.module.scss";

const ToolDetails: TModalComponent = ({ isAnimationDone, isClosing, payload }) => {
  const tool: TTool = payload?.tool;
  const callback: Function = payload?.callback;
  const { isAdded, onClickAdd, loading } = useIsToolAdded(tool.id, callback);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <img src={"https://" + (tool.coverUrl || tool.iconUrl)} className={css.cover} draggable="false" />
        <div className={css.shade} />

        <div className={css.info}>
          <div className={css.label}>{tool.label}</div>

          <div className={css.upvotes}>
            <Icon name="thumbs-up" className={css.icon} />

            <span>{React.useMemo(() => (Math.random() * 10).toFixed(), [])}</span>
          </div>
        </div>

        <div>
          <Button label="UPVOTE" className={css.buttonUpvote} />

          <Button
            label={isAdded ? "ADDED" : "ADD TO DECK"}
            className={css.buttonAdd}
            onClick={() => {
              onClickAdd();
            }}
            loading={loading}
            disabled={isAdded}
          />
        </div>
      </div>

      <div className={css.content}>
        <div className={css.section}>
          <div className={css.title}>Descripcion</div>

          <span>{tool.desc}</span>
        </div>

        <div className={css.section}>
          <div className={css.title}>Preview</div>

          {!tool.external ? (
            isAnimationDone && !isClosing ? (
              <div className={css.previewContainer}>
                <div className={css.loadingContainer}>
                  <Loading className={css.loading} />
                </div>

                <iframe src={"https://" + tool.url} scrolling="no" draggable="false" />
              </div>
            ) : null
          ) : (
            <span>Preview not available.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolDetails;
