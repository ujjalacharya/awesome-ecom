import React, { Component } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../../constants/Constants";

export class WishListScreen extends Component {
  _goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.BackAction
            onPress={this._goBack}
            color={Constants.headerTintColor}
          />
          <Appbar.Content title="Wish List" color={Constants.headerTintColor} />
        </Appbar.Header>
        <Text> WishList Screen </Text>
        <Text> WishList Screen </Text>
        <Text> WishList Screen </Text>
        <Text> WishList Screen </Text>
        <Text> WishList Screen </Text>
        <Text> WishList Screen </Text>
      </View>
    );
  }
}

export default WishListScreen;
