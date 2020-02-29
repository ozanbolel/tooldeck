import * as React from "react";
import { AppContext } from "next/app";
import { NextPage } from "next";
import { TStore } from "core/types";
import initializeStore from "../store/initializeStore";

const isServer = typeof window === "undefined";

function getOrCreateStore() {
  if (isServer) {
    return initializeStore();
  } else {
    if (!(window as any)["__NEXT_REDUX_STORE__"]) {
      (window as any)["__NEXT_REDUX_STORE__"] = initializeStore();
    }

    return (window as any)["__NEXT_REDUX_STORE__"];
  }
}

export function withRedux(App: NextPage<{ reduxStore: TStore }>) {
  return class AppWithRedux extends React.Component<{ reduxStore: TStore }> {
    private reduxStore: TStore;

    static async getInitialProps(appContext: AppContext & { ctx: { reduxStore: TStore } }) {
      const reduxStore = getOrCreateStore();

      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};

      if (typeof App.getInitialProps === "function") {
        appProps = await (App as any).getInitialProps(appContext);
      }

      return { ...appProps };
    }

    constructor(props: any) {
      super(props);

      this.reduxStore = getOrCreateStore();
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
}
