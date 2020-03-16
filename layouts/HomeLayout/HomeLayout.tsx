import * as React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Radio } from "core/elements";
import { TStore } from "core/types";
import css from "./HomeLayout.scss";

import Tabs from "components/home/Tabs/Tabs";
import WebFrame from "components/home/WebFrame/WebFrame";

const HomeLayout: React.FC = ({ children }) => {
  const currentTabId = useSelector((store: TStore) => store.tabs.currentTabId);
  const router = useRouter();

  const getRadioValue = () => {
    const path = router.pathname.split("/")[1];

    return path === "" ? "deck" : path;
  };

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
          initial={getRadioValue()}
          value={getRadioValue()}
          onChange={(v: string) => (v === "deck" ? router.push("/") : router.push("/" + v))}
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
