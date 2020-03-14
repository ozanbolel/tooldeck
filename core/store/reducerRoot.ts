import { combineReducers } from "redux";

import reducerApp from "./reducerApp";
import reducerTabs from "./reducerTabs";
import reducerDeck from "./reducerDeck";

const reducerRoot = combineReducers({
  app: reducerApp,
  tabs: reducerTabs,
  deck: reducerDeck
});

export default reducerRoot;
