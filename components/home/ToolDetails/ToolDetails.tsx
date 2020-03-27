import * as React from "react";
import { Button, Icon } from "core/elements";
import { TModalComponent, TTool } from "core/types";
import useIsToolAdded from "../utils/useIsToolAdded";
import css from "./ToolDetails.module.scss";

const ToolDetails: TModalComponent = ({ closeModal, payload }) => {
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
        </div>

        <Button
          label={isAdded ? "ADDED" : "ADD TO DECK"}
          className={css.addButton}
          onClick={() => {
            onClickAdd();
          }}
          loading={loading}
          disabled={isAdded}
        />
      </div>

      <div className={css.content}>
        <div className={css.section}>
          <div className={css.title}>Descripcion</div>

          <span>{tool.desc}</span>
        </div>

        {!tool.external ? (
          <div className={css.section}>
            <div className={css.title}>Preview</div>

            <iframe src={"https://" + tool.url} scrolling="no" draggable="false" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ToolDetails;
