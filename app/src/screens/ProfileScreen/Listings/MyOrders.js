import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import ListingScreen from "../../../components/ListingScreen";
import { productData } from "../../../utils/mock";
import FeaturedProducts from "../../HomeScreen/FeaturedProducts";
import SearchedSingleProduct from "../../ProductListScreen/SearchedSingleProduct";

const MyOrders = (props) => {
  const { myOrders } = useSelector((state) => ({
    myOrders: state.order.getOrders,
  }));

  return (
    <ListingScreen title="My Orders">
      <>
        {myOrders.orders.map((order, i) => (
          <SearchedSingleProduct
            product={order.product}
            item={order}
            key={i}
            type="myorders"
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

export default MyOrders;
