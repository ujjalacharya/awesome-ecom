import React, { Component } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../../constants/Constants";
import SearchedSingleProduct from "../ProductListScreen/SearchedSingleProduct";
import { productData } from "../../utils/mock";
import { ScrollView } from "react-native-gesture-handler";
import SnackbarView from "../../components/SnackBarView";

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
      <View>
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
          </View>
        </ScrollView>
        <SnackbarView
          visible={this.state.visible}
          setVisible={this.setVisible}
          message="Added to Cart!"
          label="GO TO CART"
          link="CartStack"
        />
      </View>
    );
  }
}

export default WishListScreen;
