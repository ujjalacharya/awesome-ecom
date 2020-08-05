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
  Checkbox,
  TouchableRipple,
} from "react-native-paper";
import { View, Text, Image, StyleSheet } from "react-native";

import Constants from "../../constants/Constants";
import { productData } from "../../utils/mock";
import FeaturedProducts from "../HomeScreen/FeaturedProducts";

const productDatas = [productData[0]];

export class CheckOutScreen extends Component {
  state = {
    checked: false,
  };

  _goBack = () => {
    this.props.navigation.pop();
  };

  setChecked = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }));
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

              <Appbar.Content
                title="Checkout"
                color={Constants.headerTintColor}
              />
            </Appbar.Header>
          </View>

          <View
            style={{ height: 300, marginBottom: 5, backgroundColor: "white" }}
          >
            <>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 0.1, backgroundColor: "pink" }}></View>
                <View
                  style={{ flex: 0.9, backgroundColor: "lightblue" }}
                ></View>
              </View>
            </>
          </View>

          {productDatas.map((product, i) => (
            <TouchableWithoutFeedback key={i}>
              <Card
                onPress={() => this.props.navigation.navigate("Detail")}
                style={{ marginBottom: 5 }}
              >
                <Card.Content>
                  <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
                    <View style={{ flex: 0.5 }}>
                      <Image
                        style={styles.tinyLogo}
                        source={{ uri: product.image }}
                      />
                    </View>
                    <View style={{ flex: 0.5 }}>
                      <>
                        <View style={{ flex: 0.2 }}>
                          <Text style={{ ...Constants.titleText }}>
                            {product.title}
                          </Text>
                          <Text style={{ ...Constants.paragraphText }}>
                            {"Ujjal's shop"}
                          </Text>
                        </View>
                        <View style={{ flex: 0.2 }}></View>

                        <View style={{ flex: 0.2, flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 15, color: "orange" }}>
                              {product.price}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                textDecorationLine: "line-through",
                                textDecorationStyle: "solid",
                              }}
                            >
                              {product.price}
                            </Text>
                          </View>
                          <View style={{ flex: 1, flexDirection: "row" }}>
                            <TouchableRipple
                              onPress={() => console.warn("-")}
                              style={{
                                flex: 0.3,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Button>{"-"}</Button>
                            </TouchableRipple>
                            <View
                              style={{
                                flex: 0.4,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text>{"0"}</Text>
                            </View>
                            <TouchableRipple
                              onPress={() => console.warn("+")}
                              style={{
                                flex: 0.3,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Button>{"+"}</Button>
                            </TouchableRipple>
                          </View>
                        </View>
                        <View style={{ flex: 0.2 }}></View>
                      </>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>

        <View
          style={{ backgroundColor: Constants.headerTintColor, height: 70 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 0.3,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 13 }}>{"Total: Rs 199"}</Text>
              </View>
              <View style={{ flex: 0.7, ...styles.footer }}>
                <Button
                  style={{
                    flex: 1,
                    backgroundColor: "orange",
                    justifyContent: "center",
                    margin: 10,
                    borderRadius: 5,
                  }}
                  labelStyle={{ color: "white" }}
                  onPress={() => this.props.navigation.navigate("CheckOut")}
                >
                  Proceed
                </Button>
              </View>
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
  footer: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 2,
  },
});

export default CheckOutScreen;
