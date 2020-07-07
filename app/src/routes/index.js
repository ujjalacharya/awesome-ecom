import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import ProductListScreen from "../screens/AfterGo/ProductListScreen";
import DrawerNavigators from "./DrawerNavigators";
import WishListScreen from "../screens/WishList";

export default function App() {
  return (
    <NavigationContainer headerMode="none">
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={DrawerNavigators} />
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="WishList" component={WishListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
