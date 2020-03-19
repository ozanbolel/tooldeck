import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TStore } from "core/types";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Startup: React.FC = () => {
  const { opened: tabs, currentTabId } = useSelector((store: TStore) => store.tabs);
  const toolIds = useSelector((store: TStore) => store.deck.toolIds);
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle View Height

  React.useEffect(() => {
    const resizeOps = () => document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");

    window.addEventListener("resize", resizeOps, { passive: true });
    return () => window.removeEventListener("resize", resizeOps);
  }, []);

  // Handle Auth

  const isAuthRoute = router.pathname.includes("/auth");
  const isRouteProtected = router.pathname === "/" ? false : !isAuthRoute;

  const USER = gql`
    query {
      user {
        name
        avatarUrl
      }
    }
  `;

  const [fetchUser, { data: dataUser, error: errorUser }] = useLazyQuery(USER, { fetchPolicy: "no-cache" });

  React.useEffect(() => {
    const login = localStorage.getItem("LOGIN");

    if (login) {
      if (!isAuthRoute) {
        if (!isRouteProtected) {
          router.replace("/deck");
        }

        fetchUser();
      }
    } else {
      if (isRouteProtected && !isAuthRoute) {
        router.replace("/");
      }
    }
  }, []);

  React.useEffect(() => {
    const user = dataUser?.user;

    if (user) {
      dispatch({ type: "SET_USER", payload: user });
    }
  }, [dataUser]);

  // Handle Stored Tabs

  const [isTabsOpsDone, setIsTabsOpsDone] = React.useState(false);

  React.useEffect(() => {
    const storedTabs = localStorage.getItem("TABS");

    if (storedTabs) {
      dispatch({ type: "REPLACE_TABS", payload: JSON.parse(storedTabs) });
    }

    setIsTabsOpsDone(true);
  }, []);

  React.useEffect(() => {
    if (tabs.length !== 0) {
      localStorage.setItem("TABS", JSON.stringify(tabs));
    } else {
      if (isTabsOpsDone) {
        localStorage.removeItem("TABS");
      }
    }
  }, [tabs]);

  // Handle Last Tab

  const [isLastTabOpsDone, setIsLastTabOpsDone] = React.useState(false);

  React.useEffect(() => {
    const storedLastTab = localStorage.getItem("LAST_TAB");

    if (storedLastTab) {
      dispatch({ type: "SET_CURRENT_TAB_ID", payload: storedLastTab });
    }

    setIsLastTabOpsDone(true);
  }, []);

  React.useEffect(() => {
    if (isLastTabOpsDone) {
      localStorage.setItem("LAST_TAB", currentTabId);
    }
  }, [currentTabId]);

  // Handle Stored Tools

  const [isToolsOpsDone, setIsToolsOpsDone] = React.useState(false);

  React.useEffect(() => {
    const storedTools = localStorage.getItem("TOOL_IDS");

    if (storedTools) {
      dispatch({ type: "REPLACE_TOOL_IDS", payload: JSON.parse(storedTools) });
    }

    setIsToolsOpsDone(true);
  }, []);

  React.useEffect(() => {
    if (toolIds.length !== 0) {
      localStorage.setItem("TOOL_IDS", JSON.stringify(toolIds));
    } else {
      if (isToolsOpsDone) {
        localStorage.removeItem("TOOL_IDS");
      }
    }
  }, [toolIds]);

  // Return

  return null;
};

export default Startup;
