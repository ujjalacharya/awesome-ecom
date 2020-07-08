import React, { Component } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../constants/Constants";

export class Notification extends Component {
  render() {
    return (
      <View>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.Content
            title="Notification"
            color={Constants.headerTintColor}
          />
        </Appbar.Header>
        <Text> Notification Screen </Text>
        <Text> Notification Screen </Text>
        <Text> Notification Screen </Text>
        <Text> Notification Screen </Text>
        <Text> Notification Screen </Text>
        <Text> Notification Screen </Text>
      </View>
    );
  }
}

export default Notification;
