import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Appbar, Avatar } from "react-native-paper";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { isEmpty } from "lodash";
import Constants from "../../constants/Constants";
import { SERVER_BASE_URL } from "../../../utils/common";
import ConfirmationPopup from "../../components/shared/ConfirmationPopup";
import {
  addWishListItems,
  removeFromWishList,
} from "../../../redux/actions/wishlistActions";

const ProductDetailHeader = ({ navigation, productDetails, token }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });

  const hideDialog = () => setVisible(false);

  const handleOK = () => {
    if (message.type === "add") {
      dispatch(addWishListItems(productDetails.product.slug, token));
    } else if (message.type === "remove") {
      dispatch(
        removeFromWishList(
          productDetails.product.hasOnWishlist._id,
          productDetails.product.slug,
          token
        )
      );
    }
    setVisible(false);
  };

  const handleWishlistButton = () => {
    if (!token) {
      navigation.navigate("Profile");
      return;
    }
    const isOnWishlist = !isEmpty(productDetails.product.hasOnWishlist);
    setVisible(true);
    if (isOnWishlist) {
      setMessage({
        type: "remove",
        message: "Remove from Wishlist",
      });
    } else {
      setMessage({
        type: "add",
        message: "Add to Wishlist",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ConfirmationPopup
        visible={visible}
        hideDialog={hideDialog}
        handleOK={handleOK}
        message={message}
      />
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
          color={
            isEmpty(productDetails.product.hasOnWishlist) ? "gray" : "orange"
          }
          icon="heart"
          onPress={handleWishlistButton}
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
    </View>
  );
};

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
