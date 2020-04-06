import * as React from "react";
import css from "./Web.module.scss";

type props = {
  url: string;
  show?: boolean;
  className?: string;
  scrolling?: React.IframeHTMLAttributes<HTMLIFrameElement>["scrolling"];
};

export const Web: React.FC<props> = ({ url, show, className, scrolling }) => {
  return (
    <iframe
      src={"https://" + url}
      className={css.iframe + (className ? " " + className : "")}
      style={show === false ? { display: "none" } : {}}
      draggable="false"
      scrolling={scrolling}
    />
  );
};
