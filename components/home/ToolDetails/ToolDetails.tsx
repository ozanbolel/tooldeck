import * as React from "react";
import css from "./ToolDetails.module.scss";
import { TModalComponent, TTool } from "core/types";
import { Button, Icon } from "core/elements";

const ToolDetails: TModalComponent = ({ closeModal, payload }) => {
  const tool: TTool = payload.tool;
  const onClickAdd = payload.onClickAdd;

  return (
    <div className={css.container}>
      {tool.external ? <img src={"https://" + (tool.coverUrl || tool.iconUrl)} draggable="false" /> : <iframe src={"https://" + tool.url} scrolling="no" />}

      <div className={css.close} onClick={() => closeModal()}>
        <Icon name="x" />
      </div>

      <Button
        label="ADD TO DECK"
        className={css.add}
        onClick={() => {
          closeModal();
          onClickAdd(tool.id);
        }}
      ></Button>

      <div className={css.desc}>{tool.desc}</div>
    </div>
  );
};

export default ToolDetails;
