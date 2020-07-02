import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import { connect } from "react-redux";
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

function mapStateToProps(state) {
  return {
    isAuth: state.User.auth.isAuth,
  };
}

export default connect(mapStateToProps)(HomeStack);
