import * as React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Radio } from "core/elements";
import { TStore } from "core/types";
import css from "./HomeLayout.module.scss";

import Tabs from "components/home/Tabs/Tabs";
import WebFrame from "components/home/WebFrame/WebFrame";

const HomeLayout: React.FC = ({ children }) => {
  const currentTabId = useSelector((store: TStore) => store.tabs.currentTabId);
  const router = useRouter();
  const pathname = router.pathname.split("/")[1];

  return (
    <div className={css.home}>
      <div>
        <Tabs />
      </div>

      <div className={css.radio + (currentTabId !== "" ? " " + css.hidden : "")}>
        <Radio
          items={[
            { label: "Deck", value: "deck" },
            { label: "Explore", value: "explore" }
          ]}
          initial={pathname}
          value={pathname}
          onChange={(v: string) => router.push("/" + v)}
        />
      </div>

      <div className={css.switch}>
        <div className={css.page + (currentTabId !== "" ? " " + css.hidden : "")}>{children}</div>

        <WebFrame hidden={currentTabId === ""} />
      </div>
    </div>
  );
};

export default HomeLayout;
