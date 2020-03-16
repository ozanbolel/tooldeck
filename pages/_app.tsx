import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Store } from "redux";
import { Provider } from "react-redux";
import { withRedux } from "core/tools";
import "core/styles/app.scss";

import Startup from "components/app/Startup/Startup";
import DialogMapper from "core/elements/Dialog/DialogMapper";

const App = ({ Component, pageProps, reduxStore }: AppProps & { reduxStore: Store }) => {
  const Layout = (Component as any).Layout ? (Component as any).Layout : React.Fragment;

  return (
    <Provider store={reduxStore}>
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
  );
};

export default withRedux(App as any);
