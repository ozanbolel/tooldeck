import * as React from "react";
import ReactGA from "react-ga";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { TStore } from "core/types";
import { isProduction } from "core/config";

const Startup: React.FC = () => {
  const { opened: tabs, currentTabId } = useSelector((store: TStore) => store.tabs);
  const dispatch = useDispatch();
  const router = useRouter();

  // Analytics

  if (isProduction && typeof window !== "undefined") {
    React.useEffect(() => {
      ReactGA.initialize("UA-134207044-4");
    }, []);

    React.useEffect(() => {
      if (!router.pathname.includes("/auth/")) {
        ReactGA.pageview(router.pathname);
      }
    }, [router.pathname]);
  }

  // Service Worker

  if (isProduction) {
    React.useEffect(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js", { scope: "/" });
      }
    }, []);
  }

  // Handle View Height

  React.useEffect(() => {
    const resizeOps = () => {
      document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
    };

    window.addEventListener("resize", resizeOps);
    return () => window.removeEventListener("resize", resizeOps);
  }, []);

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

  // Return

  return null;
};

export default Startup;
