import { TStoreAction } from "core/types";

export type TStoreTabs = {
  opened: any[];
  currentTabId: string;
};

const initialState: TStoreTabs = {
  opened: [],
  currentTabId: ""
};

export default function(state = initialState, action: TStoreAction) {
  switch (action.type) {
    case "ADD_TAB":
      return Object.assign({}, state, {
        opened: [action.payload, ...state.opened]
      });

    case "REMOVE_TAB":
      return Object.assign({}, state, {
        opened: state.opened.filter((i) => i.id !== action.payload)
      });

    case "SET_CURRENT_TAB_ID":
      return Object.assign({}, state, {
        currentTabId: action.payload
      });

    case "REPLACE_TABS":
      return Object.assign({}, state, {
        opened: action.payload
      });

    default:
      return state;
  }
}
