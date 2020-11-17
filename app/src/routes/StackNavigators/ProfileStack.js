import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/ProfileScreen";
import AuthScreen from "../../screens/AuthScreen";

import { headerOptions } from "../../utils/common";

const Stack = createStackNavigator();

const ProfileStack = ({ ...rest }) => {
  const isAuth = useSelector((state) => state.authentication.token);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuth ? (
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={headerOptions("Profile")}
          {...rest}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={headerOptions("Authenticate")}
          {...rest}
        />
      )}
    </Stack.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    isAuth: state.authentication.token,
  };
}

export default ProfileStack;
