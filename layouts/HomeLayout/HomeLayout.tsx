import * as React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Radio } from "core/elements";
import { TStore } from "core/types";
import css from "./HomeLayout.module.scss";
import Tabs from "components/home/Tabs/Tabs";
import WebFrame from "components/home/WebFrame/WebFrame";
import Footer from "components/app/Footer/Footer";

const HomeLayout: React.FC = ({ children }) => {
  const currentTabId = useSelector((store: TStore) => store.tabs.currentTabId);
  const router = useRouter();
  const pathname = router.pathname.split("/")[1];

  return (
    <div className={css.home}>
      <Tabs />

      {currentTabId === "" ? (
        <>
          <div className={css.tile}>
            <div className={css.shade} />
          </div>

          <div className={css.radio}>
            <Radio
              items={[
                { label: "Deck", value: "deck" },
                { label: "Explore", value: "explore" }
              ]}
              initial={pathname}
              value={pathname}
              onChange={(v: string) => router.push("/" + v)}
              noTopBorder
            />
          </div>
        </>
      ) : null}

      <div className={css.switch}>
        {currentTabId === "" ? children : null}

        <WebFrame hidden={currentTabId === ""} />
      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
