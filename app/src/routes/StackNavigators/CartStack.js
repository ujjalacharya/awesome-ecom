import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../../screens/CartScreen";
import { headerOptions } from "../../utils/common";

const Stack = createStackNavigator();

const MessageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Messages"
        component={CartScreen}
        options={headerOptions("Cart")}
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
