import * as React from "react";
import css from "./Promote.module.scss";

const Section: React.FC<{ title: string; image: string }> = ({ title, image }) => {
  return (
    <div className={css.section}>
      <img src={`/static/landing/${image}.png`} draggable="false" />

      <div className={css.title}>
        <span>{title}</span>
      </div>
    </div>
  );
};

const Promote: React.FC = () => {
  return (
    <div className={css.promote}>
      <Section title="Discover New Tools" image="explore" />
      <Section title="Preview" image="view" />
      <Section title="Add to Your Deck" image="add" />
      <Section title="Open In-App Tabs" image="tabs" />
    </div>
  );
};

export default Promote;
