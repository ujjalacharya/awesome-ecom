import * as React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import { productData } from "../../utils/mock";

import SingleCard from "../../components/SingleCard";

const FeaturedProducts = (props) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
    <View style={{ flex: 4 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
      >
        {productData.map((product) => (
          <SingleCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: "3%",
    fontSize: 21,
    fontWeight: "bold",
  },
});

export default FeaturedProducts;
