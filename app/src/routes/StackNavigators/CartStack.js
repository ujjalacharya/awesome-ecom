import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../../screens/CartScreen";
import { headerOptions } from "../../utils/common";
import { withAuth } from "../../components/shared/withAuth";


const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={headerOptions("Cart")}
      />
    </Stack.Navigator>
  );
};

export default withAuth(CartStack);
