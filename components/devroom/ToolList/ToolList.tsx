import * as React from "react";
import css from "./ToolList.module.scss";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TOOLS } from "core/queries";
import { DELETE_TOOL } from "core/mutations";
import { TTool } from "core/types";
import { Button, Dropdown } from "core/elements";
import { useModal, useDialog } from "core/tools";
import ToolEditor from "../ToolEditor/ToolEditor";
import { categories } from "core/config";

const ToolList: React.FC = () => {
  const { data } = useQuery(GET_TOOLS, { fetchPolicy: "network-only" });
  const [deleteTool] = useMutation(DELETE_TOOL);
  const [filter, setFilter] = React.useState("");
  const modal = useModal();
  const dialog = useDialog();

  const onClickDelete = (id: string) => {
    const callback = () =>
      deleteTool({ variables: { toolId: id } })
        .then(() => location.reload())
        .catch((error) => dialog(error.message, { label: "Ok" }));

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
          <img src={"https://" + (tool.coverUrl || tool.iconUrl)} onClick={() => modal(ToolEditor, { payload: { tool } })} draggable="false" />

          <div className={css.label}>{tool.label + (tool.external ? " (E)" : "")}</div>
        </div>

        <div className={css.itemSection}>
          <Button label="Edit" onClick={() => modal(ToolEditor, { payload: { tool } })} />
          <Button label="Delete" onClick={() => onClickDelete(tool.id)} />
        </div>
      </div>
    ));
  };

  return (
    <div className={css.container}>
      <div className={css.filter}>
        <Dropdown options={[{ label: "All", value: "" }, ...categories]} value={filter} onChange={(v: string) => setFilter(v)} />

        <Button label="Create Tool" onClick={() => modal(ToolEditor)} />
      </div>

      <div className={css.list}>{data ? renderItems() : null}</div>
    </div>
  );
};

export default ToolList;
