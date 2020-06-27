import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css"
          /> */}
          <link rel="stylesheet" href="http://localhost:3000/css/antd.min.css" />
          <link rel="stylesheet" href="http://localhost:3000/css/style.css" />
          <link rel="stylesheet" href="http://localhost:3000/css/slick-theme.min.css" />
          <link rel="stylesheet" href="http://localhost:3000/css/slick.min.css" />
          <link
            rel="stylesheet"
            href="font-awesome-4.7.0/css/font-awesome.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
