import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import MainRouter from "./router/MainRouter";
import "./App.scss";
import Signin from "./components/pages/Signin";
import { loadMe } from "./redux/actions/auth_actions";
import store from "./redux/store";
import { verifyLocalStorage} from "./utils/common";
import Alert from "./components/common/Alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = (props) => {
  useEffect( () => {
    store.dispatch(loadMe());//returns socket user obj else null
    
      
  }, []);
  return (
    <>
      <Alert {...props} />
      {!verifyLocalStorage() ? <Signin /> : <MainRouter />}
    </>
  );
};


export default connect(state=>state)(App);
