import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import ListingScreen from "../../../components/ListingScreen";
import { productData } from "../../../utils/mock";
import FeaturedProducts from "../../HomeScreen/FeaturedProducts";
import SearchedSingleProduct from "../../ProductListScreen/SearchedSingleProduct";
import Skeleton from "../../../components/shared/Skeleton";

const MyWishlists = (props) => {
  const { wishlistItems } = useSelector((state) => ({
    wishlistItems: state.wishlist.getWishlistItems,
  }));

  return (
    <ListingScreen title="My Wishlists">
      <>
        {wishlistItems.wishlists.map((wishlist, i) => (
          <SearchedSingleProduct
            product={wishlist.product}
            item={wishlist}
            key={i}
            type="mywishlists"
            {...props}
          />
        ))}
        <View style={{ height: 200 }}>
          <FeaturedProducts title={"Recommended Products"} />
        </View>
      </>
    </ListingScreen>
  );
};

export default MyWishlists;
