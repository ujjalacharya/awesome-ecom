import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "../Pages/Home";
import Listing from "../Pages/Listing";

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/listing" exact component={Listing} />
      </Switch>
    );
  }
}

export default Router;
