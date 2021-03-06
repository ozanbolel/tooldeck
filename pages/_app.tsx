import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { withApollo } from "core/tools";
import "core/styles/app.scss";
import reducerRoot from "core/store/reducerRoot";
import Startup from "components/app/Startup/Startup";
import DialogMapper from "core/elements/Dialog/DialogMapper";
import ModalMapper from "core/elements/Modal/ModalMapper";
import InstallBanner from "components/app/InstallBanner/InstallBanner";

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout ? (Component as any).Layout : React.Fragment;
  const router = useRouter();

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
        <meta name="description" content="Carefully curated tools for you to discover." />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
        <link rel="icon" type="image/png" href="/static/logo/logo-96.png" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,400,700&display=swap&subset=latin-ext" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/static/logo/logo-192.png" />
        <meta name="theme-color" content="#252525" />
        <meta property="og:title" content="ToolDeck - Launchpad for developers' and designers' favorite tools." />
        <meta property="og:description" content="Carefully curated tools for you to discover." />
        <meta property="og:image" content="https://tooldeckhq.com/static/og.png" />
        <meta property="twitter:title" content="ToolDeck - Launchpad for developers' and designers' favorite tools." />
        <meta property="twitter:description" content="Carefully curated tools for you to discover." />
        <meta property="twitter:image" content="https://tooldeckhq.com/static/og.png" />
      </Head>

      <Startup />

      <Layout>
        <Component {...pageProps} />
      </Layout>

      {router.pathname !== "/" && !router.pathname.includes("/auth/") ? <InstallBanner /> : null}

      <ModalMapper />
      <DialogMapper />
    </Provider>
  );
};

export default withApollo()(App);
