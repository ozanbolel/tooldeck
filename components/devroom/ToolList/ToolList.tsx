import * as React from "react";
import css from "./ToolList.module.scss";
import { useQuery } from "@apollo/react-hooks";
import { GET_TOOLS } from "core/queries";
import { TTool } from "core/types";
import { Button, Radio } from "core/elements";
import { useModal, useDialog } from "core/tools";
import ToolEditor from "../ToolEditor/ToolEditor";

const ToolList: React.FC = () => {
  const { data } = useQuery(GET_TOOLS);
  const [filter, setFilter] = React.useState("");
  const modal = useModal();
  const dialog = useDialog();

  const onClickDelete = (id: string) => {
    const callback = () => {};

    const callbackYesYes = () =>
      dialog("Please reconsider your decision Master!", [
        { label: "Ok, go back", highlight: true },
        { label: "Delete it, or you'll be fired", callback }
      ]);

    const callbackYes = () =>
      dialog("Master, are you really really sure you want to do this?", [
        { label: "Actually, no...", highlight: true },
        { label: "Yes damn it!", callback: callbackYesYes }
      ]);

    dialog("Master, are you sure?", [
      { label: "No", highlight: true },
      { label: "Yes", callback: callbackYes }
    ]);
  };

  const renderItems = () => {
    const tools = filter === "" ? data.tools : data.tools.filter((tool: TTool) => tool.cat === filter);

    return tools.map((tool: TTool) => (
      <div key={tool.id} className={css.item}>
        <div className={css.itemSection}>
          <img src={"https://" + (tool.coverUrl || tool.iconUrl)} draggable="false" />
          <div className={css.label}>{tool.label + (tool.external ? " (External)" : "")}</div>
        </div>

        <div className={css.itemSection}>
          <Button label="Edit" onClick={() => modal(ToolEditor, { payload: { tool } })} />
          <Button label="Delete" onClick={() => onClickDelete(tool.id)} />
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className={css.filter}>
        <Radio
          items={[
            { label: "All", value: "" },
            { label: "Development", value: "development" },
            { label: "Design", value: "design" }
          ]}
          onChange={(v: string) => setFilter(v)}
        />

        <Button label="Create Tool" onClick={() => modal(ToolEditor)} />
      </div>

      <div>{data ? renderItems() : null}</div>
    </>
  );
};

export default ToolList;
