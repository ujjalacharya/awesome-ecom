//package
import React from "react";
import { Switch, Route} from "react-router-dom";
import { connect } from "react-redux";
//router
import SuperAdminRoute from "./SuperAdminRoute";
import AdminRoute from './AdminRoute'

//UI components
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";
import Product from '../components/pages/Product'
import Order from '../components/pages/Order'

const MainRouter = (props) => {
  return (
    <Switch>
      <AdminRoute exact path="/" component={Home} />;
      <AdminRoute exact path="/profile" component={Profile} />
      <AdminRoute exact path="/add-product" component={Product} />
      <AdminRoute exact path="/order" component={Order} />
      <SuperAdminRoute exact path="/superadmin" component={() => <h1>Sup SuperAdmin</h1>}/>
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth,
});

export default connect(mapStateToProps)(MainRouter);
