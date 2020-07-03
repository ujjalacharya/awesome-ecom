import React, { Component } from "react";
import { Appbar } from "react-native-paper";
import ConstantColors from "../../constants/ConstantColors";

export class HomeHeader extends Component {
  render() {
    return (
      <Appbar.Header statusBarHeight={0} style={{ elevation: 0 }}>
        <Appbar.Action
          icon="menu"
          color={ConstantColors.headerTintColor}
          onPress={() => this.props.navigation.openDrawer()}
        />
        <Appbar.Content
          color={ConstantColors.headerTintColor}
          title="KINDEEM"
        />
        <Appbar.Action
          color={ConstantColors.headerTintColor}
          icon="dots-vertical"
        />
      </Appbar.Header>
    );
  }
}

export default HomeHeader;
