import { TStoreTabs } from "../store/reducerTabs";
import { TStoreDeck } from "../store/reducerDeck";

export type TStore = {
  tabs: TStoreTabs;
  deck: TStoreDeck;
};

export type TStoreAction = {
  type: string;
  payload: any;
};
