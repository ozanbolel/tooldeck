import * as React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useDialog } from "core/tools";
import { TStore } from "core/types";
import { tools } from "core/data";
import css from "./Explore.module.scss";
import ToolCard from "../ToolCard/ToolCard";

const Explore: React.FC = () => {
  const addedToolIds = useSelector((store: TStore) => store.deck.toolIds);
  const dispatch = useDispatch();
  const dialog = useDialog();
  const router = useRouter();

  const onClickTool = (id: string) => {
    if (addedToolIds.findIndex((i) => i === id) === -1) {
      dispatch({ type: "ADD_TOOL_ID", payload: id });

      dialog("Tool added to your Deck!", [{ label: "Back to Deck", callback: () => router.push("/deck"), highlight: true }, { label: "Keep Exploring" }]);
    } else {
      dialog("This tool is already in your Deck.", { label: "Ok", highlight: true });
    }
  };

  return (
    <>
      <div className={css.section}>
        <div className={css.title}>Develop with Ease</div>

        <div className={css.grid}>
          {tools.map((tool) => (
            <div key={tool.id} className={css.gridItem}>
              <ToolCard id={tool.id} className={css.cover} onClick={() => onClickTool(tool.id)} />

              <div className={css.gridItemInfo}>
                <div className={css.label}>{tool.label}</div>
                <div className={css.desc}>Pick colors.</div>

                <button onClick={() => onClickTool(tool.id)}>VIEW</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
