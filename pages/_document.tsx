import Document, { Html, Head, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />

        <body>
          <noscript>Your browser does not support JavaScript.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
