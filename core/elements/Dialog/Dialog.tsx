import * as React from "react";
import { useDispatch } from "react-redux";
import { TDialogObject, TDialogConfig, TDialogAction } from "core/types";
import css from "./Dialog.scss";

type TDialog = React.FC<{
  id: TDialogObject["id"];
  content: TDialogObject["content"];
  actions: TDialogObject["actions"];
  config?: TDialogConfig;
}>;

export const Dialog: TDialog = ({ id, content, actions, config }) => {
  const autoclose = config ? config.autoclose : undefined;

  const [isClosing, setIsClosing] = React.useState(false);
  const dispatch = useDispatch();

  const isArray = actions.constructor === Array;

  // Close on key press

  if (autoclose) {
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
    if (autoclose) {
      if ((e.target as HTMLElement).classList.contains(css.dialog)) {
        close();
      }
    }
  };

  // Return

  const createButton = (i: TDialogAction, index?: number) => (
    <div
      key={index ? index : undefined}
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
      return (actions as TDialogAction[]).map((i, index) => createButton(i, index));
    } else {
      return createButton(actions as TDialogAction);
    }
  };

  return (
    <div className={css.dialog + (autoclose ? " " + css.hasAutoclose : "") + (isClosing ? " " + css.closing : "")} onClick={(e) => closeFromOut(e)}>
      <div className={css.inner}>
        <div className={css.innerContent}>{typeof content === "string" ? <span>{content}</span> : content}</div>

        <div className={css.actions}>{renderButtons()}</div>
      </div>
    </div>
  );
};
