import * as React from "react";
import ToolCard from "../ToolCard/ToolCard";
import ToolDetails from "../ToolDetails/ToolDetails";
import { Button } from "core/elements";
import { useModal, useDialog } from "core/tools";
import { TTool } from "core/types";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { GET_USER } from "core/queries";
import { ADD_TO_DECK } from "core/mutations";
import css from "./ToolGridItem.module.scss";

type TToolGridItem = React.FC<{
  tool: TTool;
}>;

const ToolGridItem: TToolGridItem = ({ tool }) => {
  const [isAdded, setIsAdded] = React.useState(false);
  const [addToDeck, { loading }] = useMutation(ADD_TO_DECK);
  const { data } = useQuery(GET_USER, { fetchPolicy: "cache-only" });
  const { cache } = useApolloClient();
  const dialog = useDialog();
  const modal = useModal();

  React.useEffect(() => {
    if (data) {
      if (data.deck.toolIds.findIndex((i: string) => i === tool.id) !== -1) {
        setIsAdded(true);
      }
    }
  }, [data]);

  const onClickAdd = async () =>
    addToDeck({ variables: { toolId: tool.id } })
      .then(() => {
        setIsAdded(true);

        let newToolIds = data.deck.toolIds;
        newToolIds.unshift(tool.id);

        cache.writeQuery({ query: GET_USER, data: { user: data.user, deck: { toolIds: newToolIds, __typename: data.deck.__typename } } });
      })
      .catch((e) => {
        if (e.graphQLErrors[0].code === "ALREADY_IN_DECK") {
          dialog("This tool is already in your Deck.", { label: "Ok", highlight: true });
        } else {
          dialog("Error: Please try again.", { label: "Ok", highlight: true });
        }
      });

  const onClickView = () => modal(ToolDetails, { autoclose: true, payload: { tool, isAdded, callback: () => setIsAdded(true) } });

  return (
    <div key={tool.id} className={css.item}>
      <ToolCard src={tool.coverUrl || tool.iconUrl} className={css.cover} onClick={() => onClickView()} />

      <div className={css.info}>
        <div className={css.label}>{tool.label}</div>
        <div className={css.desc}>{tool.desc}</div>

        <Button label={isAdded ? "ADDED" : "ADD"} className={css.button} onClick={() => onClickAdd()} loading={loading} disabled={isAdded} />
        <Button label="VIEW" className={css.button} onClick={() => onClickView()} />
      </div>
    </div>
  );
};

export default ToolGridItem;
