import { useDispatch } from "react-redux";
import { TModalObject } from "core/types";

export function useModal() {
  const dispatch = useDispatch();

  return (content: TModalObject["content"], config?: TModalObject["config"]) => {
    dispatch({ type: "ADD_MODAL", payload: { id: new Date().getTime().toString(), content, config } });
  };
}
