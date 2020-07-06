import React, { Component } from "react";
import { Appbar } from "react-native-paper";
import Constants from "../../constants/Constants";

export class HomeHeader extends Component {
  render() {
    return (
      <Appbar.Header statusBarHeight={0} style={{ elevation: 0 }}>
        <Appbar.Action
          icon="menu"
          color={Constants.headerTintColor}
          onPress={() => this.props.navigation.openDrawer()}
        />
        <Appbar.Content color={Constants.headerTintColor} title="KINDEEM" />
        <Appbar.Action
          color={Constants.headerTintColor}
          icon="heart-outline"
          onPress={() => this.props.navigation.navigate("WishList")}
        />
      </Appbar.Header>
    );
  }
}

export default HomeHeader;
