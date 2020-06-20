import * as React from "react";
import css from "./Explore.module.scss";
import { useQuery } from "@apollo/react-hooks";
import { GET_TOOLS } from "core/queries";
import ToolGridItem from "../ToolGridItem/ToolGridItem";
import { TTool } from "core/types";
import { categories } from "core/config";
import { Icon } from "core/elements";
import isToolNew from "../utils/isToolNew";

type TSection = {
  icon?: string;
  title: string;
  promote?: string;
  cat?: string;
  num?: number;
};

const Explore: React.FC = () => {
  const { data } = useQuery(GET_TOOLS);

  const getTools = ({ cat, promote, num }: { cat?: string; promote?: string; num?: number }) => {
    const tools: [TTool] = data.tools;

    if (cat) {
      return tools.filter((i) => i.cat === cat);
    }

    if (promote) {
      if (promote === "new") {
        return tools.filter((i) => isToolNew(i.createdAt));
      } else {
        let sortedTools = tools;
        sortedTools.sort((a: any, b: any) => (a[promote] === b[promote] ? 0 : a[promote] < b[promote] ? 1 : -1));

        return sortedTools.slice(0, num ? num : 6);
      }
    }

    return tools;
  };

  const Section = ({ icon, title, cat, num, promote }: TSection) => {
    const arrayTools = React.useMemo(() => getTools({ cat, promote, num }), []);

    if (arrayTools.length !== 0) {
      return (
        <div className={css.section}>
          <div className={css.sectionHeader}>
            <div className={css.title}>
              {icon ? <Icon name={icon} /> : null}

              {title}
            </div>
          </div>

          <div className={css.grid}>
            {arrayTools.map((tool, index) => (
              <ToolGridItem key={tool.id} tool={tool} index={index} promote={promote} />
            ))}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  if (data) {
    return (
      <>
        <Section icon="bell" title="New Arrivals" promote="new" num={4} />
        <Section icon="users" title="Most Added" promote="users" num={6} />
        <Section icon="star" title="Most Starred" promote="stars" num={4} />

        {categories.map((category) => (
          <Section key={category.value} title={category.label} cat={category.value} />
        ))}
      </>
    );
  } else {
    return null;
  }
};

export default Explore;
