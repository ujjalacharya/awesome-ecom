import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import Constants from "../../constants/Constants";
import SearchedSingleProduct from "../ProductListScreen/SearchedSingleProduct";
import { productData } from "../../utils/mock";
import SnackbarView from "../../components/SnackBarView";
import FeaturedProducts from "../HomeScreen/FeaturedProducts";
import ListingScreen from "../../components/ListingScreen";
import { withAuth } from "../../components/shared/withAuth";

const WishListScreen = (props) => {
  const [state, setState] = useState({
    visible: false,
    visibilityProduct: undefined,
  });

 const setVisible = (product) => {
    if (product && state.visibilityProduct !== product.id) {
      setState((prevState) => ({
        ...prevState,
        visible: true,
        visibilityProduct: product.id,
      }));
    } else if (!product) {
      setState((prevState) => ({
        ...prevState,
        visible: false,
        visibilityProduct: product.id,
      }));
    }
  };

    return (
      <>
        <ListingScreen title="Wish List">
          <>
            {productData.map((product, i) => (
              <SearchedSingleProduct
                product={product}
                setVisible={setVisible}
                key={i}
                type="wishlist"
                {...props}
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
              onPress={setVisible}
            >
              Add all to Cart
            </Button>
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
  }

export default withAuth(WishListScreen);
