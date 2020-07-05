import React, { useState } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { View, Image, StyleSheet, Alert, Text } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Constants from "../constants/Constants";

const SearchedSingleProduct = ({ bus }) => {
  return (
    <>
      <TouchableNativeFeedback style={{ marginBottom: 5 }}>
        <Card>
          <Card.Content>
            <View>
              <Image style={styles.tinyLogo} source={{ uri: bus.image }} />

              <Title>{bus.title}</Title>
              <Paragraph>{bus.price}</Paragraph>
            </View>
          </Card.Content>
          <Card.Actions
            style={{
              backgroundColor: Constants.initialColor,
              marginTop: 5,
            }}
          >
            <View style={styles.rowFlex}>
              <Button>Wifi</Button>
              <Button>TV</Button>
              <Button>Mobile Charger</Button>
              <Button>AC</Button>
            </View>
          </Card.Actions>
        </Card>
      </TouchableNativeFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  rowFlex: {
    display: "flex",
    flexDirection: "row",
  },
  tinyLogo: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

export default SearchedSingleProduct;
