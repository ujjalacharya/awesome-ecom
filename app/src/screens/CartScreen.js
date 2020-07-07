import React, { Component } from "react";
import { Text, View } from "react-native";

import { Appbar } from "react-native-paper";
import Constants from "../constants/Constants";

export class CartScreen extends Component {
  _goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    const isCartStack = this.props.route.name === "CartStack";
    return (
      <View>
        <Appbar.Header statusBarHeight={0}>
          {isCartStack && (
            <Appbar.BackAction
              color={Constants.headerTintColor}
              onPress={this._goBack}
            />
          )}

          <Appbar.Content title="Cart" color={Constants.headerTintColor} />
        </Appbar.Header>
        <Text> Cart Screen </Text>
        <Text> Cart Screen </Text>
        <Text> Cart Screen </Text>
        <Text> Cart Screen </Text>
        <Text> Cart Screen </Text>
        <Text> Cart Screen </Text>
      </View>
    );
  }
}

export default CartScreen;
