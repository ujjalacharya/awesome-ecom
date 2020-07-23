//package
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
//router
import AdminRoute from "./AdminRoute";
import SuperAdminRoute from "./SuperAdminRoute";

//UI components
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";

const MainRouter = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />;
      <AdminRoute exact path="/check" component={Home} />;
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth,
});

export default connect(mapStateToProps)(MainRouter);
