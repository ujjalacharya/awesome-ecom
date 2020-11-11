import React from "react";
import { View, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../../../constants/Constants";
import { productData } from "../../../utils/mock";
import FeaturedProducts from "../../HomeScreen/FeaturedProducts";
import SearchedSingleProduct from "../../ProductListScreen/SearchedSingleProduct";
import { useNavigation } from "@react-navigation/native";


const MyOrders = (props) => {
    const navigation = useNavigation();
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
            onPress={()=> navigation.goBack()}
            color={Constants.headerTintColor}
          />
          <Appbar.Content title="My Orders" color={Constants.headerTintColor} />
        </Appbar.Header>
        {productData.map((product, i) => (
          <SearchedSingleProduct
            product={product}
            key={i}
            type="myorders"
            {...props}
          />
        ))}
        <View style={{ height: 200 }}>
          <FeaturedProducts title={"Recommended Products"} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MyOrders;
