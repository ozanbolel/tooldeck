import * as React from "react";
import { useSelector } from "react-redux";
import { Dialog } from "core/elements";
import { TStore } from "core/types";

export default function DialogMapper() {
  const dialogs = useSelector((store: TStore) => store.app.uiDialogs);

  return (
    <>
      {dialogs.map((i) => (
        <Dialog key={i.id} id={i.id} content={i.content} actions={i.actions} config={i.config} />
      ))}
    </>
  );
}
