import React, { Component } from "react";
import { View, ScrollView, Share } from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

import Constants from "../../constants/Constants";
import SnackbarView from "../../components/SnackBarView";

export default class ProductDetailFooter extends Component {
  state = {
    visible: false,
  };

  setVisible = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  };
  onShare = async () => {
    try {
      const result = await Share.share({
        message: "https://www.ujjalacharya.com.np",
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
  render() {
    return (
      <>
        <View
          style={{ backgroundColor: Constants.headerTintColor, height: 50 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button
              style={{
                flex: 0.45,
                backgroundColor: Constants.activeTintColor,
                justifyContent: "center",
              }}
              labelStyle={{ color: "white" }}
              onPress={this.setVisible}
            >
              Add to Cart
            </Button>
            <Button
              onPress={()=>this.props.navigation.navigate("CheckOut")}
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
              onPress={this.onShare}
            ></Button>
          </View>
        </View>
        <SnackbarView
          visible={this.state.visible}
          setVisible={this.setVisible}
          message="Added to Cart!"
          label="GO TO CART"
          link="CartStack"
        />
      </>
    );
  }
}
