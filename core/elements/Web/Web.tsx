import * as React from "react";
import css from "./Web.scss";

type props = {
  url: string;
  show?: boolean;
};

export const Web: React.FC<props> = ({ url, show }) => {
  return <iframe src={"https://" + url} className={css.iframe} style={show === false ? { display: "none" } : {}} />;
};
