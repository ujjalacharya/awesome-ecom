import React, { useState } from "react";
import SigninForm from "./SigninForm";
import { connect } from "react-redux";

import { signIn } from "../../../redux/actions/auth_actions";
const Login = (props) => {
  const [state, setState] = useState({
    email: "aanandbhandari143@gmail.com",
    password: "helloworld1",
    error: "",
    loading: false,
  });

  const { loading, error, email,password } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      error: false,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.signIn(email,password);
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
    isAuthenticated: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { signIn })(Login);
