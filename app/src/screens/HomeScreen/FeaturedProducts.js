import * as React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";

import { productData } from "../../utils/mock";

import SingleCard from "../../components/SingleCard";

const FeaturedProducts = (props) => (
  <View style={styles.container}>
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
      <Text style={{ marginLeft: "3%", fontSize: 21 }}>{props.title}</Text>
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
});

export default FeaturedProducts;
