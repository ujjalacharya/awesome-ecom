import React from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { decodeLocalStorage, isAdminOnLocalStorage } from "../utils/common";

const AdminRoute = ({
  component: Component,
  // user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!decodeLocalStorage()) {
        window.location.reload()
      }
      if (decodeLocalStorage()?.role === "superadmin"){
        if (isAdminOnLocalStorage()) {
          return <Component {...props} />
        } else {
          return <Redirect
            to={{
              pathname: "/superadmin",
              state: { from: props.location },
            }}
          />
        }
      } else if (decodeLocalStorage()?.role === "admin") {
        return <Component {...props} />
      } else {
        return <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      }
//       return decodeLocalStorage()?.role === "admin" ||
//         (decodeLocalStorage()?.role === "superadmin") ? (
//         <Component {...props} />
//       ) : (
//   // <Component {...props} />
//   <Redirect
//     to={{
//       pathname: "/",
//       state: { from: props.location },
//     }}
//   />
// );
    }}
/>
);

export default AdminRoute

// AdminRoute.propTypes = {
//   user: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   user: state.auth.adminProfile || {},
// });
// export default connect(mapStateToProps)(AdminRoute);
