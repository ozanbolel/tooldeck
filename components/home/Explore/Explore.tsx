import * as React from "react";
import css from "./Explore.module.scss";
import { useApolloClient, useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_USER_DATA, GET_TOOLS } from "core/queries";
import ToolGridItem from "../ToolGridItem/ToolGridItem";
import { TTool } from "core/types";

const Explore: React.FC = () => {
  const { data } = useQuery(GET_TOOLS);
  const [getUser, { data: dataUser }] = useLazyQuery(GET_USER_DATA);
  const [isUserLoaded, setIsUserLoaded] = React.useState(false);
  const { cache } = useApolloClient();

  React.useEffect(() => {
    try {
      cache.readQuery({ query: GET_USER_DATA });

      setIsUserLoaded(true);
    } catch {
      getUser();
    }
  }, []);

  React.useEffect(() => {
    if (dataUser) {
      setIsUserLoaded(true);
    }
  }, [dataUser]);

  const getTools = ({ cat, sortBy, num }: { cat?: string; sortBy?: string; num?: number }) => {
    const tools: [TTool] = data.tools;

    if (cat) {
      return tools.filter((i) => i.cat === cat);
    }

    if (sortBy) {
      const numTools = num ? num : 6;

      let result = [tools[0]];

      for (let iTool = 1; iTool < tools.length; iTool++) {
        for (let iResult = 0; iResult < numTools; iResult++) {
          if (result[iResult]) {
            if ((tools as any)[iTool][sortBy] > (result as any)[iResult][sortBy]) {
              result[iResult] = tools[iTool];

              break;
            }
          } else {
            result[iResult] = tools[iTool];

            break;
          }
        }
      }

      return result;
    }

    return tools;
  };

  const Section = ({ title, cat, sortBy, num }: { title: string; cat?: string; sortBy?: string; num?: number }) => (
    <div className={css.section}>
      <div className={css.title}>{title}</div>

      <div className={css.grid}>
        {getTools({ cat, sortBy, num }).map((tool, index) => (
          <ToolGridItem key={tool.id} tool={tool} index={index} badge={sortBy} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={css.pageTitle}>Explore</div>

      {data && isUserLoaded ? (
        <>
          <Section title="Most Added" sortBy="users" num={6} />
          <Section title="Most Starred" sortBy="stars" num={4} />
          <Section title="For Development" cat="development" />
          <Section title="For Designing" cat="design" />
          <Section title="For Everyone" cat="common" />
        </>
      ) : null}
    </>
  );
};

export default Explore;
