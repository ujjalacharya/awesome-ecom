import React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Constants from "../../constants/Constants";

const image = { uri: "https://cdn.androidbeat.com/wp-content/uploads/2019/04/redmi-note-8-pro-rear.jpg" };

const ProductDetailHeader = (props) => (
  <View style={styles.container}>
    <ImageBackground source={image} style={styles.image}>
      <Appbar.BackAction
        color={Constants.initialColor}
        style={styles.backButton}
        onPress={() => props.navigation.pop()}
      />
       <Appbar.Action
        style={[styles.heartIcon]}
        color="orange"
        icon="heart"
        onPress={() => props.navigation.navigate("WishList")}
      />
      <Avatar.Text
        size={24}
        label="12 photos"
        color="black"
        backgroundColor={Constants.initialColor}
        width={90}
        style={styles.totalPhotos}
      />
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 0,
  },
  heartIcon: {
    position: "absolute",
    top: 0,
    right: 0
  },
  totalPhotos: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default ProductDetailHeader;
