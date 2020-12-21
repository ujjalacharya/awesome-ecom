import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AuthScreen from "../../screens/AuthScreen";
import HomeScreen from "../../screens/HomeScreen";

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

export const withUnAuth = (Component, config) => (props) => {
  const navigation = useNavigation();
  // const history = useHistory();
  const { token } = useSelector((state) => state.authentication);

  if (token) {
    return <HomeScreen {...props} />;
    // navigation.goBack()
  }

  return (
    <>
      <AuthScreen {...props} />
    </>
  );
};
