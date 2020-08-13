import React from "react";
import { Route, Redirect } from "react-router-dom";
import { decodeLocalStorage } from "../utils/common";

const SuperAdminRoute = ({
    component: Component,
    ...rest
}) => (
        <Route
            {...rest}
            render={props => {
                return (decodeLocalStorage()?.role === 'superadmin') ? (
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

export default SuperAdminRoute
