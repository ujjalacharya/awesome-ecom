import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";

import { connect } from "react-redux";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  return <View style={{ width: "100%", backgroundColor: "red", height: "100%" }}></View>;
};

const HomeStack = ({ isAuth }) => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="Main"
      drawerContent={(props) => CustomDrawer(props)}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    isAuth: state.User.auth.isAuth,
  };
}

export default connect(mapStateToProps)(HomeStack);
