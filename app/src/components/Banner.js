import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Colors } from "react-native-paper";
import Constants from "../constants/Constants";

export class Banner extends Component {
  render() {
    return (
      <Button
        mode="contained"
        color={Constants.tintColor}
        style={styles.sloganButton}
        onPress={() => console.log("Pressed")}
      >
        <Text style={{ color: "white", fontSize: 20 }}>DHANGAADI</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  sloganButton: {
    borderWidth: 1,
    borderColor: Constants.tintColor,
    marginTop: -5,
  },
});

export default Banner;
