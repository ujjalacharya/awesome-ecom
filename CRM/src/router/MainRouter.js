import React from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Home from "../components/pages/Home";
import { connect } from "react-redux";

const MainRouter = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.User,
});

export default connect(mapStateToProps)(MainRouter);
