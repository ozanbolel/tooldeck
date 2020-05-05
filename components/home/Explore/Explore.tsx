import * as React from "react";
import css from "./Explore.module.scss";
import { useQuery } from "@apollo/react-hooks";
import { GET_TOOLS } from "core/queries";
import ToolGridItem from "../ToolGridItem/ToolGridItem";
import { TTool } from "core/types";
import { categories } from "core/config";

const Explore: React.FC = () => {
  const { data } = useQuery(GET_TOOLS);

  const getTools = ({ cat, sortBy, num }: { cat?: string; sortBy?: string; num?: number }) => {
    const tools: [TTool] = data.tools;

    if (cat) {
      return tools.filter((i) => i.cat === cat);
    }

    if (sortBy) {
      let sortedTools = tools;
      sortedTools.sort((a: any, b: any) => (a[sortBy] === b[sortBy] ? 0 : a[sortBy] < b[sortBy] ? 1 : -1));

      return sortedTools.slice(0, num ? num : 6);
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

  if (data) {
    return (
      <>
        <Section title="Most Added" sortBy="users" num={6} />
        <Section title="Most Starred" sortBy="stars" num={4} />

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
