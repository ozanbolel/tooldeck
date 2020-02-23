import React from "react";
import initializeStore from "../store/initializeStore";

const isServer = typeof window === "undefined";

function getOrCreateStore() {
  if (isServer) {
    return initializeStore();
  } else {
    if (!window["__NEXT_REDUX_STORE__"]) {
      window["__NEXT_REDUX_STORE__"] = initializeStore();
    }

    return window["__NEXT_REDUX_STORE__"];
  }
}

export function withRedux(App) {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore();

      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};

      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return { ...appProps };
    }

    constructor(props) {
      super(props);

      this.reduxStore = getOrCreateStore();
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
}
