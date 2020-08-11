import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { Appbar } from "react-native-paper";
import { bindActionCreators } from "redux";

import { signIn } from "../store/actions/user_actions";
import Constants from "../constants/Constants";

import * as LocalAuthentication from "expo-local-authentication";

export class LoginScreen extends Component {
  componentDidMount() {
    this.props.navigation.setOptions({ title: "Login" });

    this.checkDeviceForHardware();
    this.checkForBiometrics();
  }

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      alert("Compatible Device!");
    } else alert("Current device does not have the necessary hardware!");
  };
  checkForBiometrics = async () => {
    let biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (!biometricRecords) {
      alert("No Biometrics Found");
    } else {
      alert("Biometrics Found");
    }
  };

  handleLogin = async () => {
    // this.props.signIn("fdf");
    this.checkFinger();
  };

  checkFinger = async () => {
    let result = await LocalAuthentication.authenticateAsync();
    console.log(result)
    if (result.success) {
      console.warn("success");
    } else {
      console.warn("unsuccess");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.Content
            title="Login/Register"
            color={Constants.headerTintColor}
          />
        </Appbar.Header>
        <Text> Login Screen </Text>
        <Button title="Login" onPress={this.handleLogin} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

function mapStateToProps(state) {
  return {
    isAuth: state.User.auth.isAuth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
