import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../../constants/Constants";

export class CheckOut extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.Content
            title="Checkout"
            color={Constants.headerTintColor}
          />
        </Appbar.Header>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{"Checkout"}</Text>
          <Text>{"Checkout"}</Text>
          <Text>{"Checkout"}</Text>
        </View>
      </View>
    );
  }
}

export default CheckOut;
