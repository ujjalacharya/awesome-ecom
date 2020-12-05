import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import ListingScreen from "../../../components/ListingScreen";
import { productData } from "../../../utils/mock";
import FeaturedProducts from "../../HomeScreen/FeaturedProducts";
import SearchedSingleProduct from "../../ProductListScreen/SearchedSingleProduct";

const MyReviews = (props) => {
  const { myReviews } = useSelector((state) => state.user);

  return (
    <ListingScreen title="My Reviews">
      <>
        {myReviews.myReviews.map((review, i) => (
          <SearchedSingleProduct
            product={review.product}
            item={review}
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
