import { TStoreApp } from "../store/reducerApp";
import { TStoreTabs } from "../store/reducerTabs";

export type TStore = {
  app: TStoreApp;
  tabs: TStoreTabs;
};

export type TStoreAction = {
  type: string;
  payload: any;
};
