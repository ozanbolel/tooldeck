import { TStoreAction } from "core/types";

export type TStoreDeck = {
  toolIds: string[];
};

const initialState: TStoreDeck = {
  toolIds: []
};

export default function(state = initialState, action: TStoreAction) {
  switch (action.type) {
    case "ADD_TOOL_ID":
      return Object.assign({}, state, {
        toolIds: [action.payload, ...state.toolIds]
      });

    case "REMOVE_TOOL_ID":
      return Object.assign({}, state, {
        toolIds: state.toolIds.filter((i) => i !== action.payload)
      });

    case "REPLACE_TOOL_IDS":
      return Object.assign({}, state, {
        toolIds: action.payload
      });

    default:
      return state;
  }
}
