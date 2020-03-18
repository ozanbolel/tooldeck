import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-fetch";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { server } from "core/config";
import "core/styles/app.scss";

import reducerRoot from "core/store/reducerRoot";
import Startup from "components/app/Startup/Startup";
import DialogMapper from "core/elements/Dialog/DialogMapper";

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout ? (Component as any).Layout : React.Fragment;
  const client = new ApolloClient({ uri: server.uri, fetch });

  const getStore = () => {
    if (typeof window === "undefined") {
      return createStore(reducerRoot);
    } else {
      if (!(window as any)["REDUX_STORE"]) {
        (window as any)["REDUX_STORE"] = createStore(reducerRoot);
      }

      return (window as any)["REDUX_STORE"];
    }
  };

  return (
    <ApolloProvider client={client}>
      <Provider store={getStore()}>
        <Head>
          <title>ToolDeck</title>
          <link href="https://fonts.googleapis.com/css?family=Roboto:100,400,700&display=swap&subset=latin-ext" rel="stylesheet" />
          <base target="_blank" />
        </Head>

        <Startup />

        <Layout>
          <Component {...pageProps} />
        </Layout>

        <DialogMapper />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
