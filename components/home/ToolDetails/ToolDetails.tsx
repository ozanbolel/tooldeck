import * as React from "react";
import { useDialog } from "core/tools";
import css from "./ToolDetails.module.scss";
import { TModalComponent, TTool } from "core/types";
import { Button, Icon } from "core/elements";
import { useMutation, useApolloClient, useLazyQuery } from "@apollo/react-hooks";
import { ADD_TO_DECK } from "core/mutations";
import { GET_USER } from "core/queries";

const ToolDetails: TModalComponent = ({ closeModal, payload }) => {
  const tool: TTool = payload?.tool;
  const [addToDeck, { loading }] = useMutation(ADD_TO_DECK);
  const [getUser, { data }] = useLazyQuery(GET_USER);
  const dialog = useDialog();
  const [isAdded, setIsAdded] = React.useState(false);
  const { cache } = useApolloClient();

  React.useEffect(() => {
    if (!data) {
      try {
        const cacheUser = cache.readQuery({ query: GET_USER }) as any;

        if (cacheUser.deck.toolIds.findIndex((i: string) => i === tool.id) !== -1) {
          setIsAdded(true);
        }
      } catch {
        getUser();
      }
    } else {
      if (data.deck.toolIds.findIndex((i: string) => i === tool.id) !== -1) {
        setIsAdded(true);
      }
    }
  }, [data]);

  const onClickAdd = async (id: string) =>
    addToDeck({ variables: { toolId: id } })
      .then(() => {
        setIsAdded(true);

        const cacheUser = cache.readQuery({ query: GET_USER }) as any;

        let newToolIds = cacheUser.deck.toolIds;
        newToolIds.unshift(tool.id);

        cache.writeQuery({ query: GET_USER, data: { user: cacheUser.user, deck: { toolIds: newToolIds, __typename: cacheUser.deck.__typename } } });
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
          onClickAdd(tool.id);
        }}
        loading={loading}
        disabled={isAdded}
      />

      <div className={css.desc}>{tool.desc}</div>
    </div>
  );
};

export default ToolDetails;
