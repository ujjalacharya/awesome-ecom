import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationScreen from "../../screens/NotificationScreen";
import { headerOptions } from "../../utils/common";

const Stack = createStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="Notifications" component={NotificationScreen} options={headerOptions("Notifications")}/>
    </Stack.Navigator>
  );
};

export default NotificationStack;
