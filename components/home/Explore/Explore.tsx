import * as React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useDialog, useModal } from "core/tools";
import { TStore, TModalComponent } from "core/types";
import { tools } from "core/data";
import css from "./Explore.module.scss";
import ToolCard from "../ToolCard/ToolCard";

const Selam: TModalComponent = ({ closeModal }) => {
  return <div style={{ background: "white", color: "black", padding: 30, borderRadius: 10 }}>ljdafjkdskj</div>;
};

const Explore: React.FC = () => {
  const addedToolIds = useSelector((store: TStore) => store.deck.toolIds);
  const dispatch = useDispatch();
  const dialog = useDialog();
  const modal = useModal();
  const router = useRouter();

  const onClickAdd = (id: string) => {
    if (addedToolIds.findIndex((i) => i === id) === -1) {
      dispatch({ type: "ADD_TOOL_ID", payload: id });

      dialog("Tool added to your Deck!", [{ label: "Back to Deck", callback: () => router.push("/deck"), highlight: true }, { label: "Keep Exploring" }]);
    } else {
      dialog("This tool is already in your Deck.", { label: "Ok", highlight: true });
    }
  };

  const onClickView = (id: string) => modal(Selam, { autoclose: true });

  return (
    <>
      <div className={css.section}>
        <div className={css.title}>For Developers</div>

        <div className={css.grid}>
          {tools.map((tool) => (
            <div key={tool.id} className={css.gridItem}>
              <ToolCard src={tool.coverUrl || tool.iconUrl} className={css.cover} onClick={() => onClickView(tool.id)} />

              <div className={css.gridItemInfo}>
                <div className={css.label}>{tool.label}</div>
                <div className={css.desc}>{tool.desc}</div>

                <button onClick={() => onClickAdd(tool.id)}>ADD</button>
                <button onClick={() => onClickView(tool.id)}>VIEW</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
