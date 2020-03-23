import * as React from "react";
import css from "./Modal.module.scss";
import { useDispatch } from "react-redux";
import { TModalObject } from "core/types";

type TModal = React.FC<TModalObject>;

export const Modal: TModal = ({ id, content, config }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsClosing(true);

    setTimeout(() => dispatch({ type: "REMOVE_MODAL", payload: id }), 400);
  };

  const closeFromOut = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(css.container)) {
      closeModal();
    }
  };

  const renderContent = () => React.useMemo(() => React.createElement(content, { closeModal }), []);

  return (
    <div
      className={css.container + (config?.autoclose ? " " + css.hasAutoclose : "") + (isClosing ? " " + css.closing : "")}
      onClick={config?.autoclose ? (e) => closeFromOut(e) : undefined}
    >
      <div className={css.content}>{renderContent()}</div>
    </div>
  );
};
