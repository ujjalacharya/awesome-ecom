import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { connect } from "react-redux";
import CustomDrawer from "../../components/CustomDrawerComponent";

const Drawer = createDrawerNavigator();

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
