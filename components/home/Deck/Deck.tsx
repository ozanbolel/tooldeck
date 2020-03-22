import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "core/elements";
import { useDialog } from "core/tools";
import { LOGOUT } from "core/mutations";
import { TTool, TStore } from "core/types";
import { tools } from "core/data";
import { GET_USER } from "core/queries";
import css from "./Deck.module.scss";

import ToolCard from "../ToolCard/ToolCard";
import Nameplate from "../Nameplate/Nameplate";

const Deck: React.FC = () => {
  const { data } = useQuery(GET_USER);
  const tabs = useSelector((store: TStore) => store.tabs.opened);
  const addedToolIds = useSelector((store: TStore) => store.deck.toolIds);
  const dispatch = useDispatch();
  const dialog = useDialog();
  const router = useRouter();
  const [logout] = useMutation(LOGOUT);

  const onClickTool = (tool: TTool) => {
    if (!tool.external) {
      if (tabs.findIndex((i) => i.id === tool.id) === -1) {
        dispatch({ type: "ADD_TAB", payload: tool });
      }

      dispatch({ type: "SET_CURRENT_TAB_ID", payload: tool.id });
    } else {
      window.open("https://" + tool.url);
    }
  };

  const onClickDel = (id: string) => {
    const callback = () => dispatch({ type: "REMOVE_TOOL_ID", payload: id });

    dialog(
      "Are you sure you want to delete this Tool from your Deck?",
      [
        {
          label: "Delete",
          callback,
          highlight: true
        },
        { label: "Cancel" }
      ],
      { autoclose: true }
    );
  };

  const renderAddedTools = () => {
    let addedTools = [];

    for (let index = 0; index < addedToolIds.length; index++) {
      addedTools.push(tools.find((tool) => tool.id === addedToolIds[index]));
    }

    return addedTools.map((tool: any) => {
      return (
        <div key={tool.id} className={css.gridItemContainer}>
          <div className={css.gridItemShadow} />

          <ToolCard className={css.gridItemCard} tool={tool} onClick={() => onClickTool(tool)} />
          <Nameplate className={css.gridItemPlate} label={tool.label} onClickDel={() => onClickDel(tool.id)} />
        </div>
      );
    });
  };

  return (
    <div className={css.deck}>
      <div className={css.header}>
        <div className={css.headerTitle}>Your Deck</div>

        {data?.user ? (
          <div
            className={css.headerProfile}
            onClick={() =>
              dialog(
                "Name: " + data.user.name,
                [
                  {
                    label: "Logout",
                    callback: () => {
                      logout();

                      localStorage.removeItem("LOGIN");

                      router.push("/");
                    }
                  },
                  { label: "Close" }
                ],
                { autoclose: true }
              )
            }
          >
            <img src={data.user.avatarUrl} draggable="false" />
          </div>
        ) : null}
      </div>

      {addedToolIds.length !== 0 ? (
        <div className={css.grid}>{renderAddedTools()}</div>
      ) : (
        <div className={css.empty}>
          <img src="/static/taken.svg" className={css.emptyImg} draggable="false" />

          <div className={css.emptyText}>Looks like aliens stole all the tools 😕</div>
          <div className={css.emptyText}>Don't worry, we have plenty 😉</div>

          <div className={css.emptyTextHightlight}>
            <Link href="/explore">
              <a>
                Click to Explore <Icon name="arrow-right" className={css.emptyTextHightlightIcon} />
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deck;
