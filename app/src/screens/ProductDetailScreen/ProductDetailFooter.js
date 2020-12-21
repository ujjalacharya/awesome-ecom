import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView, Share } from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

import Constants from "../../constants/Constants";
import SnackbarView from "../../components/SnackBarView";
import { BASE_URL } from "../../../utils/common";

const ProductDetailFooter = (props) => {
  const { token } = useSelector((state) => state.authentication);

  const [state, setState] = useState({
    visible: false,
  });

  const setVisible = () => {
    setState((prevState) => ({
      visible: !prevState.visible,
    }));
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${BASE_URL}:3002/products/${props.productDetails.product.slug}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <View style={{ backgroundColor: Constants.headerTintColor, height: 50 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Button
            style={{
              flex: 0.45,
              backgroundColor: Constants.activeTintColor,
              justifyContent: "center",
            }}
            labelStyle={{ color: "white" }}
            onPress={() => {
              token ? setVisible() : props.navigation.navigate("Auth");
            }}
          >
            Add to Cart
          </Button>
          <Button
            onPress={() => props.navigation.navigate("CheckOut")}
            style={{
              flex: 0.45,
              backgroundColor: "orange",
              justifyContent: "center",
            }}
            labelStyle={{ color: "white" }}
          >
            Buy Now
          </Button>

          <Button
            style={{ flex: 0.1, justifyContent: "center", paddingBottom: 5 }}
            icon={({ size, color }) => (
              <FontAwesome name="share-alt" size={20} color={color} />
            )}
            size={29}
            labelStyle={{ color: Constants.primaryGreen }}
            onPress={onShare}
          ></Button>
        </View>
      </View>
      <SnackbarView
        visible={state.visible}
        setVisible={setVisible}
        message="Added to Cart!"
        label="GO TO CART"
        link="CartStack"
      />
    </>
  );
};

export default ProductDetailFooter;
