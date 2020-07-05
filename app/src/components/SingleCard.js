import React from "react";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

import { Text, View, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";
import { getPhoneDetails } from "../utils/common";


const SingleCard = ({ product }) => {
  return (
    <TouchableNativeFeedback
      key={product.id}
      style={styles.cardContainer}
      onPress={() => console.warn("Pressed")}
    >
      <>
        <View style={{ flex: 2 }}>
          <Image style={styles.tinyLogo} source={{ uri: product.image }} />
        </View>
        <Card style={styles.productDetails}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price}</Text>
        </Card>
        <View style={{ flex: 0.25 }}></View>
      </>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    width: 120,
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
    fontSize: getPhoneDetails().height < 600 ? 10 : 14,
  },
  price: {
    fontSize: getPhoneDetails().height < 600 ? 10 : 14,
  },
});

export default SingleCard;
