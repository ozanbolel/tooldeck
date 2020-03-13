import { TStoreAction } from "core/types";

export type TStoreDeck = {
  toolIds: string[];
};

const initialState: TStoreDeck = {
  toolIds: []
};

export default function(state = initialState, action: TStoreAction) {
  switch (action.type) {
    case "ADD_TOOL":
      return Object.assign({}, state, {
        toolIds: [action.payload, ...state.toolIds]
      });

    case "REMOVE_TOOL":
      return Object.assign({}, state, {
        toolIds: state.toolIds.filter((i) => i !== action.payload)
      });

    default:
      return state;
  }
}
