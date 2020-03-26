import * as React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { Icon, AnimatedGrid } from "core/elements";
import { useDialog } from "core/tools";
import { LOGOUT, REMOVE_FROM_DECK } from "core/mutations";
import { TTool, TStore } from "core/types";
import { tools } from "core/data";
import { GET_USER } from "core/queries";
import css from "./Deck.module.scss";

import ToolCard from "../ToolCard/ToolCard";
import Nameplate from "../Nameplate/Nameplate";
import DeckEmpty from "../DeckEmpty/DeckEmpty";

const Deck: React.FC = () => {
  const { data } = useQuery(GET_USER);
  const [removeFromDeck] = useMutation(REMOVE_FROM_DECK);
  const tabs = useSelector((store: TStore) => store.tabs.opened);
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
    const newDataDeckToolIds = data.deck.toolIds.filter((i: string) => i !== id);

    const callback = () =>
      removeFromDeck({
        variables: { toolId: id },
        update: (cache) =>
          cache.writeQuery({ query: GET_USER, data: { user: data.user, deck: { toolIds: newDataDeckToolIds, __typename: data.deck.__typename } } })
      });

    dialog(
      "Are you sure you want to delete this Tool from your Deck?",
      [
        {
          label: "Delete",
          callback,
          warn: true
        },
        { label: "Cancel" }
      ],
      { autoclose: true }
    );
  };

  const renderAddedTools = () => {
    let addedTools = [];

    for (let index = 0; index < data?.deck.toolIds.length; index++) {
      addedTools.push(tools.find((tool) => tool.id === data?.deck.toolIds[index]));
    }

    return addedTools.map((tool: any) => (
      <div key={tool.id} className={css.gridItemContainer}>
        <div className={css.gridItemShadow} />

        <ToolCard className={css.gridItemCard} src={tool.coverUrl || tool.iconUrl} external={tool.external} onClick={() => onClickTool(tool)} />
        <Nameplate className={css.gridItemPlate} label={tool.label} onClickDel={() => onClickDel(tool.id)} />
      </div>
    ));
  };

  return (
    <div className={css.deck}>
      <div className={css.header}>
        <div className={css.headerTitle}>Your Deck</div>

        <div
          className={css.headerProfile}
          onClick={() =>
            dialog(
              data?.user.name,
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
          <div className={css.headerProfileAvatar}>
            {data && data.user.avatarUrl ? <img src={data.user.avatarUrl} draggable="false" /> : <Icon name="user" />}
          </div>

          <div className={css.headerProfileName}>{data?.user.name}</div>
        </div>
      </div>

      {data?.deck.toolIds.length !== 0 ? <AnimatedGrid>{renderAddedTools()}</AnimatedGrid> : <DeckEmpty />}
    </div>
  );
};

export default Deck;
