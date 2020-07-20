import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../constants/Constants";

export class Notification extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.Content
            title="Notification"
            color={Constants.headerTintColor}
          />
        </Appbar.Header>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/nonotification.png")}
            style={{
              flex: 1,
              width: 50,
              height: 50,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    );
  }
}

export default Notification;
