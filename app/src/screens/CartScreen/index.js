import React, { Component } from "react";

import {
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";

import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Appbar,
  Button,
} from "react-native-paper";
import { View, Text, Image, StyleSheet } from "react-native";

import Constants from "../../constants/Constants";
import { productData } from "../../utils/mock";

const product = productData[0];

export class CartScreen extends Component {
  _goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    const isCartStack = this.props.route.name === "CartStack";
    return (
      <>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          // stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 50 }}>
            <Appbar.Header statusBarHeight={0}>
              {isCartStack && (
                <Appbar.BackAction
                  color={Constants.headerTintColor}
                  onPress={this._goBack}
                />
              )}

              <Appbar.Content title="Cart" color={Constants.headerTintColor} />
            </Appbar.Header>
          </View>

          {[0, 0, 0, 0, 0, 0, 0].map((data, i) => (
            <TouchableWithoutFeedback key={i}>
              <Card
                // onPress={() => props.navigation.navigate("Detail")}
                style={{ marginBottom: 5 }}
              >
                <Card.Content>
                  <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
                    <View style={{ flex: 1.5 }}>
                      <Image
                        style={styles.tinyLogo}
                        source={{ uri: product.image }}
                      />
                    </View>
                    <View style={{ flex: 2 }}>
                      <>
                        <Title>{product.title}</Title>
                        <Paragraph>{product.price}</Paragraph>
                        <Avatar.Text
                          size={24}
                          label="4/5 stars"
                          color={Constants.headerTintColor}
                          backgroundColor="green"
                          width={90}
                          style={{ marginTop: 10 }}
                        />
                      </>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>

        <View
          style={{ backgroundColor: Constants.headerTintColor, height: 50 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.3 }}></View>
            <View style={{ flex: 0.3 }}></View>
            <View style={{ flex: 0.4 }}>
              <Button
                style={{
                  flex: 1,
                  backgroundColor: "orange",
                  justifyContent: "center",
                  margin: 5,
                  borderRadius: 5
                }}
                labelStyle={{ color: "white" }}
                // onPress={this.setVisible}
              >
                Check Out
              </Button>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  rowFlex: {
    display: "flex",
    flexDirection: "row",
  },
  tinyLogo: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

export default CartScreen;
