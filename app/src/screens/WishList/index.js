import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import Constants from "../../constants/Constants";
import SearchedSingleProduct from "../ProductListScreen/SearchedSingleProduct";
import { productData } from "../../utils/mock";
import SnackbarView from "../../components/SnackBarView";
import FeaturedProducts from "../HomeScreen/FeaturedProducts";
import ListingScreen from "../../components/ListingScreen";

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
        <ListingScreen title="Wish List">
          <>
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
          </>
        </ListingScreen>

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
