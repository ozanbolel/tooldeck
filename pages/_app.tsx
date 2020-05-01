import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { withApollo } from "core/tools";
import "core/styles/app.scss";
import reducerRoot from "core/store/reducerRoot";
import Startup from "components/app/Startup/Startup";
import DialogMapper from "core/elements/Dialog/DialogMapper";
import ModalMapper from "core/elements/Modal/ModalMapper";

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout ? (Component as any).Layout : React.Fragment;

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
    <Provider store={getStore()}>
      <Head>
        <title>ToolDeck</title>
        <meta name="description" content="Hand picked tools for designers and developers." />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
        <link rel="icon" type="image/png" href="/static/logo/logo-96.png" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,400,700&display=swap&subset=latin-ext" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/static/logo/logo-192.png" />
        <meta name="theme-color" content="#252525" />
        <meta name="google-site-verification" content="NZ4vSuRDTec-TbYPtsw66ZJypUmIQrI4jEG4TCQcdYE" />
      </Head>

      <Startup />

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <ModalMapper />
      <DialogMapper />
    </Provider>
  );
};

export default withApollo()(App);
