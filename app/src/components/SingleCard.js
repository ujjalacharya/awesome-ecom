import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Text, View, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";
import Constants from "../constants/Constants";

import { useNavigation } from "@react-navigation/native";

const SingleCard = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      key={product.id}
      style={styles.cardContainer}
      onPress={() => navigation.navigate("Detail")}
    >
      <>
        <View style={{ flex: 2 }}>
          <Image style={styles.tinyLogo} source={{ uri: product.image }} />
        </View>
        <Card style={styles.productDetails}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{product.title}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.price}>{product.price}</Text>
          </View>
        </Card>
        <View style={{ flex: 0.25 }}></View>
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    width: 150,
    borderRadius: 50,
  },
  productDetails: {
    flex: 1,
    paddingLeft: 5,
  },
  tinyLogo: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: Constants.normalScreenDescriptionSize,
  },
  price: {
    fontSize: Constants.normalScreenDescriptionSize,
  },
});

export default SingleCard;
