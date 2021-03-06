import * as React from "react";
import { useQuery, useApolloClient, useMutation } from "@apollo/react-hooks";
import { GET_TOOLS, GET_DECK } from "core/queries";
import { ADD_TO_DECK } from "core/mutations";
import { useDialog } from "core/tools";
import { TTool } from "core/types";
import { isProduction } from "core/config";
import ReactGA from "react-ga";

const useIsToolAdded = (id: string, callback?: Function) => {
  const [isAdded, setIsAdded] = React.useState(false);
  const { data: dataDeck } = useQuery(GET_DECK);
  const [addToDeck, { loading }] = useMutation(ADD_TO_DECK);
  const cache = useApolloClient().cache;
  const dialog = useDialog();

  React.useEffect(() => {
    if (dataDeck) {
      if (dataDeck.deck.toolIds.findIndex((i: string) => i === id) !== -1) {
        setIsAdded(true);
      }
    }
  }, [dataDeck]);

  const onClickAdd = async () =>
    addToDeck({ variables: { toolId: id } })
      .then(() => {
        if (isProduction) {
          ReactGA.event({ category: "Usage", action: "Tool Added" });
        }

        // Update local deck

        setIsAdded(true);
        callback ? callback() : null;

        let newToolIds = dataDeck.deck.toolIds;
        newToolIds.unshift(id);

        cache.writeQuery({ query: GET_DECK, data: { deck: { toolIds: newToolIds, __typename: dataDeck.deck.__typename } } });

        // Update local tool user count

        let newTools = (cache.readQuery({ query: GET_TOOLS }) as any).tools as [TTool];
        const toolIndex = newTools.findIndex((i) => i.id === id);

        newTools[toolIndex].users = newTools[toolIndex].users + 1;

        cache.writeQuery({ query: GET_TOOLS, data: { tools: newTools } });
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
