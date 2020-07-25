import React, { Component } from "react";

import {
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";

import { Avatar, Card, Title, Paragraph, Appbar } from "react-native-paper";
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={[1]}
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

        <TouchableWithoutFeedback>
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
                <View style={{ flex: 2}}>
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
            {/* <Card.Actions
              style={{
                backgroundColor: Constants.cardColor,
                marginTop: 5,
              }}
            >
              {renderActionButtonComponent(props.type, props.product)}
            </Card.Actions> */}
          </Card>
        </TouchableWithoutFeedback>
      </ScrollView>
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
