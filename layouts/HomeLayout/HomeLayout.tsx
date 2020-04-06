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
  const refSwitch = React.useRef<any>(null);

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
                { label: "Deck", value: "/deck" },
                { label: "Explore", value: "/explore" }
              ]}
              initial={router.pathname}
              value={router.pathname}
              onChange={(v: string) => (router.pathname !== v ? router.push(v) : refSwitch.current.scroll({ top: 0, behavior: "smooth" }))}
              noTopBorder
            />
          </div>
        </>
      ) : null}

      <div ref={refSwitch} className={css.switch}>
        {currentTabId === "" ? children : null}

        <WebFrame hidden={currentTabId === ""} />
      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
