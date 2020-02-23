import { createStore } from "redux";
import reducerRoot from "./reducerRoot";

export default function initializeStore() {
  return createStore(reducerRoot);
}
