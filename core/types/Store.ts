import { TStoreApp } from "../store/reducerApp";
import { TStoreUser } from "core/store/reducerUser";
import { TStoreTabs } from "../store/reducerTabs";
import { TStoreDeck } from "../store/reducerDeck";

export type TStore = {
  app: TStoreApp;
  user: TStoreUser;
  tabs: TStoreTabs;
  deck: TStoreDeck;
};

export type TStoreAction = {
  type: string;
  payload: any;
};
