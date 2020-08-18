import React, { Component } from "react";
import { Text, View, Button } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Appbar } from "react-native-paper";

import { signOut } from "../store/actions/user_actions";
import Constants from "../constants/Constants";

import WebView from "react-native-webview";

class ProfileScreen extends Component {
  handleLogout = async () => {
    this.props.signOut();
  };

  render() {
    return (
      <>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.Content title="Profile" color={Constants.headerTintColor} />
          <Appbar.Action icon="logout" color="white" onPress={this.handleLogout} />
        </Appbar.Header>
        <WebView
          source={{
            uri: "https://google.com",
          }}
          // style={{ marginTop: 20 }}
        />
      </>
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
