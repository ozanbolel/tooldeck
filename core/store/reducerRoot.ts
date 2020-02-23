import { combineReducers } from "redux";

import reducerHome from "./reducerHome";

const reducerRoot = combineReducers({
  home: reducerHome
});

export default reducerRoot;
