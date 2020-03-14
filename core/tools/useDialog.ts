import { useDispatch } from "react-redux";
import { TDialogObject } from "core/types";

export function useDialog() {
  const dispatch = useDispatch();

  return (content: TDialogObject["content"], actions: TDialogObject["actions"], config?: TDialogObject["config"]) => {
    dispatch({ type: "ADD_DIALOG", payload: { id: new Date().getTime().toString(), content, actions, config } });
  };
}
