import React from "react";
import {useDispatch} from "react-redux";
import TabNavigators from "./TabNavigators";

import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawerComponent";
import { getProductsByCategory } from "../../redux/actions/searchActions";
const Drawer = createDrawerNavigator();

const DrawerNavigators = (props) => {

  const dispatch = useDispatch()
  const setData = () => {
    dispatch(getProductsByCategory())
    props.navigation.navigate("Products")
  }

  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="Main"
      drawerContent={(prop) => CustomDrawer({ ...prop, ...props, setData })}
    >
      <Drawer.Screen name="Tab" component={TabNavigators} />
    </Drawer.Navigator>
  );
};

export default React.memo(DrawerNavigators);
