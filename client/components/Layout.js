import Link from "next/link";
import Head from "next/head";
import { connect } from "react-redux";
import actions from "../redux/actions";
import NProgress from "nprogress";
import Router from "next/router";
import { Component } from "react";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

class Layout extends Component {
  render() {
    const { children, title="Home", isAuthenticated, deauthenticate } = this.props;
    return (
      <div>
        <Head>
          <title>{title || ""}</title>
        </Head>
        <div className="tabs is-centered">
          <ul>
            <Link href="/">
              <a>Home</a>
            </Link>
            {!isAuthenticated && (
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            )}
            {/* {!isAuthenticated && <Link href="/signup"><a>Sign Up</a></Link>} */}
            {isAuthenticated && (
              <li onClick={deauthenticate}>
                <a>Sign Out</a>
              </li>
            )}
            <Link href="/whoami">
              <a>Who Am I</a>
            </Link>
            {true && (
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            )}
          </ul>
        </div>
        <div className="has-text-centered">{children}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.token,
});

export default connect(mapStateToProps, actions)(Layout);
