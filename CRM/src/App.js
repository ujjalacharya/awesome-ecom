import React, { useEffect } from "react";

import { connect } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import MainRouter from "./router/MainRouter";
import "./App.scss";
import Signin from "./components/pages/Signin";
import { loadMe } from "./redux/actions/auth_actions";
import store from './redux/store'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = (props) => {
  useEffect(() => {
    store.dispatch(loadMe());
  }, []);
  return <>{!props.isAuthenticated ? <Signin /> : <MainRouter />}</>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuth,
  };
};

export default connect(mapStateToProps)(App);
