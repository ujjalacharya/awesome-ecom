import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../../screens/AuthScreen";

import { headerOptions } from "../../utils/common";
import { withUnAuth } from "../../components/shared/withAuth";

const Stack = createStackNavigator();

const AuthStack = ({ ...rest }) => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={headerOptions("Authenticate")}
        {...rest}
      />
    </Stack.Navigator>
  );
};

export default withUnAuth(AuthStack);
