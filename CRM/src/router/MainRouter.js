//package
import React from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
//router
import AdminRoute from './AdminRoute'
import SuperAdminRoute from './SuperAdminRoute'

//UI components
import Home from "../components/pages/Home";
import Profile from '../components/pages/Profile'

const MainRouter = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <AdminRoute exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth,
});

export default connect(mapStateToProps)(MainRouter);
