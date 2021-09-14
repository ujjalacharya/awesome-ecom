import React, { memo } from "react";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";

const Stack = createStackNavigator();

const AuthRender = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Login to continue</Header>

    <Paragraph>This feature is available only after you're logged in</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate("Login")}>
      Login
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
      Sign Up
    </Button>
  </Background>
);

const AuthScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Auth" component={AuthRender} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default memo(AuthScreen);
