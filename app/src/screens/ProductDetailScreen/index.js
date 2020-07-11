import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Gallery from "react-native-image-gallery";

import ProductDetailHeader from "./ProductDetailHeader";
import Constants from "../../constants/Constants";
import { galleryImages } from "../../utils/mock";

import ProductDetailFooter from "./ProductDetailFooter";
import ProductDescription from "./ProductDescription";
import FeaturedProducts from "../HomeScreen/FeaturedProducts";

class ProductDetailScreen extends Component {
  state = {
    showGallery: false,
  };

  handleGalleryToggle = () => {
    this.setState((prevState) => {
      return {
        showGallery: !prevState.showGallery,
      };
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.showGallery ? (
          <View style={{ flex: 1 }}>
            <Ionicons
              name="ios-close-circle"
              size={30}
              color={Constants.tintColor}
              onPress={this.handleGalleryToggle}
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
              stickyHeaderIndices={[0]}
            >
              <TouchableRipple
                style={{ height: 200 }}
                onPress={this.handleGalleryToggle}
              >
                <ProductDetailHeader {...this.props} />
              </TouchableRipple>
              <ProductDescription />
              <View style={{ height: 250, marginTop: 0 }}>
                <FeaturedProducts title={"Similar Products"} />
              </View>
            </ScrollView>
            <ProductDetailFooter />
          </>
        )}
      </View>
    );
  }
}

export default ProductDetailScreen;
