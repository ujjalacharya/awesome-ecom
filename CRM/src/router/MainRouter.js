import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/pages/Home";
// import Home from "../components/pages/Signin";

const MainRouter = () => (
 <Switch>
   <Route path="/" exact component={Home} />
 </Switch>
);

export default MainRouter;