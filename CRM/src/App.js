import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import MainRouter from "./router/MainRouter";
import "./App.scss";
import Signin from "./components/pages/Signin";
import { loadMe } from "./redux/actions/auth_actions";
import store from "./redux/store";
import { verifyLocalStorage } from "./utils/common";
import GlobalErrorComponent from "./components/common/GlobalErrorComponent";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = (props) => {
  useEffect(() => {
    store.dispatch(loadMe());
  }, []);
  return (
    <>
      <GlobalErrorComponent {...props} />
      {!verifyLocalStorage() ? <Signin /> : <MainRouter />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuth,
  };
};

export default connect(mapStateToProps)(App);
