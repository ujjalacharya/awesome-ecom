import React, { Component } from "react";
import TabNavigators from "./TabNavigators";

import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawerComponent";

const Drawer = createDrawerNavigator();

export default class DrawerNavigators extends Component {
  render() {
    return (
      <Drawer.Navigator
        drawerType="slide"
        initialRouteName="Main"
        drawerContent={(props) => CustomDrawer(props)}
      >
        <Drawer.Screen name="Tab" component={TabNavigators} />
      </Drawer.Navigator>
    );
  }
}
