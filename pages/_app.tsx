import Head from "next/head";
import { AppProps } from "next/app";
import { Store } from "redux";
import { Provider } from "react-redux";
import { withRedux } from "core/tools";
import "core/styles/app.scss";

const App = ({ Component, pageProps, reduxStore }: AppProps & { reduxStore: Store }) => {
  return (
    <Provider store={reduxStore}>
      <Head>
        <title>ToolDeck</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap&subset=latin-ext" rel="stylesheet" />
        <base target="_blank" />
      </Head>

      <Component {...pageProps} />
    </Provider>
  );
};

export default withRedux(App);
