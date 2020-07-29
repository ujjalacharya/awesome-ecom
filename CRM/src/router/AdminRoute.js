import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { decodeLocalStorage } from "../utils/common";

const AdminRoute = ({
  component: Component,
  auth: { isAuth, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return decodeLocalStorage()?.role === "admin" ||
        decodeLocalStorage()?.role === "superadmin" ? (
        <Component {...props} />
      ) : (
        // <Component {...props} />
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});
export default connect(mapStateToProps)(AdminRoute);
