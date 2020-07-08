import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button } from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Constants from "../../constants/Constants";

class Filters extends Component {
  render() {
    return (
      <View
        style={{
          height: 50,
          borderBottomWidth: 2,
          borderColor: Constants.initialColor,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View style={styles.filterWrapper}>
            <Button
              onPress={this.props.handleModalVisibility}
              style={{ width: "100%" }}
            >
              <MaterialCommunityIcons
                name="sort"
                size={Constants.normalScreenDescriptionSize}
                color="black"
              />
              <Text
                style={{
                  color: "black",
                  fontSize: Constants.normalScreenDescriptionSize,
                }}
              >
                {"SORT"}
              </Text>
            </Button>
          </View>
          <View
            style={{
              flex: 0.01,
              backgroundColor: Constants.initialColor,
            }}
          >
            <Text> </Text>
          </View>
          <View style={styles.filterWrapper}>
            <Button style={{ width: "100%" }}>
              <MaterialCommunityIcons
                name="filter"
                size={Constants.normalScreenDescriptionSize}
                color="black"
              />
              <Text
                style={{
                  color: "black",
                  fontSize: Constants.normalScreenDescriptionSize,
                }}
              >
                {"FILTER"}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterWrapper: {
    flex: 1,
    backgroundColor: Constants.headerTintColor,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Filters;
