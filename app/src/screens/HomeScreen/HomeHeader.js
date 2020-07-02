import React, { Component } from "react";
import { Appbar } from "react-native-paper";
import { DrawerActions } from '@react-navigation/native';
import ConstantColors from "../../constants/ConstantColors";

export class HomeHeader extends Component {
  render() {
    return (
      <Appbar.Header>
        <Appbar.Action icon="menu" color={ConstantColors.headerTintColor} onPress={()=>this.props.navigation.openDrawer()} />
        {/* <Appbar.Content title={headerTitle || } /> */}
      </Appbar.Header>
    );
  }
}

export default HomeHeader;
