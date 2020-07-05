import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeStack, MessageStack, ProfileStack } from "./StackNavigators";
import Constants from "../constants/Constants";

const Tab = createBottomTabNavigator();

export default function TabNavigators() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = `ios-home`;
          } else if (route.name === "Profile") {
            iconName = `ios-man`;
          } else if (route.name === "Messages") {
            iconName = `ios-information-circle`;
          } else if (route.name === "Help") {
            iconName = `ios-call`;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        inactiveTintColor: Constants.grayColor,
        activeTintColor: Constants.activeTintColor,
        showLabel: false,
        // activeBackgroundColor:'#00194b',
        inactiveBackgroundColor: Constants.noticeText,
        style: {
          backgroundColor: Constants.noticeText,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Messages" component={MessageStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
