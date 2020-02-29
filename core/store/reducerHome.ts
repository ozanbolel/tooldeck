export type THome = {
  tabs: Array<any>;
  currentTabId: string;
};

type action = {
  type: string;
  payload: any;
};

const initialState: THome = {
  tabs: [],
  currentTabId: ""
};

export default function userReducer(state = initialState, action: action) {
  switch (action.type) {
    case "ADD_TAB":
      return Object.assign({}, state, {
        tabs: [action.payload, ...state.tabs]
      });

    case "REMOVE_TAB":
      return Object.assign({}, state, {
        tabs: state.tabs.filter((i) => i.id !== action.payload)
      });

    case "SET_CURRENT_TAB_ID":
      return Object.assign({}, state, {
        currentTabId: action.payload
      });

    default:
      return state;
  }
}
