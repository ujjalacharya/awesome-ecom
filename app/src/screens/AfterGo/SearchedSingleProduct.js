import React, { useState } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { View, Image, StyleSheet, Alert, Text } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import Constants from "../../constants/Constants";

const SearchedSingleProduct = ({ bus }) => {
  return (
    <>
      <Card
        onPress={() => console.warn("main card")}
        style={{ marginBottom: 5 }}
      >
        <TouchableNativeFeedback>
          <Card.Content>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
              <View style={{ flex: 1.5 }}>
                <Image style={styles.tinyLogo} source={{ uri: bus.image }} />
              </View>
              <View style={{ flex: 2 }}>
                <>
                  <Title>{bus.title}</Title>
                  <Paragraph>{bus.price}</Paragraph>
                </>
              </View>
            </View>
          </Card.Content>
        </TouchableNativeFeedback>
        <Card.Actions
          style={{
            backgroundColor: Constants.cardColor,
            marginTop: 5,
          }}
        >
          <View style={styles.rowFlex}>
            <Button onPress={() => console.warn("Wifi")}>
              <Text style={{ color: "black" }}>{"Add to Wishlist "}</Text>
              <AntDesign
                name="heart"
                size={Constants.normalScreenDescriptionSize}
                color="black"
              />
            </Button>
            <Button>
              <Text style={{ color: "black" }}>{"Add to Cart "}</Text>
              <AntDesign
                name="shoppingcart"
                size={Constants.normalScreenDescriptionSize}
                color="black"
              />
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </>
  );
};

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

export default SearchedSingleProduct;
