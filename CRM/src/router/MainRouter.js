//package
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
//router
import SuperAdminRoute from "./SuperAdminRoute";

//UI components
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";

const MainRouter = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />;
      <SuperAdminRoute
        exact
        path="/superadmin"
        component={() => <h1>Sup SuperAdmin</h1>}
      />
      ;
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth,
});

export default connect(mapStateToProps)(MainRouter);
