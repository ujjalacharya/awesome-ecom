import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/ProfileScreen";
import AuthScreen from "../../screens/AuthScreen";

import { connect } from "react-redux";
import { headerOptions } from "../../utils/common";

const Stack = createStackNavigator();

const ProfileStack = ({ isAuth, ...rest }) => {
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
    isAuth: state.User.auth.isAuth,
  };
}

export default connect(mapStateToProps)(ProfileStack);
