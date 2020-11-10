import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Appbar } from "react-native-paper";

import { signOut } from "../../store/actions/user_actions";
import Constants from "../../constants/Constants";

import UserInfo from "./UserInfo";
import { ScrollView } from "react-native";

class ProfileScreen extends Component {
  handleLogout = async () => {
    this.props.signOut();
  };

  render() {
    return (
      <>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.Content title="Profile" color={Constants.headerTintColor} />
          <Appbar.Action
            icon="logout"
            color="white"
            onPress={this.handleLogout}
          />
        </Appbar.Header>
        <ScrollView>
          <UserInfo />
        </ScrollView>
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
