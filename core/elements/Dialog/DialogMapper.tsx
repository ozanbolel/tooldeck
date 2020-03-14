import * as React from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "core/elements";
import { TStore } from "core/types";

export default function DialogMapper() {
  const dialogs = useSelector((store: TStore) => store.app.uiDialogs);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const removeAll = () => dispatch({ type: "RESET_DIALOGS" });

    Router.events.on("routeChangeStart", removeAll);
    return () => Router.events.off("routeChangeStart", removeAll);
  }, []);

  return (
    <>
      {dialogs.map((i) => (
        <Dialog key={i.id} id={i.id} content={i.content} actions={i.actions} config={i.config} />
      ))}
    </>
  );
}
