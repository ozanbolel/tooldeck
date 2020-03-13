import { combineReducers } from "redux";

import reducerTabs from "./reducerTabs";
import reducerDeck from "./reducerDeck";

const reducerRoot = combineReducers({
  tabs: reducerTabs,
  deck: reducerDeck
});

export default reducerRoot;
