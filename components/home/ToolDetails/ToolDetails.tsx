import * as React from "react";
import { Button, Icon } from "core/elements";
import { TModalComponent, TTool } from "core/types";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import { ADD_TO_DECK } from "core/mutations";
import { GET_USER } from "core/queries";
import { useDialog } from "core/tools";
import css from "./ToolDetails.module.scss";

const ToolDetails: TModalComponent = ({ closeModal, payload }) => {
  const tool: TTool = payload?.tool;
  const callback: Function = payload?.callback;
  const [isAdded, setIsAdded] = React.useState(false);
  const [addToDeck, { loading }] = useMutation(ADD_TO_DECK);
  const { data } = useQuery(GET_USER, { fetchPolicy: "cache-only" });
  const { cache } = useApolloClient();
  const dialog = useDialog();

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
        callback ? callback() : null;

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

  return (
    <div className={css.container}>
      {tool.external ? <img src={"https://" + (tool.coverUrl || tool.iconUrl)} draggable="false" /> : <iframe src={"https://" + tool.url} scrolling="no" />}

      <div className={css.close} onClick={() => closeModal()}>
        <Icon name="x" />
      </div>

      <Button
        label={isAdded ? "ADDED" : "ADD TO DECK"}
        className={css.addButton}
        onClick={() => {
          onClickAdd();
        }}
        loading={loading}
        disabled={isAdded}
      />

      <div className={css.desc}>{tool.desc}</div>
    </div>
  );
};

export default ToolDetails;
