import * as React from "react";
import { TTool } from "core/types";
import css from "./Explore.scss";

import ToolCard from "../ToolCard/ToolCard";
import Nameplate from "../Nameplate/Nameplate";

const Explore: React.FC = () => {
  const tools: Array<TTool> = [
    {
      id: "coolors",
      label: "Coolors",
      cat: "design",
      sub_cat: "colors",
      external: false,
      url: "coolors.co/browser/latest/1"
    },
    {
      id: "ihateregex",
      label: "iHateRegex",
      cat: "dev",
      sub_cat: "regex",
      external: false,
      url: "ihateregex.io"
    }
  ];

  return (
    <>
      <div className={css.section}>
        <div className={css.sectionTitle}>For Developers</div>

        <div className={css.grid}>
          {tools.map((i) => (
            <div key={i.id} className={css.gridItemContainer}>
              <div className={css.gridItemShadow} />

              <ToolCard className={css.gridItemCard} tool={i} explore />
              <Nameplate className={css.gridItemPlate} label={i.label} />
            </div>
          ))}
        </div>
      </div>

      <div className={css.section}>
        <div className={css.sectionTitle}>For Designers</div>

        <div className={css.grid}>
          {tools.map((i) => (
            <div key={i.id} className={css.gridItemContainer}>
              <div className={css.gridItemShadow} />

              <ToolCard className={css.gridItemCard} tool={i} explore />
              <Nameplate className={css.gridItemPlate} label={i.label} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
