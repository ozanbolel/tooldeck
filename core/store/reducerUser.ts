import { TStoreAction } from "core/types";

export type TStoreUser = {
  loaded: boolean;
  name: string;
  avatarUrl: string;
};

const initialState: TStoreUser = {
  loaded: false,
  name: "",
  avatarUrl: ""
};

export default function(state = initialState, action: TStoreAction) {
  switch (action.type) {
    case "SET_USER":
      return Object.assign({}, state, {
        loaded: true,
        name: action.payload.name,
        avatarUrl: action.payload.avatarUrl
      });

    case "UNLOAD_USER":
      return Object.assign({}, state, {
        loaded: initialState.loaded,
        name: initialState.name,
        avatarUrl: initialState.avatarUrl
      });

    default:
      return state;
  }
}
