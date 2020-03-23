import * as React from "react";
import { useDispatch } from "react-redux";
import { TDialogObject, TDialogAction } from "core/types";
import css from "./Dialog.module.scss";

type TDialog = React.FC<TDialogObject>;

export const Dialog: TDialog = ({ id, content, actions, config }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const dispatch = useDispatch();

  const isArray = actions.constructor === Array;

  // Close on key press

  if (config?.autoclose) {
    React.useEffect(() => {
      function handleKeyPress(e: KeyboardEvent) {
        e.preventDefault();

        const doClose = () => {
          const action = isArray ? (actions as TDialogAction[])[0] : (actions as TDialogAction);

          action.callback ? action.callback() : null;

          close();
        };

        if (e.key === "Escape") {
          doClose();
        }

        if (e.key === "Enter" && (!isArray || (isArray && (actions as TDialogAction[]).length === 1))) {
          doClose();
        }
      }

      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }, []);
  }

  // Controllers

  const removeSelf = () => dispatch({ type: "REMOVE_DIALOG", payload: id });

  const close = () => {
    setIsClosing(true);

    setTimeout(() => removeSelf(), 400);
  };

  const closeFromOut = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(css.dialog)) {
      close();
    }
  };

  // Return

  const createButton = (i: TDialogAction) => (
    <div
      key={i.label}
      onClick={() => {
        i.callback ? i.callback() : null;
        close();
      }}
      className={css.actionItem}
    >
      <div className={css.actionItemInner + (i.highlight ? " " + css.highlight : "")}>{i.label}</div>
    </div>
  );

  const renderButtons = () => {
    if (isArray) {
      return (actions as TDialogAction[]).map((i) => createButton(i));
    } else {
      return createButton(actions as TDialogAction);
    }
  };

  return (
    <div
      className={css.dialog + (config?.autoclose ? " " + css.hasAutoclose : "") + (isClosing ? " " + css.closing : "")}
      onClick={config?.autoclose ? (e) => closeFromOut(e) : undefined}
    >
      <div className={css.inner}>
        <div className={css.innerContent}>{typeof content === "string" ? <span>{content}</span> : content}</div>

        <div className={css.actions}>{renderButtons()}</div>
      </div>
    </div>
  );
};
