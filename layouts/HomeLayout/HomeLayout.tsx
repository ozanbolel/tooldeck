import * as React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Radio, Nest, Icon } from "core/elements";
import { TStore } from "core/types";
import css from "./HomeLayout.module.scss";
import Tabs from "components/home/Tabs/Tabs";
import WebFrame from "components/home/WebFrame/WebFrame";
import Footer from "components/app/Footer/Footer";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { GET_USER } from "core/queries";
import { isProduction } from "core/config";
import ReactGA from "react-ga";
import { useDialog } from "core/tools";
import { LOGOUT } from "core/mutations";
import Head from "next/head";

const HomeLayout: React.FC = ({ children }) => {
  const [deckScrollPct, setDeckScrollPct] = React.useState(0);
  const { currentTabId, opened } = useSelector((store: TStore) => store.tabs);
  const { data: dataUser } = useQuery(GET_USER);
  const [logout] = useMutation(LOGOUT);
  const router = useRouter();
  const refSwitch = React.useRef<HTMLDivElement>(null);
  const dialog = useDialog();
  const client = useApolloClient();

  const radioItems = [
    { label: "Deck", value: "/deck" },
    { label: "Feed", value: "/feed" },
    { label: "Explore", value: "/explore" }
  ];

  const headerTitle = React.useMemo(() => radioItems.find((i) => i.value === router.pathname)?.label, [router.pathname]);
  const pageTitle = React.useMemo(() => (currentTabId !== "" ? opened.find((i) => i.id === currentTabId)?.label : headerTitle), [currentTabId, headerTitle]);

  React.useEffect(() => {
    const elemSwitch = refSwitch.current;

    if (elemSwitch && currentTabId === "") {
      setTimeout(() => {
        elemSwitch.scrollTop = elemSwitch.scrollHeight * deckScrollPct;
      }, 100);
    }
  }, [currentTabId]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (router.pathname === "/deck") {
      const elem = event.target as HTMLDivElement;
      if (elem.scrollTop > 0) setDeckScrollPct(elem.scrollTop / elem.scrollHeight);
    }
  };

  return (
    <>
      <Head>
        <title>ToolDeck / {pageTitle}</title>
      </Head>

      <div className={css.home}>
        <Tabs />

        {currentTabId === "" ? (
          <>
            <div className={css.tile}>
              <div className={css.shade} />
            </div>

            <div className={css.radio}>
              <Radio
                items={radioItems}
                initial={router.pathname}
                value={router.pathname}
                onChange={(v: string) => {
                  if (router.pathname !== v) router.push(v);
                  if (refSwitch.current) refSwitch.current.scrollTop = 0;
                  if (router.pathname === "/deck") setDeckScrollPct(0);
                }}
                itemClassName={css.radioItem}
                noTopBorder
              />
            </div>
          </>
        ) : null}

        <div ref={refSwitch} onScroll={handleScroll} className={css.switch + (currentTabId !== "" ? " " + css.web : "")}>
          {currentTabId === "" ? (
            <Nest>
              <div className={css.header}>
                <div className={css.headerTitle}>{headerTitle}</div>

                <div
                  className={css.headerProfile}
                  onClick={() =>
                    dialog(
                      dataUser?.user.name,
                      [
                        {
                          label: "Logout",
                          callback: () => {
                            logout().then(() => {
                              if (isProduction) {
                                ReactGA.event({ category: "User", action: "Logged Out" });
                              }

                              router.push("/");

                              localStorage.clear();
                              client.resetStore();
                            });
                          }
                        },
                        { label: "Close" }
                      ],
                      { autoclose: true }
                    )
                  }
                >
                  <div className={css.headerProfileAvatar}>
                    {dataUser && dataUser.user.avatarUrl ? <img src={dataUser.user.avatarUrl} draggable="false" /> : <Icon name="user" />}
                  </div>

                  {dataUser ? <div className={css.headerProfileName}>{dataUser.user.name}</div> : null}
                </div>
              </div>

              {children}
            </Nest>
          ) : null}

          <WebFrame hidden={currentTabId === ""} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
