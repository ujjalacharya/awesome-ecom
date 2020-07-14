import React, { useEffect } from "react";

import { connect } from "react-redux";

// import { loadUser } from './redux/actions/auth';
import setAuthToken from "./utils/setAuthToken";
import MainRouter from "./router/MainRouter";
import "./App.css";
import Signin from "./components/pages/Signin";

const App = (props) => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    // store.dispatch(loadUser());
  }, []);

  return <>{!props.isAuthenticated ? <Signin /> : <MainRouter />}</>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.User.auth.isAuth,
  };
};

export default connect(mapStateToProps)(App);
