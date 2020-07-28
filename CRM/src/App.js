import React, { useEffect } from "react";

import { connect } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import MainRouter from "./router/MainRouter";
import "./App.scss";
import Signin from "./components/pages/Signin";

setAuthToken(localStorage.token);
const App = (props) => {
  return <>{!props.isAuthenticated ? <Signin /> : <MainRouter />}</>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuth,
  };
};

export default connect(mapStateToProps)(App);
