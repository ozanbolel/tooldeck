import { FC } from "react";

export type TModalComponent = FC<{
  closeModal: Function;
}>;

export type TModalConfig = {
  autoclose?: boolean;
};

export type TModalObject = {
  id: string;
  content: TModalComponent;
  config?: TModalConfig;
};
