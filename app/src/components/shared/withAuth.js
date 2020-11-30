import React from "react";
import { useSelector } from "react-redux";
import AuthScreen from "../../screens/AuthScreen";

export const withAuth = (Component, config) => (props) => {
  const { token } = useSelector((state) => state.authentication);

  if (token) {
    return <Component {...props} />;
  }

  return (
    <>
      <AuthScreen {...props} />
    </>
  );
};
