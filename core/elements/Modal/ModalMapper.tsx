import * as React from "react";
import { useSelector } from "react-redux";
import { TStore } from "core/types";
import { Modal } from "./Modal";

export default function ModalMapper() {
  const modals = useSelector((store: TStore) => store.app.uiModals);

  return (
    <>
      {modals.map((i) => (
        <Modal key={i.id} id={i.id} content={i.content} config={i.config} />
      ))}
    </>
  );
}
