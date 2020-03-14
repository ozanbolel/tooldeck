import { ReactNode } from "react";

export type TDialogAction = {
  label: string;
  callback?: Function;
  highlight?: boolean;
};

export type TDialogConfig = {
  autoclose?: boolean;
};

export type TDialogObject = {
  id: string;
  content: string | ReactNode;
  actions: TDialogAction | TDialogAction[];
  config?: TDialogConfig;
};
