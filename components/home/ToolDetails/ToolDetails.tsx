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
      {tool.external ? <img src={"https://" + (tool.coverUrl || tool.iconUrl)} draggable="false" /> : <iframe src={"https://" + tool.url} scrolling="no" />}

      <div className={css.close} onClick={() => closeModal()}>
        <Icon name="x" />
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

      <div className={css.desc}>{tool.desc}</div>
    </div>
  );
};

export default ToolDetails;
