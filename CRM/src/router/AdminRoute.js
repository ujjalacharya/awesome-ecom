import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({
    component: Component,
    auth: { isAuth, loading, role },
    ...rest
}) => (
        <Route
            {...rest}
            render={props => {
                return (isAuth && !loading && (role === 'admin' || role === 'superadmin')) ? (
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
    auth: state.User
});
export default connect(mapStateToProps)(AdminRoute);
