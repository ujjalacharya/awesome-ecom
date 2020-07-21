import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({
    component: Component,
    auth: { isAuthenticated, loading, role },
    ...rest
}) => (
        <Route
            {...rest}
            render={props => {
                return (isAuthenticated && !loading && (role === 'admin' || role === 'superadmin')) ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    );
            }}
        />
    );

AdminRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(AdminRoute);
