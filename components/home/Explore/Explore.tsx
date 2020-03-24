import * as React from "react";
import { useRouter } from "next/router";
import { useDialog, useModal } from "core/tools";
import { TTool } from "core/types";
import { tools } from "core/data";
import css from "./Explore.module.scss";
import ToolCard from "../ToolCard/ToolCard";
import ToolDetails from "../ToolDetails/ToolDetails";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TO_DECK } from "core/mutations";

const Explore: React.FC = () => {
  const [addToDeck] = useMutation(ADD_TO_DECK);
  const dialog = useDialog();
  const modal = useModal();
  const router = useRouter();

  const onClickAdd = async (id: string) =>
    addToDeck({ variables: { toolId: id } })
      .then(() => {
        dialog("Tool added to your Deck!", [{ label: "Back to Deck", callback: () => router.push("/deck"), highlight: true }, { label: "Keep Exploring" }]);
      })
      .catch((e) => {
        if (e.graphQLErrors[0].code === "ALREADY_IN_DECK") {
          dialog("This tool is already in your Deck.", { label: "Ok", highlight: true });
        } else {
          dialog("Error: Please try again.", { label: "Ok", highlight: true });
        }
      });

  const onClickView = (tool: TTool) => modal(ToolDetails, { autoclose: true, payload: { tool, onClickAdd } });

  return (
    <>
      <div className={css.section}>
        <div className={css.title}>For Developers</div>

        <div className={css.grid}>
          {tools.map((tool) => (
            <div key={tool.id} className={css.gridItem}>
              <ToolCard src={tool.coverUrl || tool.iconUrl} className={css.cover} onClick={() => onClickView(tool)} />

              <div className={css.gridItemInfo}>
                <div className={css.label}>{tool.label}</div>
                <div className={css.desc}>{tool.desc}</div>

                <button onClick={() => onClickAdd(tool.id)}>ADD</button>
                <button onClick={() => onClickView(tool)}>VIEW</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
