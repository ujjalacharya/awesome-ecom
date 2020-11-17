import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView } from "react-native";
import { TouchableRipple, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Gallery from "react-native-image-gallery";

import ProductDetailHeader from "./ProductDetailHeader";
import Constants from "../../constants/Constants";
import { galleryImages } from "../../utils/mock";

import ProductDetailFooter from "./ProductDetailFooter";
import ProductDescription from "./ProductDescription";
import FeaturedProducts from "../HomeScreen/FeaturedProducts";

const ProductDetailScreen = (props) => {
  const { productDetails, productDetailsLoading } = useSelector(
    ({ products }) => products
  );

  const [state, setState] = useState({
    showGallery: false,
  });

  const handleGalleryToggle = () => {
    setState((prevState) => {
      return {
        showGallery: !prevState.showGallery,
      };
    });
  };

  const newProps = { ...props, productDetails, productDetailsLoading };
  return (
    <View style={{ flex: 1 }}>
      {state.showGallery ? (
        <View style={{ flex: 1 }}>
          <Ionicons
            name="ios-close-circle"
            size={30}
            color={Constants.tintColor}
            onPress={handleGalleryToggle}
            style={{
              backgroundColor: "#696969",
              height: 80,
              padding: 20,
            }}
          />
          <Gallery
            useNativeDriver={true}
            style={{ flex: 1, backgroundColor: "#696969" }}
            initialPage={0}
            images={galleryImages}
          />
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            // stickyHeaderIndices={[0]}
          >
            <TouchableRipple
              style={{ height: 250 }}
              onPress={handleGalleryToggle}
            >
              <ProductDetailHeader {...newProps} />
            </TouchableRipple>
            <ProductDescription {...newProps} />
            <View style={{ height: 250, marginTop: 0 }}>
              <FeaturedProducts title={"Similar Products"} />
            </View>
          </ScrollView>
          <ProductDetailFooter {...newProps} />
        </>
      )}
    </View>
  );
};

export default ProductDetailScreen;
