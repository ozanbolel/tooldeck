import * as React from "react";
import Link from "next/link";
import { Button } from "core/elements";
import css from "./DeckEmpty.module.scss";

export const DeckEmpty: React.FC = () => {
  return (
    <div className={css.empty}>
      <img src="/static/taken.svg" className={css.emptyImg} draggable="false" />

      <div className={css.emptyText}>Looks like aliens stole all the tools 😕</div>
      <div className={css.emptyText}>Don't worry, ToolDeck has plenty 😉</div>

      <Link href="/explore">
        <a>
          <Button label="Explore" icon={{ name: "arrow-right", position: "right", className: css.emptyButtonIcon }} className={css.emptyButton} />
        </a>
      </Link>
    </div>
  );
};

export default DeckEmpty;
