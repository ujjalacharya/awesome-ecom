import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const SuperAdminRoute = ({
    component: Component,
    auth: { isAuth, loading, role },
    ...rest
}) => (
        <Route
            {...rest}
            render={props => {
                return (isAuth && !loading && role === 'superadmin') ? (
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

SuperAdminRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.Auth
});
export default connect(mapStateToProps)(SuperAdminRoute);
