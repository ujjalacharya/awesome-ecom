import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
