import { combineReducers } from "redux";

import reducerApp from "./reducerApp";
import reducerTabs from "./reducerTabs";

const reducerRoot = combineReducers({
  app: reducerApp,
  tabs: reducerTabs
});

export default reducerRoot;
