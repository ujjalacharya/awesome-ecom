import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "../Components/Home";

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    );
  }
}

export default Router;
