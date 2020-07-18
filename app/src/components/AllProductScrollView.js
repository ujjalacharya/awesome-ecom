import * as React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import { productData } from "../utils/mock";
import { TouchableOpacity } from "react-native-gesture-handler";

const AllProductScrollView = () => (
  <View style={styles.container}>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={200}
      decelerationRate="fast"
    >
      {productData.map((product, i) => (
        <TouchableOpacity key={i} style={styles.cardContainer}>
          <Image style={styles.tinyLogo} source={{ uri: product.image }} />
          <Card style={styles.productDetails}>
            <Text style={{ fontWeight: "bold" }}>{product.title}</Text>
            <Text>{product.price}</Text>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: "40%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  cardContainer: {
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    borderRadius: 50,
    height: "100%",
  },
  productDetails: {
    width: "100%",
    height: "25%",
    padding: 5,
  },
  tinyLogo: {
    width: "100%",
    height: 60,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

export default AllProductScrollView;
