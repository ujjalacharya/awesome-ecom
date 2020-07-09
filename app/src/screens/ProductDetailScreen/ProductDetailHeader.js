import React from "react";
import { Appbar } from 'react-native-paper';
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const image = { uri: "https://reactjs.org/logo-og.png" };

const ProductDetailHeader = (props) => (
  <View style={styles.container}>
    <ImageBackground source={image} style={styles.image}>
      <Appbar.BackAction color="white" style={styles.backButton} onPress={() => props.navigation.pop()} />
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  backButton: {
    position: "absolute",
    top: 0
  }
});

export default ProductDetailHeader;