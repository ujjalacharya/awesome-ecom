import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

import ProductListScreen from "../screens/AfterGo/ProductListScreen";
import DrawerNavigators from "./DrawerNavigators";
import WishListScreen from "../screens/WishList";
import SearchScreen from "../screens/SearchScreen";

export default function App() {
  return (
    <NavigationContainer headerMode="none">
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Home" component={DrawerNavigators} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="WishList" component={WishListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
