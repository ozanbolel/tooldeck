import * as React from "react";
import { useQuery, useApolloClient, useMutation } from "@apollo/react-hooks";
import { GET_USER } from "core/queries";
import { ADD_TO_DECK } from "core/mutations";
import { useDialog } from "core/tools";

const useIsToolAdded = (id: string, callback?: Function) => {
  const [isAdded, setIsAdded] = React.useState(false);
  const { data } = useQuery(GET_USER, { fetchPolicy: "cache-only" });
  const [addToDeck, { loading }] = useMutation(ADD_TO_DECK);
  const { cache } = useApolloClient();
  const dialog = useDialog();

  React.useEffect(() => {
    if (data) {
      if (data.deck.toolIds.findIndex((i: string) => i === id) !== -1) {
        setIsAdded(true);
      }
    }
  }, [data]);

  const onClickAdd = async () =>
    addToDeck({ variables: { toolId: id } })
      .then(() => {
        setIsAdded(true);
        callback ? callback() : null;

        let newToolIds = data.deck.toolIds;
        newToolIds.unshift(id);

        cache.writeQuery({ query: GET_USER, data: { user: data.user, deck: { toolIds: newToolIds, __typename: data.deck.__typename } } });
      })
      .catch((e) => {
        if (e.graphQLErrors[0].code === "ALREADY_IN_DECK") {
          dialog("This tool is already in your Deck.", { label: "Ok", highlight: true });
        } else {
          dialog("Error: Please try again.", { label: "Ok", highlight: true });
        }
      });

  return { isAdded, setIsAdded, loading, onClickAdd };
};

export default useIsToolAdded;
