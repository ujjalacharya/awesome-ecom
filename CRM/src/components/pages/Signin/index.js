import React, { useState } from "react";
import SigninForm from "./SigninForm";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { signIn } from "../../../redux/actions/user_actions";

// import {
//   signIn,
//   authenticate,
//   isAuthenticated
// } from "../../../Utils/Requests/Auth";

const Login = (props) => {
  const [state, setState] = useState({
    email: "john@hotmail.com",
    password: "qwerty12345",
    error: "",
    loading: false,
  });

  const { email, password, loading, error } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      error: false,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, error: false, loading: true });

    props.signIn("sup");
  };

  const showError = () => <div className="alert alert-danger">{error}</div>;

  const showLoading = () => (
    <div className="alert alert-info">
      <h2>Loading...</h2>
    </div>
  );

  return (
    <div className="login-dark">
      {loading && showLoading()}
      {error && showError()}
      {!loading && (
        <SigninForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          state={state}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.User.isAuth,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
