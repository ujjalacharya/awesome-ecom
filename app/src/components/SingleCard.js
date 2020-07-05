import React from "react";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

import { Text, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";

const SingleCard = ({ product }) => {
  return (
    <TouchableNativeFeedback
      key={product.id}
      style={styles.cardContainer}
      onPress={() => console.warn("Pressed")}
    >
      <>
        <Image style={styles.tinyLogo} source={{ uri: product.image }} />
        <Card style={styles.productDetails}>
          <Text style={styles.title}>{product.title}</Text>
          <Text>{product.price}</Text>
        </Card>
      </>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 10,
    marginRight: 10,
    width: 150,
    borderRadius: 50,
    height: "95%",
  },
  productDetails: {
    width: "100%",
    height: "100%",
    padding: 5,
  },
  tinyLogo: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  title: {
    fontWeight: "bold",
  },
});

export default SingleCard;
