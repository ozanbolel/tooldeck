import { TStoreAction, TDialogObject, TModalObject } from "core/types";

export type TStoreApp = {
  uiModals: TModalObject[];
  uiDialogs: TDialogObject[];
};

const initialState: TStoreApp = {
  uiModals: [],
  uiDialogs: []
};

export default function(state = initialState, action: TStoreAction) {
  switch (action.type) {
    case "ADD_MODAL":
      return Object.assign({}, state, {
        uiModals: [action.payload, ...state.uiModals]
      });

    case "REMOVE_MODAL":
      return Object.assign({}, state, {
        uiModals: state.uiModals.filter((i) => i.id !== action.payload)
      });

    case "RESET_MODALS":
      return Object.assign({}, state, {
        uiModals: initialState.uiModals
      });

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
