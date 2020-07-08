import React, { Component } from "react";
import { Text, View, Button } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Appbar } from "react-native-paper";

import { signOut } from "../store/actions/user_actions";
import Constants from "../constants/Constants";

class ProfileScreen extends Component {
  handleLogout = async () => {
    this.props.signOut();
  };

  render() {
    return (
      <View>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.Content title="Profile" color={Constants.headerTintColor} />
        </Appbar.Header>
        <Text> Profile Screen </Text>
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.User.auth.isAuth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
