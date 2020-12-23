import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux";
import GlobalErrorComponent from "../src/Components/GlobalErrorComponent";
import "../public/nprogress.css";
import '../public/css/react-carousel.es.css';
import '../node_modules/react-modal-video/scss/modal-video.scss';
// import "../sass/index.scss"

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
