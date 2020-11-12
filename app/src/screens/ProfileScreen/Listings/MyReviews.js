import React from "react";
import { View } from "react-native";
import ListingScreen from "../../../components/ListingScreen";
import { productData } from "../../../utils/mock";
import FeaturedProducts from "../../HomeScreen/FeaturedProducts";
import SearchedSingleProduct from "../../ProductListScreen/SearchedSingleProduct";

const MyReviews = (props) => {
  return (
    <ListingScreen title="My Reviews">
      <>
        {productData.map((product, i) => (
          <SearchedSingleProduct
            product={product}
            key={i}
            type="myreviews"
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

export default MyReviews;
