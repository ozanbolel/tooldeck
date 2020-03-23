import { TStoreApp } from "../store/reducerApp";
import { TStoreTabs } from "../store/reducerTabs";
import { TStoreDeck } from "../store/reducerDeck";

export type TStore = {
  app: TStoreApp;
  tabs: TStoreTabs;
  deck: TStoreDeck;
};

export type TStoreAction = {
  type: string;
  payload: any;
};
