import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import { Button } from "react-native-paper";
import Constants from "../../constants/Constants";
import SearchedSingleProduct from "../ProductListScreen/SearchedSingleProduct";
import { productData } from "../../utils/mock";
import SnackbarView from "../../components/SnackBarView";
import FeaturedProducts from "../HomeScreen/FeaturedProducts";
import ListingScreen from "../../components/ListingScreen";
import { withAuth } from "../../components/shared/withAuth";
import MyWishlists from "../ProfileScreen/Listings/MyWishlists";
import Skeleton from "../../components/shared/Skeleton";
import { getWishListItems } from "../../../redux/actions/wishlistActions";

const WishListScreen = (props) => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => ({
    wishlistItems: state.wishlist.getWishlistItems,
  }));

  const { token } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(getWishListItems(`page=1&perPage=10`, token));
  }, [dispatch]);

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

  if (!wishlistItems) {
    return <Skeleton />;
  }

  return (
    <>
      <MyWishlists />

      <View style={{ backgroundColor: Constants.headerTintColor, height: 50 }}>
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
};

export default withAuth(WishListScreen);
