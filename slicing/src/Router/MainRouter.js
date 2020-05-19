import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "../Pages/Home";
import Listing from "../Pages/Listing";
import Details from "../Pages/Details";
import Cart from "../Pages/Cart";
import DeliveryAddress from "../Pages/DeliveryAddress";
import Checkout from "../Pages/Checkout";
import MyProfile from "../Pages/MyProfile";

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/listing" exact component={Listing} />
        <Route path="/detail" exact component={Details} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/address" exact component={DeliveryAddress} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/profile" exact component={MyProfile} />
      </Switch>
    );
  }
}

export default Router;
