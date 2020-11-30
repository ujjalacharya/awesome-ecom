import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { BackHandler, Alert } from "react-native";
import {
  HomeStack,
  CartStack,
  ProfileStack,
  NotificationStack,
} from "./StackNavigators";
import Constants from "../constants/Constants";

const Tab = createBottomTabNavigator();

export default function TabNavigators() {
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Exit App!", "Are you sure you want to go exit KINDEEM?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = `home`;
          } else if (route.name === "Profile") {
            iconName = `face-profile`;
          } else if (route.name === "Notifications") {
            iconName = `notification`;
          } else if (route.name === "Cart") {
            iconName = `shoppingcart`;
          }

          if (route.name === "Profile")
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );

          return <AntDesign name={iconName} size={size} color={color} />;
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
      <Tab.Screen name="Notifications" component={NotificationStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
