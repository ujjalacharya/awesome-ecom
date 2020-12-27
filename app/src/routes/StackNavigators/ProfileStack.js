import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/ProfileScreen";

import { headerOptions } from "../../utils/common";
import { withAuth } from "../../components/shared/withAuth";

const Stack = createStackNavigator();

const ProfileStack = ({ ...rest }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={headerOptions("Profile")}
        {...rest}
      />
    </Stack.Navigator>
  );
};

export default withAuth(ProfileStack);
