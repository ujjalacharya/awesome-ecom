import Link from "next/link";
import Head from "next/head";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import NProgress from "nprogress";
import Router from "next/router";
import { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import MobileHeader from "./MobileHeader";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

class Layout extends Component {
  render() {
    const {
      children,
      title = "Home",
      isAuthenticated,
      deauthenticate,
    } = this.props;

    
    return (
      <div>
        <Head>
          <title>{title || ""}</title>
        </Head>

        <MobileHeader />

        <Header data={this.props.menuCate}/>
        <div className="has-text-centered body-wrap">{children}</div>
        
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.token,
  menuCate: state.menu.menuCategories,
});

export default connect(mapStateToProps, actions)(Layout);
