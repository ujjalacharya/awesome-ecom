import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { decodeLocalStorage } from "../utils/common";

const AdminRoute = ({
  component: Component,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if(!decodeLocalStorage()){
        window.location.reload()
      }
      return decodeLocalStorage()?.role === "admin" ||
        (decodeLocalStorage()?.role === "superadmin") ? (
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

// export default AdminRoute

AdminRoute.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.adminProfile || {},
});
export default connect(mapStateToProps)(AdminRoute);
