import * as React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { Icon, AnimatedGrid, Dropdown } from "core/elements";
import { useDialog } from "core/tools";
import { LOGOUT, REMOVE_FROM_DECK } from "core/mutations";
import { TTool, TStore } from "core/types";
import { GET_USER_DATA, GET_TOOLS } from "core/queries";
import ToolCard from "../ToolCard/ToolCard";
import Nameplate from "../Nameplate/Nameplate";
import DeckEmpty from "../DeckEmpty/DeckEmpty";
import css from "./Deck.module.scss";
import { subCatOptions } from "core/config";

const Deck: React.FC = () => {
  const [addedTools, setAddedTools] = React.useState<TTool[]>([]);
  const [filter, setFilter] = React.useState<string | undefined>();
  const { data: dataUser } = useQuery(GET_USER_DATA, { fetchPolicy: "cache-and-network" });
  const { data: dataTools } = useQuery(GET_TOOLS);
  const [removeFromDeck] = useMutation(REMOVE_FROM_DECK);
  const cache = useApolloClient().cache;
  const tabs = useSelector((store: TStore) => store.tabs.opened);
  const dispatch = useDispatch();
  const dialog = useDialog();
  const router = useRouter();
  const client = useApolloClient();
  const [logout] = useMutation(LOGOUT);

  React.useEffect(() => {
    const storedDeckFilter = localStorage.getItem("DECK_FILTER");

    if (storedDeckFilter) {
      setFilter(storedDeckFilter);
    }

    if (dataTools && dataUser) {
      let newAddedTools = [];

      for (let i = 0; i < dataUser.deck.toolIds.length; i++) {
        newAddedTools.push(dataTools.tools.find((tool: TTool) => tool.id === dataUser.deck.toolIds[i]));
      }

      setAddedTools(newAddedTools);

      localStorage.setItem("DECK", JSON.stringify(newAddedTools));
    } else {
      const storedDeck = JSON.parse(localStorage.getItem("DECK") as any);

      if (storedDeck) {
        setAddedTools(storedDeck);
      }
    }
  }, [dataTools, dataUser]);

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

  const onClickDel = (id: string, subCat: string) => {
    const callback = () => {
      // Change filter if last one

      if (addedTools.filter((tool) => tool.subCat === subCat).length === 1) {
        setFilter("");

        localStorage.setItem("DECK_FILTER", "");
      }

      // Update local deck

      const newDataDeckToolIds = dataUser.deck.toolIds.filter((i: string) => i !== id);

      cache.writeQuery({ query: GET_USER_DATA, data: { user: dataUser.user, deck: { toolIds: newDataDeckToolIds, __typename: dataUser.deck.__typename } } });

      // Update server

      removeFromDeck({ variables: { toolId: id } });

      // Update local tool user count

      let newTools = (cache.readQuery({ query: GET_TOOLS }) as any).tools as [TTool];
      const toolIndex = newTools.findIndex((i) => i.id === id);

      newTools[toolIndex].users = newTools[toolIndex].users - 1;

      cache.writeQuery({ query: GET_TOOLS, data: { newTools } });
    };

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

  const filteredAddedTools = React.useMemo(() => addedTools.filter((i) => (filter ? i.subCat === filter : true)), [addedTools, filter]);
  const filterOptions = React.useMemo(
    () => [{ label: "All", value: "" }, ...subCatOptions.filter((i) => addedTools.findIndex((tool) => tool.subCat === i.value) !== -1)],
    [addedTools]
  );

  return (
    <div className={css.deck}>
      <div className={css.header}>
        <div className={css.headerTitle}>Your Deck</div>

        <div
          className={css.headerProfile}
          onClick={() =>
            dialog(
              dataUser?.user.name,
              [
                {
                  label: "Logout",
                  callback: () => {
                    logout().then(() => {
                      router.push("/");

                      localStorage.clear();
                      client.resetStore();
                    });
                  }
                },
                { label: "Close" }
              ],
              { autoclose: true }
            )
          }
        >
          <div className={css.headerProfileAvatar}>
            {dataUser && dataUser.user.avatarUrl ? <img src={dataUser.user.avatarUrl} draggable="false" /> : <Icon name="user" />}
          </div>

          {dataUser ? <div className={css.headerProfileName}>{dataUser.user.name}</div> : null}
        </div>
      </div>

      {addedTools.length !== 0 ? (
        <div className={css.filter}>
          <div className={css.filterLabel}>Filter:</div>

          <Dropdown
            className={css.filterDD}
            options={filterOptions}
            value={filter as any}
            onChange={(value) => {
              localStorage.setItem("DECK_FILTER", value);

              setFilter(value);
            }}
          />

          <div className={css.filterNum}>
            {filteredAddedTools.length} Tool{filteredAddedTools.length > 1 ? "s" : ""}
          </div>
        </div>
      ) : null}

      {addedTools.length !== 0 ? (
        <AnimatedGrid columns={[4, 4, 3, 2, 1]} gap={[60, 60, 60, 60, 60]}>
          {filteredAddedTools.map((tool: TTool) => (
            <div key={tool.id}>
              <ToolCard className={css.gridItemCard} src={tool.coverUrl || tool.iconUrl} external={tool.external} onClick={() => onClickTool(tool)} />
              <Nameplate className={css.gridItemPlate} label={tool.label} onClickDel={() => onClickDel(tool.id, tool.subCat)} />
            </div>
          ))}
        </AnimatedGrid>
      ) : (
        <DeckEmpty />
      )}
    </div>
  );
};

export default Deck;
