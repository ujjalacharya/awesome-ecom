import React, { Component } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../../constants/Constants";
import SearchedSingleProduct from "../ProductListScreen/SearchedSingleProduct";
import { productData } from "../../utils/mock";
import { ScrollView } from "react-native-gesture-handler";

export class WishListScreen extends Component {
  _goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
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
              key={i}
              type="wishlist"
              {...this.props}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default WishListScreen;
