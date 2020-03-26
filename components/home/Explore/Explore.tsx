import * as React from "react";
import { tools } from "core/data";
import css from "./Explore.module.scss";
import { useApolloClient, useLazyQuery } from "@apollo/react-hooks";
import { GET_USER } from "core/queries";
import ToolGridItem from "../ToolGridItem/ToolGridItem";

const Explore: React.FC = () => {
  const { cache } = useApolloClient();
  const [getUser] = useLazyQuery(GET_USER);

  React.useEffect(() => {
    try {
      cache.readQuery({ query: GET_USER });
    } catch {
      getUser();
    }
  }, []);

  return (
    <>
      <div className={css.section}>
        <div className={css.title}>For Developers</div>

        <div className={css.grid}>
          {tools.map((tool) => (
            <ToolGridItem key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
