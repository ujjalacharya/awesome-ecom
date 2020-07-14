import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/user_actions";
import Signin from "../components/pages/Signin";

const MainRouter = (props) => {
  if (props.isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact component={Signin} />
      </Switch>
    );
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.User.auth.isAuth,
});

export default connect(mapStateToProps, { signIn })(MainRouter);
