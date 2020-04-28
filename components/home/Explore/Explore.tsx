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

  const Section = ({ title, cat }: { title: string; cat: string }) => (
    <div className={css.section}>
      <div className={css.title}>{title}</div>

      <div className={css.grid}>
        {(data.tools as [TTool])
          .filter((i) => i.cat === cat)
          .map((tool, index) => (
            <ToolGridItem key={tool.id} tool={tool} index={index} />
          ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={css.pageTitle}>Explore</div>

      {data && isUserLoaded ? (
        <>
          <Section title="For Development" cat="development" />
          <Section title="For Designing" cat="design" />
          <Section title="For Everyone" cat="common" />
        </>
      ) : null}
    </>
  );
};

export default Explore;
