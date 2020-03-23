import { FC } from "react";

export type TModalComponent = FC<{
  closeModal: Function;
  payload?: any;
}>;

export type TModalConfig = {
  autoclose?: boolean;
  payload?: any;
};

export type TModalObject = {
  id: string;
  content: TModalComponent;
  config?: TModalConfig;
};
