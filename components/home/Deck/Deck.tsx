import * as React from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { AnimatedGrid, Dropdown } from "core/elements";
import { useDialog } from "core/tools";
import { REMOVE_FROM_DECK } from "core/mutations";
import { TTool, TStore } from "core/types";
import { GET_TOOLS, GET_DECK } from "core/queries";
import ToolCard from "../ToolCard/ToolCard";
import Nameplate from "../Nameplate/Nameplate";
import DeckEmpty from "../DeckEmpty/DeckEmpty";
import css from "./Deck.module.scss";
import { categories, isProduction } from "core/config";
import ReactGA from "react-ga";

const Deck: React.FC = () => {
  const [addedTools, setAddedTools] = React.useState<TTool[]>([]);
  const [filter, setFilter] = React.useState<string | undefined>();
  const { data: dataDeck, loading: loadingDeck } = useQuery(GET_DECK, { fetchPolicy: "cache-and-network" });
  const { data: dataTools, loading: loadingTools } = useQuery(GET_TOOLS);
  const [removeFromDeck] = useMutation(REMOVE_FROM_DECK);
  const cache = useApolloClient().cache;
  const tabs = useSelector((store: TStore) => store.tabs.opened);
  const dispatch = useDispatch();
  const dialog = useDialog();

  React.useEffect(() => {
    const storedDeckFilter = localStorage.getItem("DECK_FILTER");

    if (storedDeckFilter) {
      setFilter(storedDeckFilter);
    }

    if (dataTools && dataDeck) {
      let newAddedTools = [];

      for (let i = 0; i < dataDeck.deck.toolIds.length; i++) {
        newAddedTools.push(dataTools.tools.find((tool: TTool) => tool.id === dataDeck.deck.toolIds[i]));
      }

      setAddedTools(newAddedTools);

      localStorage.setItem("DECK", JSON.stringify(newAddedTools));
    } else {
      const storedDeck = JSON.parse(localStorage.getItem("DECK") as any);

      if (storedDeck) {
        setAddedTools(storedDeck);
      }
    }
  }, [dataTools, dataDeck]);

  const onClickTool = (tool: TTool) => {
    if (isProduction) {
      ReactGA.event({ category: "Usage", action: "Tool Launched", label: tool.external ? "External" : "Internal" });
    }

    if (!tool.external) {
      if (tabs.findIndex((i) => i.id === tool.id) === -1) {
        dispatch({ type: "ADD_TAB", payload: tool });
      }

      dispatch({ type: "SET_CURRENT_TAB_ID", payload: tool.id });
    } else {
      window.open("https://" + tool.url);
    }
  };

  const onClickDel = (id: string, cat: string) => {
    const callback = () => {
      if (isProduction) {
        ReactGA.event({ category: "Usage", action: "Tool Deleted" });
      }

      // Change filter if last one

      if (addedTools.filter((tool) => tool.cat === cat).length === 1) {
        setFilter("");

        localStorage.setItem("DECK_FILTER", "");
      }

      // Update local deck

      const newDataDeckToolIds = dataDeck.deck.toolIds.filter((i: string) => i !== id);

      cache.writeQuery({ query: GET_DECK, data: { deck: { toolIds: newDataDeckToolIds, __typename: dataDeck.deck.__typename } } });

      // Update server

      removeFromDeck({ variables: { toolId: id } });

      // Update local tool user count

      let newTools = (cache.readQuery({ query: GET_TOOLS }) as any).tools as [TTool];
      const toolIndex = newTools.findIndex((i) => i.id === id);

      newTools[toolIndex].users = newTools[toolIndex].users - 1;

      cache.writeQuery({ query: GET_TOOLS, data: { tools: newTools } });
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

  const filteredAddedTools = React.useMemo(() => addedTools.filter((i) => (filter ? i.cat === filter : true)), [addedTools, filter]);
  const filterOptions = React.useMemo(
    () => [{ label: "All", value: "" }, ...categories.filter((i) => addedTools.findIndex((tool) => tool.cat === i.value) !== -1)],
    [addedTools]
  );

  return (
    <div className={css.deck}>
      {addedTools.length !== 0 ? (
        <>
          <div className={css.filter}>
            <div className={css.filterLabel}>Show:</div>

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

          <AnimatedGrid columns={[4, 4, 3, 2, 1]} gap={[60, 60, 60, 60, 30]}>
            {filteredAddedTools.map((tool: TTool) => (
              <div key={tool.id}>
                <ToolCard
                  className={css.gridItemCard}
                  iconUrl={tool.iconUrl}
                  coverUrl={tool.coverUrl}
                  external={tool.external}
                  onClick={() => onClickTool(tool)}
                />
                <Nameplate className={css.gridItemPlate} label={tool.label} onClickDel={() => onClickDel(tool.id, tool.cat)} />
              </div>
            ))}
          </AnimatedGrid>
        </>
      ) : null}

      {!loadingDeck && !loadingTools && addedTools.length === 0 ? <DeckEmpty /> : null}
    </div>
  );
};

export default Deck;
