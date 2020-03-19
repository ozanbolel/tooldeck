import { combineReducers } from "redux";

import reducerApp from "./reducerApp";
import reducerUser from "./reducerUser";
import reducerTabs from "./reducerTabs";
import reducerDeck from "./reducerDeck";

const reducerRoot = combineReducers({
  app: reducerApp,
  user: reducerUser,
  tabs: reducerTabs,
  deck: reducerDeck
});

export default reducerRoot;
