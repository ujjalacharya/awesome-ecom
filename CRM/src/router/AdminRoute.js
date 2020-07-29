import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({
    component: Component,
    auth: { isAuth, loading, user },
    ...rest
}) => (
        <Route
            {...rest}
            render={props => {
                return (isAuth && !loading && (user?.role === 'admin' || user?.role==='superadmin')) ? (
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
    auth: state.Auth
});
export default connect(mapStateToProps)(AdminRoute);
