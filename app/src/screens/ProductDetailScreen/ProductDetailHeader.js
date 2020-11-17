import React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Constants from "../../constants/Constants";
import Skeleton from "../../components/shared/Skeleton";
import { SERVER_BASE_URL } from "../../../redux/services/productService";

const ProductDetailHeader = ({ navigation, productDetails }) => (
  <View style={styles.container}>
    {!productDetails ? (
      <Skeleton />
    ) : (
      <ImageBackground
        source={{
          uri:
            SERVER_BASE_URL +
            "/uploads/" +
            productDetails?.product.images[0].large,
        }}
        style={styles.image}
      >
        <Appbar.BackAction
          color={Constants.initialColor}
          style={styles.backButton}
          onPress={() => navigation.pop()}
        />
        <Appbar.Action
          style={[styles.heartIcon]}
          color="orange"
          icon="heart"
          onPress={() => navigation.navigate("WishList")}
        />
        <Avatar.Text
          size={24}
          label={`${productDetails?.product.images.length || "No"} photos`}
          color="black"
          backgroundColor={Constants.initialColor}
          width={90}
          style={styles.totalPhotos}
        />
      </ImageBackground>
    )}
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
    right: 0,
  },
  totalPhotos: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default ProductDetailHeader;
