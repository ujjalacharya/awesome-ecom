import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux";
import "../public/nprogress.css";
import GlobalErrorComponent from "../src/Components/GlobalErrorComponent";

export default withRedux(initStore, { debug: false })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}),
        },
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Provider store={store}>
          <GlobalErrorComponent {...this.props} />
          <Component {...pageProps} />
        </Provider>
      );
    }
  }
);
