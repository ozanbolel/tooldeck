import * as React from "react";
import { tools } from "core/data";
import css from "./Explore.module.scss";
import { useApolloClient, useLazyQuery } from "@apollo/react-hooks";
import { GET_USER_DATA } from "core/queries";
import ToolGridItem from "../ToolGridItem/ToolGridItem";

const Explore: React.FC = () => {
  const { cache } = useApolloClient();
  const [getUser, { data }] = useLazyQuery(GET_USER_DATA);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      cache.readQuery({ query: GET_USER_DATA });

      setLoaded(true);
    } catch {
      getUser();
    }
  }, []);

  React.useEffect(() => {
    if (data) {
      setLoaded(true);
    }
  }, [data]);

  return (
    <>
      <div className={css.pageTitle}>Explore</div>

      {loaded ? (
        <>
          <div className={css.section}>
            <div className={css.title}>For Developers</div>

            <div className={css.grid}>{tools.map((tool) => (tool.cat === "dev" ? <ToolGridItem key={tool.id} tool={tool} /> : null))}</div>
          </div>

          <div className={css.section}>
            <div className={css.title}>Better Designs</div>

            <div className={css.grid}>{tools.map((tool) => (tool.cat === "design" ? <ToolGridItem key={tool.id} tool={tool} /> : null))}</div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Explore;
