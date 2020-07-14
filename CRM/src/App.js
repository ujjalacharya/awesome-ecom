import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
// import { loadUser } from './redux/actions/auth';
import setAuthToken from "./utils/setAuthToken";
import MainRouter from "./router/MainRouter";
import "./App.css";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    // store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
