import React from "react";
import TabNavigators from "./TabNavigators";

import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawerComponent";
const Drawer = createDrawerNavigator();

const DrawerNavigators = (props) => {

  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="Main"
      drawerContent={(prop) => CustomDrawer({ ...prop, ...props })}
    >
      <Drawer.Screen name="Tab" component={TabNavigators} />
    </Drawer.Navigator>
  );
};

export default React.memo(DrawerNavigators);
