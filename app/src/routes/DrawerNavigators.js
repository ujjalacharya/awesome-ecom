import React from "react";
import {useDispatch} from "react-redux";
import TabNavigators from "./TabNavigators";

import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawerComponent";
import { getProductsByCategory } from "../../redux/actions/searchActions";
const Drawer = createDrawerNavigator();

const DrawerNavigators = (props) => {

  const dispatch = useDispatch()
  const setDataToGetProductsByCategory = ({_id, slug}) => {
    dispatch(getProductsByCategory({_id, slug}))
    props.navigation.navigate("Products")
  }

  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="Main"
      drawerContent={(prop) => CustomDrawer({ ...prop, ...props, setDataToGetProductsByCategory })}
    >
      <Drawer.Screen name="Tab" component={TabNavigators} />
    </Drawer.Navigator>
  );
};

export default React.memo(DrawerNavigators);
