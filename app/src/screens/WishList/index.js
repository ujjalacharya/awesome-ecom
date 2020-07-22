import React, { Component } from "react";
import { Text, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "../../constants/Constants";
import SearchedSingleProduct from "../ProductListScreen/SearchedSingleProduct";
import { productData } from "../../utils/mock";
import { ScrollView } from "react-native-gesture-handler";
import SnackbarView from "../../components/SnackBarView";
import FeaturedProducts from "../HomeScreen/FeaturedProducts";

export class WishListScreen extends Component {
  state = {
    visible: false,
    visibilityProduct: undefined,
  };

  setVisible = (product) => {
    if (product && this.state.visibilityProduct !== product.id) {
      this.setState((prevState) => ({
        visible: true,
        visibilityProduct: product.id,
      }));
    } else if (!product) {
      this.setState((prevState) => ({
        visible: false,
        visibilityProduct: product.id,
      }));
    }
  };
  _goBack = () => {
    this.props.navigation.pop();
  };
  render() {
    return (
      <>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <Appbar.Header statusBarHeight={0}>
              <Appbar.BackAction
                onPress={this._goBack}
                color={Constants.headerTintColor}
              />
              <Appbar.Content
                title="Wish List"
                color={Constants.headerTintColor}
              />
            </Appbar.Header>
            {productData.map((product, i) => (
              <SearchedSingleProduct
                product={product}
                setVisible={this.setVisible}
                key={i}
                type="wishlist"
                {...this.props}
              />
            ))}
          <View style={{ height: 200 }}>
            <FeaturedProducts title={"Similar Products"} />
          </View>
          </View>
        </ScrollView>
        <View
          style={{ backgroundColor: Constants.headerTintColor, height: 50 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button
              style={{
                flex: 1,
                backgroundColor: Constants.activeTintColor,
                justifyContent: "center",
              }}
              labelStyle={{ color: "white" }}
              onPress={this.setVisible}
            >
              Add all to Cart
            </Button>
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

export default WishListScreen;
