import { TStoreAction, TDialogObject } from "core/types";

export type TStoreApp = {
  uiDialogs: TDialogObject[];
};

const initialState: TStoreApp = {
  uiDialogs: []
};

export default function(state = initialState, action: TStoreAction) {
  switch (action.type) {
    case "ADD_DIALOG":
      return Object.assign({}, state, {
        uiDialogs: [action.payload, ...state.uiDialogs]
      });

    case "REMOVE_DIALOG":
      return Object.assign({}, state, {
        uiDialogs: state.uiDialogs.filter((i) => i.id !== action.payload)
      });

    case "RESET_DIALOGS":
      return Object.assign({}, state, {
        uiDialogs: initialState.uiDialogs
      });

    default:
      return state;
  }
}
