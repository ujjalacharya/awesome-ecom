//package
import React from "react";
import { Switch} from "react-router-dom";
// import { connect } from "react-redux";
//router
import SuperAdminRoute from "./SuperAdminRoute";
import AdminRoute from './AdminRoute'

//UI components
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";
import Product from '../components/pages/Product'
import AddProduct from '../components/pages/Product/AddProduct'
import EditProduct from '../components/pages/Product/EditProduct'
import Order from '../components/pages/Order'
import Admin from "../components/pages/SuperAdmin/Admin";
import SProduct from "../components/pages/SuperAdmin/Product";

const MainRouter = (props) => {
  return (
    <Switch>
      <AdminRoute exact path="/" component={Home} />;
      <AdminRoute exact path="/profile" component={Profile} />
      <AdminRoute exact path="/manage-products" component={Product} />
      <AdminRoute exact path="/add-product" component={AddProduct} />
      <AdminRoute exact path="/order" component= {Order} />
      <SuperAdminRoute exact path="/superadmin" component={Home}/>
      <SuperAdminRoute exact path="/superadmin/manage-products" component={SProduct} />
      <SuperAdminRoute exact path="/manage-admins" component={Admin} />
      <AdminRoute exact path="/edit-product/:slug?" component={EditProduct} />
    </Switch>
  );
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth,
// });

// export default connect(mapStateToProps)(MainRouter);
export default MainRouter
