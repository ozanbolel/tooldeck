import * as React from "react";
import { Button, Radio, Dropdown } from "core/elements";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TOOL, UPDATE_TOOL } from "core/mutations";
import { useDialog } from "core/tools";
import { TModalComponent, TTool } from "core/types";
import css from "./ToolEditor.module.scss";
import { categories } from "core/config";

const ToolEditor: TModalComponent = ({ closeModal, isAnimationDone, isClosing, payload }) => {
  const tool: TTool = payload?.tool;
  const [createTool, { loading: loadingCreateTool }] = useMutation(CREATE_TOOL);
  const [updateTool, { loading: loadingUpdateTool }] = useMutation(UPDATE_TOOL);
  const dialog = useDialog();

  const [label, setLabel] = React.useState(tool ? tool.label : "");
  const [shortDesc, setShortDesc] = React.useState(tool ? tool.shortDesc : "");
  const [desc, setDesc] = React.useState(tool ? tool.desc : "");
  const [cat, setCat] = React.useState(tool ? tool.cat : "");
  const [url, setUrl] = React.useState(tool ? tool.url : "");
  const [iconUrl, setIconUrl] = React.useState(tool ? tool.iconUrl : "");
  const [coverUrl, setCoverUrl] = React.useState(tool ? tool.coverUrl : "");
  const [external, setExternal] = React.useState(tool ? tool.external : false);

  const onClickUpdate = () =>
    updateTool({
      variables: {
        toolId: tool.id,
        label,
        shortDesc,
        desc: desc && desc.replace(" ", "").length > 0 ? desc : undefined,
        cat,
        url,
        iconUrl,
        coverUrl: coverUrl && coverUrl.replace(" ", "").length > 0 ? coverUrl : undefined,
        external
      }
    })
      .then(() => location.reload())
      .catch((error) => dialog(error.graphQLErrors[0]?.message || error.message, { label: "Ok" }));

  const onClickCreate = () =>
    createTool({
      variables: {
        label,
        shortDesc,
        desc: desc && desc.replace(" ", "").length > 0 ? desc : undefined,
        cat,
        url,
        iconUrl,
        coverUrl: coverUrl && coverUrl.replace(" ", "").length > 0 ? coverUrl : undefined,
        external
      }
    })
      .then(() => location.reload())
      .catch((error) => dialog(error.graphQLErrors[0]?.message || error.message, { label: "Ok" }));

  return (
    <div className={css.container}>
      <div className={css.editor}>
        <div className={css.form}>
          <div className={css.field}>
            <div className={css.label}>label:</div>

            <input value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>

          <div className={css.field}>
            <div className={css.label}>shortDesc:</div>

            <input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
          </div>

          <div className={css.field}>
            <div className={css.label}>desc:</div>

            <input value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <div className={css.field}>
            <div className={css.label}>cat:</div>

            <Dropdown options={[{ label: "Unset", value: "" }, ...categories]} value={cat} onChange={(v: string) => setCat(v)} />
          </div>

          <div className={css.field}>
            <div className={css.label}>url:</div>

            <input value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>

          <div className={css.field}>
            <div className={css.label}>iconUrl:</div>

            <input value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} />
          </div>

          <div className={css.field}>
            <div className={css.label}>coverUrl:</div>

            <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
          </div>

          <div className={css.field}>
            <div className={css.label}>external:</div>

            <input type="checkbox" checked={external} onChange={(e) => setExternal(e.target.checked)} />
          </div>
        </div>

        <div className={css.buttons}>
          <Button label="Cancel" onClick={() => closeModal()} />

          {tool ? (
            <Button label="Update" loading={loadingUpdateTool} onClick={() => onClickUpdate()} />
          ) : (
            <Button label="Create" loading={loadingCreateTool} onClick={() => onClickCreate()} />
          )}
        </div>
      </div>

      {!external ? (
        <>
          <div className={css.gap} />

          <div className={css.preview}>
            {isAnimationDone && !isClosing ? <iframe src={"https://" + url.replace("https://", "").replace("http://", "")} /> : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ToolEditor;
