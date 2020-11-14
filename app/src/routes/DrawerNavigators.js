import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabNavigators from "./TabNavigators";

import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawerComponent";

import { productCategories } from "../../redux/actions/productActions";

const Drawer = createDrawerNavigator();

const DrawerNavigators = () => {
  const dispatch = useDispatch();

  const menu = useSelector((state) => state.menu?.menuCategories);

  useEffect(() => {
    (async () => {
      dispatch(productCategories());
    })();
  }, []);

  useEffect(() => {
    console.warn(menu);
  }, [menu]);

  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="Main"
      drawerContent={(props) => CustomDrawer(props)}
    >
      <Drawer.Screen name="Tab" component={TabNavigators} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigators;
